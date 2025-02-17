// src/pages/index.js hoặc src/components/MyComponent.js
import { useEffect } from 'react';

export default function HomePage() {
  useEffect(() => {
    // Tạo Web Worker, đường dẫn tới file worker.js trong thư mục public
    const worker = new Worker('/worker.js');  // Đảm bảo worker.js nằm trong thư mục public

    // Lắng nghe thông điệp từ Web Worker
    worker.onmessage = function(event) {
      console.log('Received message from worker:', event.data);
    };

    // Gửi thông điệp vào Web Worker
    worker.postMessage({ message: 'Hello, Worker!' });

    // Clean up khi component bị unmount
    return () => {
      worker.terminate();  // Dừng Web Worker khi không cần thiết
    };
  }, []);

  return (
    <div>
      <h1>Welcome to Para Mini-App</h1>
      <p>Check the console for worker messages!</p>
    </div>
  );
}
