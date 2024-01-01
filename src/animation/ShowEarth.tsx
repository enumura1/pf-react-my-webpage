/* eslint @typescript-eslint/no-explicit-any: 0 */

// ライブラリのインポート
import * as THREE from 'three';

// インターフェース
interface rotateEarthProps {
  camera: THREE.PerspectiveCamera;
  model: THREE.Object3D;
  earthMixer: any;
  moon: THREE.Object3D;
  paperAirPlane: THREE.Object3D;
  DirectionalLight: any;
  lerp: any;
  scaleParcent: any;
}

// 0~10%
export default function rotateEarth(props: rotateEarthProps) {
  const { camera, model, earthMixer, moon, paperAirPlane, DirectionalLight, lerp, scaleParcent } = props;

  // 光源
  DirectionalLight.intensity = 2;

  // カメラ
  camera.lookAt(0, 0, 0);
  camera.position.x = lerp(0, 7, scaleParcent(0, 10));
  camera.position.y = lerp(2.5, 3, scaleParcent(0, 10));
  camera.position.z = lerp(5, 10, scaleParcent(0, 10));

  // 地球
  model.position.x = lerp(3, -10, scaleParcent(0, 10));
  model.rotation.x += 0.003;

  // 月
  moon.scale.set(0.5, 0.5, 0.5);
  moon.position.x = lerp(-1, -10, scaleParcent(0, 10));
  moon.position.y = 2.2;
  moon.position.z = -1;
  moon.rotation.x = -0.2;

  // スクロール率に合わせて紙飛行機を徐々に移動
  paperAirPlane.position.x = lerp(2, 5, scaleParcent(0, 10));

  // スクロール率に合わせて紙飛行機を徐々に表示
  const showedPaperAPTransparency = lerp(0, 0.8, scaleParcent(0, 10));
  paperAirPlane.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.material.transparent = true;
      child.material.opacity = showedPaperAPTransparency;

      // メタリック感を調整
      child.material.metalness = 0.5;
    }
  });

  // 地球アニメーション再生
  if (earthMixer) {
    earthMixer.update(0.0167);
  }
}
