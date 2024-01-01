/* eslint @typescript-eslint/no-explicit-any: 0 */

// ライブラリのインポート
import * as THREE from 'three';

// インターフェース
interface pcTransparencyProps {
  room: THREE.Object3D;
  lerp: any;
  scaleParcent: any;
}

export default function updatePCTransparent(props: pcTransparencyProps) {
  const { room, lerp, scaleParcent } = props;

  const pcTransparency2 = lerp(1, 0, scaleParcent(54, 65));
  room.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.material.transparent = true;
      child.material.opacity = pcTransparency2;
    }
  });
}
