(function() {
    let reg;
    const checkPermission = () => {
        if (!('serviceWorker' in navigator)) {
            throw new Error('Браузер не поддерживает Service Worker API');
        }

        if (!('Notification' in window)) {
            throw new Error('Браузер не поддерживает Notification API');
        }
    };

    const registerSW = async () => {
        const registration = await navigator.serviceWorker.register('sw.js');

        return registration;
    };

    const requestNotificationPermission = async () => {
        const permission = await Notification.requestPermission();

        if (permission !== 'granted') {
            throw new Error('Пользователь запретил уведомления!');
        } else {
            // new Notification('hello world');
        }
    };

    const main = async () => {
        checkPermission();
        await requestNotificationPermission();
        reg = await registerSW();
    };

    document.getElementById('btn').addEventListener('click', main);

    document.getElementById('btn-2').addEventListener('click', function() {
        if (reg.showNotification) {
            reg.showNotification('Привет Мир!', {
                body: "Какой-то там текст ла-ла-ла-лалалала!",
                icon: "https://sun9-68.userapi.com/impg/BDHgqHyZAnJnvw5yCj6ra1Zw85CoDi1a8lEWsw/FG86880mpWA.jpg?size=1620x2160&quality=95&sign=c058a227063facfe2030b16d4e079cd6&type=album",
                vibrate: [200, 100, 200, 100, 200, 100, 200],
            });
        }
    });
})();
