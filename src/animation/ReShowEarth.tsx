/* eslint @typescript-eslint/no-explicit-any: 0 */

// ライブラリのインポート
import * as THREE from 'three';

// インターフェース
interface reShowEarthProps {
    camera: THREE.PerspectiveCamera;
    model: THREE.Object3D;
    earthMixer: any; 
    lerp: any;
    scaleParcent: any;
}

// 78~101
export default function btmEarth(props:reShowEarthProps) {
    const {
        camera, 
        model, 
        earthMixer, 
        lerp, 
        scaleParcent
    }=props;

    const aboutMeDiv:HTMLElement  = document.getElementById('hoge')!;
    aboutMeDiv.classList.add('sectionAnimation');

    camera.lookAt(0, 0, 0);

    model.position.x = lerp(-10, 3, scaleParcent(78, 101));
    model.position.y = lerp(0, 1, scaleParcent(78, 101));
    model.position.z = lerp(0, 3, scaleParcent(78, 101));
    model.rotation.x += 0.003;

    // スクロールに合わせて地球の透明度を変更
    const transparency = lerp(0, 1, scaleParcent(85, 100));
    model.traverse((child) => {
        if (child instanceof THREE.Mesh) {
            child.material.transparent = true;
            child.material.opacity = transparency;

            // メタリック感
            child.material.metalness = 0.5;
        }
    });

    // アニメーションを再生
    if (earthMixer) {
        earthMixer.update(0.0167);
    }
}