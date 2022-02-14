const socket = io();

const chatMessages = document.querySelector('.chat-box');
const username = document.getElementById('username');
const chatForm = document.getElementById('send-chat');
// Message from server
socket.on('message', message => {
  console.log(message);
  outputMessage(message);

  //Scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

//Message submit
chatForm.addEventListener('submit', e => {
  e.preventDefault();
  //Get message text
  let msg = e.target.elements.msg.value;

  // Emit message to server
  socket.emit('chatMessage', msg);

  //Clear input

  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();
});

//Output message to DOM

function outputMessage(message) {
  const div = document.createElement('div');
  div.classList.add('messages');
  div.innerHTML = `<p class="meta">${message.username} ${message.time}</p>
    <p class="text">${message.text}</p>`;
  document.querySelector('.chat-box').appendChild(div);
}
