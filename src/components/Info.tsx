// インターフェース
interface InfoProps {
  imgScale1: boolean;
  imgScale2: boolean;
  imgScale3: boolean;
}

export default function Info(props: InfoProps) {
  const { imgScale1, imgScale2, imgScale3 } = props;

  return (
    <section>
      <div className="house-container">
        <div className="info-ctr-elem-left">
          <h1 className="sectionTitle">■ Info</h1>
          <p>フロントメインのトピックを不定期で更新してます。</p>
          <a href="https://qiita.com/enumura1">
          <h3>◆ Qiita</h3>
          </a>
          <p className="text-overflow">
            <a href="https://qiita.com/enumura1/items/0aa345637529f582e1e6" target="_blank" >
            📗【Webサイト制作】駆け出しエンジニアが1か月で作成したポートフォリオサイトの振り返り
            </a>
          </p>
          <p className="text-overflow">
            <a href="https://qiita.com/enumura1/items/8449c2c0b00c8eeac6c6" target="_blank" >
            📗【React】react-three-fiberで自作の3Dモデルを手軽にWebサイトに表示する
            </a>
          </p>
          <p className="text-overflow">
            <a href="https://qiita.com/enumura1/items/c1dee84b87fc0f0692ad" target="_blank" >
            📗【React×Blender】react-three-fiberで表示した3Dモデルに発光感（ブルーム）を付ける
            </a>
          </p>
          <h3>◆ Blender</h3>
          <p>Blenderで画像のような3Dモデル作成しています。</p>
          <p>今年の目標はアバター作成です。</p>
        </div>
        <div className="info-ctr-elem-right">
          <div className="info-img-topCtr">
            <img className={`${imgScale1 ? 'scale-animation' : ''}`} src="assets/sea_nightMoon.png" alt="img1" />
          </div>
          <div className="info-img-midCtr">
            <img className={`${imgScale2 ? 'scale-animation' : ''}`} src="assets/south_island_house.png" alt="img2" />
          </div>
          <div className="info-img-btmCtr">
            <img className={`${imgScale3 ? 'scale-animation' : ''}`} src="assets/site_scherry_blossom.png" alt="img3" />
          </div>
        </div>
      </div>
      <section></section>
    </section>
  );
}
