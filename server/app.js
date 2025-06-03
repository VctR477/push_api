const express = require('express');
const app = express();
const cors = require('cors');
const webpush = require('web-push');

const port = 3000;

const apiKeys = {
    publicKey: 'BEiyKu8QL3LsskG70KRqN2B8Xg4EkfzuoAoWQSqmVdyUut45FoAW5GwQMuH3HSVdaHlRTKuIscSfbM3OVsjaS_o',
    privateKey: 'xX04Xud5mbxs9coXo6PzaUFQJQZMD3d3S2vWsCzvBNE',
};

webpush.setVapidDetails(
    'mailto:viktor_klimov_test@gmail.com',
    apiKeys.publicKey,
    apiKeys.privateKey,
);

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello world');
});

const subDataBase = [];

app.post('/save-subscription', (req, res) => {
    subDataBase.push(req.body);
    res.json({ status: 'Success', message: 'Subscription saved!' });
});

app.get('/send-notification', (req, res) => {
    const message = {
        title: 'Hello from server!',
        body: 'Какой-то длинный текст...',
        icon: "https://avatars.mds.yandex.net/i?id=50420ff224a169986c87220e610af286648eb3d7-9049934-images-thumbs&n=13",
    };

    webpush.sendNotification(subDataBase[0], JSON.stringify(message));

    res.json({
        "status": "Success",
        "message": "Пуш уведомление успешно отправленно"
    });
});

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});