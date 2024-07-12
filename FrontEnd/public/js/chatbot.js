document.addEventListener("DOMContentLoaded", () => {
  const sendButton = document.getElementById("send-btn");
  const inputField = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");

  // Function to create a message row
  function createMessageRow(message, isUser = true) {
    const messageRow = document.createElement("div");
    messageRow.className = isUser ? "d-flex align-items-center justify-content-end mb-3" : "d-flex align-items-center mb-3";

    const messageContent = document.createElement("div");
    messageContent.className = "bg-light p-2 rounded";
    messageContent.style.maxWidth = "500px";
    messageContent.innerHTML = `<p class="mb-0">${message}</p>`;

    const messageIcon = document.createElement("div");
    messageIcon.className = "overflow-hidden";
    if (isUser) {
      messageIcon.innerHTML = '<i class="fas fa-user bg-dark text-white rounded-circle d-flex justify-content-center align-items-center" style="width: 25px; height: 25px;"></i>'
      messageRow.appendChild(messageContent);
      messageRow.appendChild(messageIcon);
    } else {
      messageIcon.innerHTML = '<i class="fas fa-robot bg-dark text-white rounded-circle d-flex justify-content-center align-items-center" style="width: 25px; height: 25px;"></i>';
      messageRow.appendChild(messageIcon);
      messageRow.appendChild(messageContent);
    }

    return messageRow;
  }

  sendButton.addEventListener("click", () => {
    const message = inputField.value;
    console.log(inputField);
    if (!message) return; // Avoid sending empty messages

    inputField.value = "";
    chatBox.appendChild(createMessageRow(message));
    chatBox.scrollTop = chatBox.scrollHeight;

    setTimeout(() => {
      const botResponse = getResponse(message);
      chatBox.appendChild(createMessageRow(botResponse, false));
      chatBox.scrollTop = chatBox.scrollHeight;
    }, 1500);
  });

  async function getResponse(userMessage) {
    // Placeholder bot response function
    try {
      const response = await fetch('http://172.25.116.217:9000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ input : userMessage })
      });
      console.log(response);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      return data.message; // Assuming the API response has a field 'message'
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }

  }
});
