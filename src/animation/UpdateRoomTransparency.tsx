/* eslint @typescript-eslint/no-explicit-any: 0 */

// ライブラリのインポート
import * as THREE from 'three';

// インターフェース
interface roomTransparencyProps {
    camera: THREE.PerspectiveCamera;
    room: THREE.Object3D;
    lerp: any;
    scaleParcent: any;
}

// 35~50%
export default function updateRoomTransparent(props:roomTransparencyProps) {
    const {
        camera, 
        room, 
        lerp, 
        scaleParcent
    }= props;

    camera.position.x = lerp(10, room.position.x, scaleParcent(35, 55));
    camera.position.y = lerp(10, room.position.y + 2, scaleParcent(35, 55));
    camera.position.z = lerp(10, room.position.z - 1, scaleParcent(35, 55));

    room.position.x = lerp(8, 4, scaleParcent(35, 50));
    room.position.z = lerp(5, 7, scaleParcent(35, 50));
}