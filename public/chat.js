'use strict';

const socket = io();
const channel = 'chat message';
const roomChannel = 'change room';
const roomSelector = document.getElementById('rooms');

const changeRoom = (room) => {
  socket.emit(roomChannel, room);
};

const addMessage = (msg) => {
  const item = document.createElement('li');
  item.innerHTML = msg;
  const list = document.getElementById('messages');
  list.appendChild(item);
  list.scrollTop = list.scrollHeight;
};

document.getElementById('messageForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const user = document.getElementById('user');
  const inp = document.getElementById('message');
  socket.emit(channel, user.value, inp.value, roomSelector.value);
  inp.value = '';
});

document.getElementById('roomsForm').addEventListener('submit', (event) => {
  event.preventDefault();
  changeRoom(roomSelector.value);
});

socket.on(channel, (user, msg) => {
  addMessage(`${user} says ${msg}`);
});

socket.on(roomChannel, (room) => {
  if (room) {
    addMessage(`You joined room: ${room}`);
  }
});

changeRoom(roomSelector.value);
