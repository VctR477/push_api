(async function() {
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

    document.getElementById('btn').addEventListener('click', requestNotificationPermission);

    checkPermission();
    const reg = await registerSW();
    // reg.showNotification('Hello w234rld');
    // requestNotificationPermission();
})();
