import { useEffect, useState } from 'react';

// 外部コンポーネントのインポート
import Header from './Header';
import TopContainer from './TopContainer';

export default function TopContents () {
    const [showTitle, setShowTitle] = useState(false);
    const [showheaderText, setShowheaderText] = useState(false);
    const [showTopContainerText, setShowTopContainerText] = useState(false);

    // 初回レンダリング時のアニメーション
    useEffect(() => {

      // ローディング後1秒後にclassNameを変更
      setTimeout(() => {
        setShowTitle(true);
      }, 1000);

      // ローディング後2秒後にclassNameを変更
      setTimeout(() => {
        setShowheaderText(true);
      }, 1500);

      // ローディング後3秒後にclassNameを変更
      setTimeout(() => {
        setShowTopContainerText(true);
      }, 2000);
    }, []);

  return(
    <>
        <Header showTitle={showTitle} showheaderText={showheaderText} />
        <TopContainer showTopContainerText={showTopContainerText}/>
        <section></section>
        <section></section>
    </>
  )   
}