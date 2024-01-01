/* eslint @typescript-eslint/no-explicit-any: 0 */

// ライブラリのインポート
import * as THREE from 'three';

// インターフェース
interface earthTransparencyProps {
  camera: THREE.PerspectiveCamera;
  model: THREE.Object3D;
  earthMixer: any;
  moon: THREE.Object3D;
  paperAirPlane: THREE.Object3D;
  DirectionalLight: any;
  lerp: any;
  scaleParcent: any;
}

// 10~20%
export default function updateEarthTransparent(props: earthTransparencyProps) {
  const { camera, model, earthMixer, moon, DirectionalLight, lerp, scaleParcent, paperAirPlane } = props;

  camera.lookAt(0, 0, 0);
  DirectionalLight.intensity = 2;

  camera.position.x = lerp(7, 10, scaleParcent(10, 20));
  camera.position.y = lerp(3, 10, scaleParcent(10, 20));
  camera.position.z = lerp(10, 10, scaleParcent(10, 20));

  model.rotation.x += 0.003;

  // スクロール率に合わせて地球の透明度を変更
  const transparency = lerp(1, 0, scaleParcent(10, 17));
  model.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.material.transparent = true;
      child.material.opacity = transparency;
    }
  });

  // スクロール率に合わせて月の透明度を変更
  moon.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.material.transparent = true;
      child.material.opacity = transparency;
    }
  });

  // スクロール率に合わせて紙飛行機を徐々に移動
  paperAirPlane.position.x = lerp(5, 10, scaleParcent(10, 20));

  // スクロール率に合わせて紙飛行機を徐々に非表示
  const showedPaperAPTransparency = lerp(0.9, 0, scaleParcent(10, 17));
  paperAirPlane.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.material.transparent = true;
      child.material.opacity = showedPaperAPTransparency;

      // メタリック感を調整
      child.material.metalness = 0.5;
    }
  });

  if (earthMixer) {
    earthMixer.update(0.0167);
  }
}
