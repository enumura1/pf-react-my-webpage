import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

// CSSのインポート
import "./css/App.css";
import "./css/mouseCursor.css"
import "./css/Liquid.css"
import "./css/LinkDecoration.css"
import "./css/MediaQuery.css"
import "./css/Header.css"
import "./css/TopContainer.css"
import "./css/Makes.css"
import "./css/PC.css"
import "./css/Info.css"
import "./css/Bottom.css"
import "./css/ScrollBar.css"
import './css/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
