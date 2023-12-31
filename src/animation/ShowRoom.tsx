/* eslint @typescript-eslint/no-explicit-any: 0 */

// ライブラリのインポート
import * as THREE from 'three';

// インターフェース
interface rotateEarthProps {
    camera: THREE.PerspectiveCamera;
    room: THREE.Object3D;
    DirectionalLight: any;
    lerp: any;
    scaleParcent: any;
}

// 20~35%
export default function showRoomAnimation(props:rotateEarthProps){
    const {
        camera, 
        room, 
        DirectionalLight,
        lerp, 
        scaleParcent
    }= props;

    // ライト（特定の方向）
    DirectionalLight.position.set(13, 8, 7).normalize();
    DirectionalLight.intensity = 8;

    camera.lookAt(0, 0, 0);

    room.position.x = 9;
    room.position.y = 4;
    room.position.z = 4;

    // 大きさを変更する
    const scaleFactor = lerp(0.5, 1, scaleParcent(20, 32));
    room.scale.set(scaleFactor, scaleFactor, scaleFactor);


    // スクロール率に合わせてroom.glbを徐々に表示
    const roomTransparency = lerp(0, 1, scaleParcent(22, 32));
    room.traverse((child) => {
        if (child instanceof THREE.Mesh) {
            child.material.transparent = true;
            child.material.opacity = roomTransparency;

            // メタリック感を調整
            child.material.metalness = 0.5;
        }
    });
}