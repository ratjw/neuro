
const check = () => {
  if (!('serviceWorker' in navigator)) {
    throw new Error('No Service Worker support!')
  }
  if (!('PushManager' in window)) {
    throw new Error('No Push API Support!')
  }
}

const registerServiceWorker = () => {
  const swRegistration = navigator.serviceWorker.register('js/serviceWorker.js')
  return swRegistration
}

const requestNotificationPermission = () => {
  const permission = window.Notification.requestPermission();
  // value of permission can be 'granted', 'default', 'denied'
  // granted: user has accepted the request
  // default: user has dismissed the notification permission popup by clicking on x
  // denied: user has denied the request.
  if(permission !== 'granted'){
      throw new Error('Permission not granted for Notification');
  }
}

const showLocalNotification = (title, body, swRegistration) => {
  const options = {
      body,
      // here you can add more properties like icon, image, vibrate, etc.
  };
  swRegistration.showNotification(title, options);
}

const register = () => {
  check();
  const swRegistration = registerServiceWorker();
  const permission =  requestNotificationPermission();
  showLocalNotification('This is title', 'this is the message', swRegistration);
}
