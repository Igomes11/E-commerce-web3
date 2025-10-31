import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import App from './App';

// 1. Importa o CSS do Bootstrap no ponto de entrada
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
