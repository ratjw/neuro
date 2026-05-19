
// Cache-first / Stale-While-Revalidate
const CACHE_NAME = 'dashboard-v1';
const ASSETS = ['/', '/index.html', '/app.js', '/styles.css'];

// ติดตั้ง Service Worker และเก็บไฟล์ UI ถาวร (Cache-First)
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// ดักจับการดึงข้อมูล (Fetch)
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // ถ้าเป็น API ข้อมูล Dashboard ให้ใช้ Stale-While-Revalidate
  if (url.pathname.startsWith('/api/dashboard-data')) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((cachedResponse) => {
          // ดึงข้อมูลจากเน็ตขนานไปด้วยเพื่ออัปเดตเดต้าของวันใหม่
          const fetchPromise = fetch(event.request).then((networkResponse) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
          // ส่งข้อมูลจาก Cache ให้หน้าจอก่อนเพื่อความเร็ว ถ้าไม่มีค่อยรอจากเน็ต
          return cachedResponse || fetchPromise;
        });
      })
    );
  } else {
    // ถ้าไฟล์ทั่วไป (HTML, CSS, JS) ให้ใช้ Cache-First
    event.respondWith(
      caches.match(event.request).then((response) => response || fetch(event.request))
    );
  }
});

// 🔔 ส่วนสำคัญ: รับเหตุการณ์ Push Notification จากเซิร์ฟเวอร์ (อัปเดตวันละครั้ง)
self.addEventListener('push', (event) => {
  let title = 'อัปเดตข้อมูลแดชบอร์ดแล้ว!';
  let options = {
    body: 'ข้อมูลประจำวันพร้อมให้คุณตรวจสอบแล้ว ดูตัวเลขล่าสุดได้เลย',
    icon: '/icon.png', // ไอคอนของแอป
    badge: '/badge.png', // ไอคอนเล็กบนสเตตัสบาร์
    tag: 'daily-update', // ป้องกันการขึ้นแจ้งเตือนซ้ำซ้อน
    renotify: true
  };

  if (event.data) {
    try {
      const data = event.data.json();
      title = data.title || title;
      options.body = data.body || options.body;
    } catch (e) {
      title = event.data.text();
    }
  }

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// เมื่อผู้ใช้กดที่กล่องแจ้งเตือน ให้เปิดหน้าเว็บขึ้นมา
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/') // เปิดหน้าแรกของแดชบอร์ด
  );
});
