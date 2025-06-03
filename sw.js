function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/')
  ;
  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}

async function saveSubscription(subscription) {
    const response = await fetch('http://localhost:3000/save-subscription', {
        method: 'post',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(subscription),
    });
    const result = response.json();

    return result;
}

self.addEventListener('activate', async () => {
    const subscription = await self.registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array('BEiyKu8QL3LsskG70KRqN2B8Xg4EkfzuoAoWQSqmVdyUut45FoAW5GwQMuH3HSVdaHlRTKuIscSfbM3OVsjaS_o'),
    });

    const response = await saveSubscription(subscription);
    console.log(response);
});

self.addEventListener('push', (event) => {
    const {
        title,
        body,
        icon,
    } = JSON.parse(event.data.text());

    self.registration.showNotification(title, {
        body,
        icon,
    });
});

// Public Key:
// BEiyKu8QL3LsskG70KRqN2B8Xg4EkfzuoAoWQSqmVdyUut45FoAW5GwQMuH3HSVdaHlRTKuIscSfbM3OVsjaS_o

// Private Key:
// xX04Xud5mbxs9coXo6PzaUFQJQZMD3d3S2vWsCzvBNE