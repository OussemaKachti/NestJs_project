const socket = io('http://localhost:3000');

socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('receive_message', (msg) => {
  const messagesDiv = document.getElementById('messages');
  const div = document.createElement('div');
  const date = new Date(msg.date).toLocaleString('fr-FR');
  div.innerText = `${msg.content} (${date})`;
  messagesDiv.appendChild(div);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
});

document.getElementById('send').addEventListener('click', () => {
  const content = document.getElementById('content').value.trim();
  if (content) {
    socket.emit('send_message', { content });
    document.getElementById('content').value = '';
  }
});

document.getElementById('content').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    document.getElementById('send').click();
  }
});

