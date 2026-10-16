import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { initGradientWaveText } from './utils/gradientWaveText';

// Expose globally as provided in Step 2 snippet
(window as any).initGradientWaveText = initGradientWaveText;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initGradientWaveText();
  });
} else {
  initGradientWaveText();
}

createRoot(document.getElementById('root')!).render(<App />);
