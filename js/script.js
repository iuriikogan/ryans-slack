const url = 'http://localhost:3000';

const input_name = document.querySelector('input.input-name');
const input_message = document.querySelector('input.input-message');
const messages_container = document.querySelector('#messages-container');
const channels_container = document.querySelector('#channels-container');

const getChannel = () => {
    return fetch(`${url}/channels`)
        .then(res => res.json())
        .then(data => data);
}

const getMessagesByChannelId = (channelId) => {
    return fetch(`${url}/messages/${channelId}`)
        .then(res => res.json())
        .then(data => data);
}

const createChannelElement = (id, name) => {
    const li = document.createElement('li');
    const channel_name = document.createTextNode(name);
    li.id = id;
    li.className = 'channel'
    li.appendChild(channel_name);
    return li;
};

const createMessageElement = (author, message) => {
    const li = document.createElement('li');

    let div = document.createElement('div');
    let text = document.createTextNode(message);
    div.className = 'message';
    div.appendChild(text);

    let span = document.createElement('span');
    text = document.createTextNode(author);
    span.appendChild(text);
    div.appendChild(span);
    li.appendChild(div);

    div = document.createElement('div');
    div.className = 'extra';
    let button = document.createElement('button');
    text = document.createTextNode('Like');
    button.className = 'btn';
    button.classList.add('btn-primary');
    button.classList.add('btn-like');
    button.appendChild(text);
    div.appendChild(button);

    span = document.createElement('span');
    text = document.createTextNode(0);
    span.className = 'score';
    span.appendChild(text);
    div.appendChild(span);

    button = document.createElement('button');
    text = document.createTextNode('Delete');
    button.className = 'btn';
    button.classList.add('btn-danger');
    button.classList.add('btn-remove');
    button.appendChild(text);
    div.appendChild(button);
    
    li.appendChild(div);

    return li;
}

document.addEventListener('keyup', function(e) {
    if(e.which === 13) {
        if(input_name.value == '' || input_message.value == '') {
            document.querySelector('div.alert').classList.remove('hidden');
            return;
        }
        document.querySelector('div.alert').classList.add('hidden');
        const li = createMessageElement(input_name.value, input_message.value);
        messages_container.appendChild(li);
        input_name.value = '';
        input_message.value = '';
        input_name.focus();
    }
});

document.addEventListener('click', function(e) {
    if(e.target.matches('li.channel')) {
        const lis = document.querySelectorAll('li.channel');
        lis.forEach((li) => {
            li.classList.remove('highlight');
        })
        e.target.classList.add('highlight');

        messages_container.innerHTML = '';

        getMessagesByChannelId(e.target.id)
            .then((messages) => {
                messages.forEach((message) => {
                    const li = createMessageElement(message.author, message.body);
                    messages_container.appendChild(li);
                });
            });
    }
});

document.addEventListener('click', function(e) {
    if(e.target.matches('button.btn-remove')) {
        const target = e.target.parentNode.parentNode;
        messages_container.removeChild(target);
    }
});

document.addEventListener('click', function(e) {
    if(e.target.matches('button.btn-like')) {
        let value = e.target.nextSibling.innerHTML;
        value++;
        e.target.nextSibling.innerHTML = value;
    }
})

getChannel().then((channels) => {
    channels.forEach((channel) => {
        const li = createChannelElement(channel.id, channel.name);
        channels_container.appendChild(li);
    });
});