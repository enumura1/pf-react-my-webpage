import * as THREE from 'three';

export default function createScene(canvasRef:React.RefObject<HTMLCanvasElement>) {

    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight,
      };
  
      // シーンの生成
      const scene = new THREE.Scene();
  
      // ライト（特定の方向）
      const DirectionalLight = new THREE.DirectionalLight(0xffffff, 2);
      DirectionalLight.position.set(5, 5, 5).normalize();
      scene.add(DirectionalLight);
  
      // カメラ
      const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
      camera.position.x = 0;
      camera.position.y = 2.5;
      camera.position.z = 5;
      scene.add(camera);

      // レンダラー
    const renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current!,
        // 物体の輪郭がガクガクするのを抑える
        antialias: true,
        alpha: true,
      });
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  

      return { sizes, scene, DirectionalLight, camera, renderer};
};
