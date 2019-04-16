const port = process.env.PORT || 3000;

const express = require('express');

let channels = [{
    id: 1,
    name: 'general'
}, {
    id: 2,
    name: 'random'
}, {
    id: 3,
    name: 'private'
}, {
    id: 4,
    name: 'fun'
}];

let messages = [{
    id: 1,
    body: 'hello world',
    author: 'Tony',
    channelId: 1
}, {
    id: 2,
    body: 'tortuga coders',
    author: 'Tony',
    channelId: 1
}, {
    id: 3,
    body: 'school is awesome',
    author: 'Ryan',
    channelId: 2
}, {
    id: 4,
    body: 'let\'s go eat',
    author: 'Pedro',
    channelId: 2
}, {
    id: 5,
    body: 'my name is michelle',
    author: 'Michelle',
    channelId: 3
}, {
    id: 6,
    body: 'bonjour',
    author: 'Tony',
    channelId: 4
}];


const app = express();

app.get('/channels', function(req, res, next) {
    res.send(channels);
});

app.get('/messages/:channelId', function(req, res, next) {
    const filteredMessages = messages.filter((message) => message.channelId == req.params.channelId);
    res.send(filteredMessages);
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
