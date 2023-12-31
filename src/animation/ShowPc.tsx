/* eslint @typescript-eslint/no-explicit-any: 0 */

// ライブラリのインポート
import * as THREE from 'three';

// インターフェース
interface showPcProps {
    camera: THREE.PerspectiveCamera;
    roomMixer: any; 
    DirectionalLight: any; 
}

// 50~55.5%
export default function showPC(props:showPcProps) {
    const {
        camera, 
        roomMixer, 
        DirectionalLight
    } = props;

    // ライト（特定の方向）
    DirectionalLight.position.set(9, 8, 9).normalize();
    DirectionalLight.intensity = 7;

    camera.lookAt(0, 0, 0);

    // PCアニメーション再生
    if (roomMixer) {
        console.log("roomMixer is present");
        roomMixer.update(0.0167);
    }
}