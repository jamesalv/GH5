from flask import Flask, request, jsonify
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer
import nltk

app = Flask(__name__)

# Ensure NLTK data is downloaded
nltk.download('punkt')
nltk.download('stopwords')
nltk.download('wordnet')

# Preprocess function
def preprocess(text):
    lemmatizer = WordNetLemmatizer()
    tokens = word_tokenize(text.lower())
    tokens = [lemmatizer.lemmatize(word) for word in tokens if word.isalpha() and word not in stopwords.words('english')]
    return ' '.join(tokens)

# Load and preprocess journal entries
journal_entries = pd.read_csv('archive/data.csv')['Answer']
data = journal_entries.apply(preprocess)

# Vectorize using TF-IDF
vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(data)

# Calculate cosine similarity
def calculate_similarity(input_text, data_vectors, vectorizer):
    input_processed = preprocess(input_text)
    if not input_processed:
        return None, 'Input text is too short'

    input_vector = vectorizer.transform([input_processed])
    similarities = cosine_similarity(input_vector, data_vectors).flatten()
    
    return similarities, None

@app.route('/predict', methods=['POST'])
def predict():
    input_text = request.json.get('text')
    if not input_text:
        return jsonify({'error': 'No text provided'}), 400

    similarities, error = calculate_similarity(input_text, X, vectorizer)
    
    if error:
        return jsonify({'error': error}), 400
    
    max_similarity = max(similarities)
    threshold = 0.25
    if max_similarity < threshold:
        return jsonify({'error': 'Invalid journal input, please make your journal better', 'max_sim': max_similarity}), 400
    else:
        return jsonify({'success': 'Journal is valid', 'max_sim': max_similarity}), 200

if __name__ == '__main__':
    app.run(debug=True)
