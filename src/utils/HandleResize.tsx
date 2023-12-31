/* eslint @typescript-eslint/no-explicit-any: 0 */
import * as THREE from "three"

// インターフェース
interface Sizes {
    width: number;
    height: number;
  }

// 画面のリサイズ
const handleResize = (camera:THREE.PerspectiveCamera , renderer:any, sizes:Sizes) => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
};

export default handleResize;