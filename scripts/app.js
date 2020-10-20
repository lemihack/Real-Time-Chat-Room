const list = document.querySelector('.chat-list'), 
    chatBox = document.querySelector('.new-chat'), 
    nameUpdate = document.querySelector('.new-name'),
    updateMsg = document.querySelector('.update-mssg'), 
    rooms = document.querySelector('.chat-rooms');
nameUpdate.addEventListener('submit', e => {
    e.preventDefault();
    const newName = nameUpdate.name.value.trim();
    chatRoom.updateName(newName)
    nameUpdate.reset()
    updateMsg.innerHTML = `Name updated to ${newName}`;
    setTimeout(() => {
        updateMsg.innerHTML= '';
    }, 3000);
})


//Event
rooms.addEventListener('click', e => {
    if(e.target.tagName === 'BUTTON'){
        chatUI.clear();
        chatRoom.updateRoom(e.target.getAttribute('id'));
        chatRoom.getChats( chat => {
            chatUI.render(chat);
        })
    }
})

//Event
chatBox.addEventListener('submit', e => {
    e.preventDefault();
    const message = chatBox.message.value.trim();
    chatRoom.addChat(message)
    
    .then(()=> chatBox.reset()
    ).catch(err => console.log(err));
    
})

//name check
const username = localStorage.username ? localStorage.username : 'Anon'

const chatUI = new ChatUI(list);
const chatRoom = new Chatroom('general', username)

//get chats
chatRoom.getChats( data => {
    chatUI.render(data)
})
