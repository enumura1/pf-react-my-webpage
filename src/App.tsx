/* eslint @typescript-eslint/no-explicit-any: 0 */

// ライブラリのインポート
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// 外部ファイルのインポート
import "./css/App.css";
import "./css/mouseCursor.css"
import "./css/Liquid.css"
import "./css/LinkDecoration.css"
import "./css/MediaQuery.css"

// 外部関数のインポート
import handleResize from './utils/HandleResize';
import showRoomAnimation from './animation/ShowRoom';
import rotateEarth from './animation/ShowEarth';
import updateEarthTransparent from './animation/UpdateEarthTransparency';
import updateRoomTransparent from './animation/UpdateRoomTransparency';
import showPC from './animation/ShowPc';
import updatePCTransparent from './animation/UpdatePCTransparency';
import reShowEarth from './animation/ReShowEarth';

// 外部コンポーネントのインポート
import Pointer from './components/MouseCursor';
import TopContents from './components/TopContents';
import Intro from './components/Intro';
import Makes from './components/Makes';
import Info from './components/Info';
import Bottom from './components/Bottom';


export default function App() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const scrollPercent = useRef(0);
    const [imgScale1, setImgScale1] = useState(false);
    const [imgScale2, setImgScale2] = useState(false);
    const [imgScale3, setImgScale3] = useState(false);
    
    
   // マウスの座標
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    // ヘルパー(x,y,z:赤,緑,青)
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

    // 地球
    let model:THREE.Object3D;
    let earthMixer: any; 
    const loader = new GLTFLoader();
    loader.load('assets/earth.glb', (gltf) => {
      model = gltf.scene;
      scene.add(model);

      if (gltf.animations && gltf.animations.length > 0) {
        earthMixer = new THREE.AnimationMixer(model);
        const action = earthMixer.clipAction(gltf.animations[0]);
        action.setLoop(THREE.LoopRepeat);
        action.repetitions = Infinity;
        action.play();
      }
    });

    // 月
    let moon:THREE.Object3D;
    const moonloader = new GLTFLoader();
    moonloader.load('assets/moon.glb', (gltf) => {
      moon = gltf.scene;
      scene.add(moon);
    });

    // 部屋
    let room:THREE.Object3D;
    let roomMixer: any; 
    const roomLoader = new GLTFLoader();
    roomLoader.load('assets/room.glb', (gltf) => {
      room = gltf.scene;
      scene.add(room);

      // Check if the GLTF model contains animations
      if (gltf.animations && gltf.animations.length > 0) {
        roomMixer = new THREE.AnimationMixer(room);
        const roomAction = roomMixer.clipAction(gltf.animations[0]);
        roomAction.setLoop(THREE.LoopRepeat);
        roomAction.repetitions = Infinity;
        roomAction.play();
      }
      room.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material.transparent = true;
          child.material.opacity = 0;
        }
      });
    });

    // 紙飛行機
    let paperAirPlane:THREE.Object3D;
    const paperAirPlaneLoader = new GLTFLoader();
    paperAirPlaneLoader.load('assets/paper_airplane.glb', (gltf) => {
      paperAirPlane = gltf.scene;

      paperAirPlane.position.x = 2;
      paperAirPlane.position.y = 1.7;
      paperAirPlane.position.z = 4;

      // 45度回転を設定
      paperAirPlane.rotation.set(0, Math.PI / 2, 0);
      scene.add(paperAirPlane);

      paperAirPlane.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material.transparent = true;
          child.material.opacity = 0;
        }
      });
    });

    // ジオメトリ
    const particlesGeometry = new THREE.BufferGeometry();
    const numberOfParticles = 500;
    const positionArr = new Float32Array(numberOfParticles * 3);

    for (let i = 0; i < numberOfParticles * 3; i++) {
      positionArr[i] = (Math.random() - 0.5) * 25;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positionArr, 3));

    // マテリアル
    const pointsMaterial = new THREE.PointsMaterial({
      size: 0.04,
      color: '#A6E5FF',
    });

    // メッシュ化（paricles）
    const particles = new THREE.Points(particlesGeometry, pointsMaterial);
    scene.add(particles);

    const animate = () => {
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
      playScrollAnimation();
    };

    const scaleParcent = (start : number, end : number) => {
      return (scrollPercent.current - start) / (end - start);
    };

    // 線形補完
    const lerp = (x : number, y : number, a : number) => {
      return (1 - a) * x + a * y;
    };

    const animationScripts :any= [];

    // 地球が回転するアニメーション
    animationScripts.push({
      start: 0,
      end: 10,
      function: () => {
        rotateEarth({
          camera,
          model,
          earthMixer,
          moon,
          paperAirPlane,
          DirectionalLight,
          lerp,
          scaleParcent,
        });
      },
    });

    // 地球が消えるアニメーション
    animationScripts.push({
      start: 10,
      end: 20,
      function: () => {
        updateEarthTransparent({
            camera, 
            model, 
            earthMixer, 
            moon,
            DirectionalLight, 
            lerp, 
            scaleParcent, 
            paperAirPlane});
      },
    });

    // 部屋アニメーション
    animationScripts.push({
      start: 20,
      end: 35,
      function: () => {
        showRoomAnimation({
            camera, 
            room, 
            DirectionalLight,
            lerp, 
            scaleParcent});
        },
    });

    // 部屋拡大アニメーション
    animationScripts.push({
      start: 35,
      end: 50,
      function: () => {
        updateRoomTransparent({
            camera, 
            room, 
            lerp, 
            scaleParcent});
        }
    });

    // PCアニメーションを再生
    animationScripts.push({
      start: 50,
      end: 55.5,
      function: () => {
        showPC({
            camera, 
            roomMixer, 
            DirectionalLight});
        },
    });

    //  PCが消えるアニメーション
    animationScripts.push({
      start: 55.5,
      end: 72,
      function: () => {
        updatePCTransparent({
            room, 
            lerp, 
            scaleParcent});
        },
    });

    animationScripts.push({
      start: 72,
      end: 74,
      function: () => setImgScale1(true),
    });

    animationScripts.push({
      start: 74,
      end: 76,
      function: () => setImgScale2(true),
    });

    animationScripts.push({
      start: 76,
      end: 78,
      function: () => setImgScale3(true),
    });

    // 最後のアニメーション
    animationScripts.push({
      start: 78,
      end: 101,
      function: () => {
        reShowEarth({
            camera, 
            model, 
            earthMixer, 
            lerp, 
            scaleParcent});
        },
    });

    // アニメーション
    function playScrollAnimation() {
      if (!model) {
        return;
      }

      animationScripts.forEach((animation:any) => {
        if (scrollPercent.current >= animation.start && scrollPercent.current < animation.end) {
          animation.function();
        }
      });
    }

    const handleScroll = () => {
      scrollPercent.current =
        (document.documentElement.scrollTop /
          (document.documentElement.scrollHeight - document.documentElement.clientHeight)) *
        100;
    };

    document.body.onscroll = handleScroll;
    window.addEventListener(
        'resize',  
        () => {handleResize(camera, renderer, sizes)});
    animate();

    return () => {
      window.removeEventListener(
        'resize', 
        () => {handleResize(camera, renderer, sizes)});
    };
  }, [scrollPercent]);



  useEffect(() => {
    // マウスイベントリスナが追加されることで、マウスが移動したときにmouseMoveListenerが実行される
    const mouseMoveListener = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    // マウント時：マウスイベントリスナを追加
    window.addEventListener("mousemove", mouseMoveListener);

    // アンマウント時：マウスイベントリスナを削除
    return () => {
      window.removeEventListener("mousemove", mouseMoveListener);
    };
  }, []);
  
  return (
    <>
        <body className="text-white">
            <canvas ref={canvasRef} />
            <div>
                <Pointer name="pointer is-small" position={mousePosition} />
                <Pointer name="pointer" position={mousePosition} />
                <Pointer name="pointer is-large" position={mousePosition} />
            </div>

            <main>
                <TopContents/>
                <Intro/>
                <Makes/>
                <Info imgScale1={imgScale1} imgScale2={imgScale2} imgScale3={imgScale3}/>
                <Bottom/>
            </main >
        </body>
    </>
  );
}