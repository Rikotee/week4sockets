'use strict';

const socket = io();
const channel = 'chat message';

document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault();
  const inp = document.getElementById('m');
  const user = document.getElementById('u');
  socket.emit(channel, user.value, inp.value);
  inp.value = '';
});

socket.on(channel, (msg) => {
  const item = document.createElement('li');
  item.innerHTML = msg;
  console.log(msg)
  const list = document.getElementById('messages');
  list.appendChild(item);
  list.scrollTop = list.scrollHeight;
});
