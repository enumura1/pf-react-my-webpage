import React from 'react';
import ReactDOM from 'react-dom/client';

// 外部関数のインポート
import SwitchLoadedScreen from './components/SwitchLoadedScreen.tsx';

// CSSのインポート
import './css/App.css';
import './css/mouseCursor.css';
import './css/Liquid.css';
import './css/LinkDecoration.css';
import './css/Header.css';
import './css/TopContainer.css';
import './css/Makes.css';
import './css/PC.css';
import './css/Info.css';
import './css/Bottom.css';
import './css/ScrollBar.css';
import './css/index.css';
import './css/LoadingScreen.css'
import './css/LoadedScreen.css'

// レスポンシブ対応
import './css/common.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SwitchLoadedScreen />
  </React.StrictMode>,
);
