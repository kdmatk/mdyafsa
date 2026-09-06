
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// أداء أفضل مع التحميل الفوري للتطبيق
const root = document.getElementById("root");
if (root) {
  createRoot(root).render(<App />);
}
