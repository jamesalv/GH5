import pandas as pd
import numpy as np
from flask import Flask, request, jsonify
from sentence_transformers import SentenceTransformer
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
nltk.download('stopwords')

app = Flask(__name__)

model = SentenceTransformer("all-MiniLM-L6-v2")
journal_archives = pd.read_csv("archive/data.csv")['Answer']
journal_encode = model.encode(journal_archives)

def check_journal_length(journal):
    stop_words = set(stopwords.words('english'))
    word_tokens = word_tokenize(journal)
    non_stop_words = [w for w in word_tokens if not w in stop_words]
    return len(non_stop_words) > 20

@app.route('/validateJournalEntry', methods=['POST'])
def validate_journal():
    journal_entry = request.json.get('journal_entry')
    if not journal_entry:
        return jsonify({'error': 'No journal entry provided'}), 400

    if not check_journal_length(journal_entry):
        return jsonify({'error': 'Journal entry is too short'}), 400
    
    journal_entry_encode = model.encode(journal_entry)
    similarities = model.similarity(journal_entry_encode, journal_encode)
    max_similarity = str(np.max(similarities.numpy()))
    
    threshold = 0.4
    
    if max_similarity < threshold:
        return jsonify({'error': 'Invalid journal input, please make your journal better', 'max_sim': max_similarity}), 400
    else:
        return jsonify({'success': 'Journal is valid', 'max_sim': max_similarity}), 200

if __name__ == '__main__':
    app.run(debug=True)
