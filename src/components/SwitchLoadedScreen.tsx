import { useEffect, useState } from 'react';

// 外部関数のインポート
import LoadingScreen from './LoadingScreen'; 
import App from '../App'; 

export default function SwitchLoadedScreen() {
  const [loading, setLoading] =useState(true);

  useEffect(() => {
      const timeoutId = setTimeout(() => {
        setLoading(false)
      }, 5000);

      return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div >
      {loading ? (<LoadingScreen/>):(<App/>)}
    </div>
  );
}
