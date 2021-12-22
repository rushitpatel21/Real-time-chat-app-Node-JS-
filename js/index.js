const socket = io('http://localhost:8000');

let all_msg = document.getElementById('all_msg');
let form_box = document.getElementById('form_box');
let input_txt = document.getElementById('input_txt');
let send_btn = document.getElementById('send_btn');
var audio = new Audio('../play.mp3');

const userName = prompt("Enter your name");

const append = (message,side) => {
    const msg_box = document.createElement('b');
    msg_box.innerText = message;
    msg_box.classList.add('card');
    if (side == 'join_chat') {
        msg_box.classList.add('center');
        msg_box.classList.add('join');
    }
    else if (side == 'left_chat') {
        msg_box.classList.add('center');
        msg_box.classList.add('leave');
    }
    else{
        msg_box.classList.add('myCard');
        msg_box.classList.add(side);
    }
    if (side == 'left' || side == 'left_chat' || side == 'join_chat') {
        audio.play();
    }
    all_msg.append(msg_box);
}

form_box.addEventListener("submit",(e)=>{
    e.preventDefault();
    const msg = input_txt.value;
    append(`You : ${msg}`,'right');
    socket.emit('send', msg);
    input_txt.value = '';
});

socket.emit('new_users_joined',userName);

socket.on('user_joined', name => {
    append(`${name} joined the chat !`,'join_chat');
});

socket.on('recevie', data => {
    append(`${data.name} : ${data.message}`,'left');
});

socket.on('left', name => {
    append(`${name} left the chat !`,'left_chat');
});