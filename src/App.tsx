/* eslint @typescript-eslint/no-explicit-any: 0 */

// ライブラリのインポート
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// 外部関数のインポート
import handleResize from './utils/HandleResize';
import showRoomAnimation from './animation/ShowRoom';
import rotateEarth from './animation/ShowEarth';
import updateEarthTransparent from './animation/UpdateEarthTransparency';
import updateRoomTransparent from './animation/UpdateRoomTransparency';
import showPC from './animation/ShowPc';
import updatePCTransparent from './animation/UpdatePCTransparency';
import reShowEarth from './animation/ReShowEarth';
import lerp from './utils/LinearCompletionFormula';
import createParticles from './utils/createParticles';
import createScene from './utils/createScene';
import handleScroll from './utils/HandleScroll';

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
    // シーンの作成
    const { sizes, scene, DirectionalLight, camera, renderer } = createScene(canvasRef);

    // 地球
    let model: THREE.Object3D;
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
    let moon: THREE.Object3D;
    const moonloader = new GLTFLoader();
    moonloader.load('assets/moon.glb', (gltf) => {
      moon = gltf.scene;
      scene.add(moon);
    });

    // 部屋
    let room: THREE.Object3D;
    let roomMixer: any;
    const roomLoader = new GLTFLoader();
    roomLoader.load('assets/room.glb', (gltf) => {
      room = gltf.scene;
      scene.add(room);

      room.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material.transparent = true;
          child.material.opacity = 0;
        }
      });
    });

    // 紙飛行機
    let paperAirPlane: THREE.Object3D;
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

    // パーティクルの生成
    createParticles(scene);

    const animate = () => {
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
      playScrollAnimation();
    };

    const scaleParcent = (start: number, end: number) => {
      return (scrollPercent.current - start) / (end - start);
    };

    // アニメーションの格納先
    const animationScripts: any = [];

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
          paperAirPlane,
        });
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
          scaleParcent,
        });
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
          scaleParcent,
        });
      },
    });

    // PCアニメーションを再生
    animationScripts.push({
      start: 50,
      end: 55.5,
      function: () => {
        showPC({
          camera,
          roomMixer,
          DirectionalLight,
        });
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
          scaleParcent,
        });
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
          scaleParcent,
        });
      },
    });

    // アニメーション
    function playScrollAnimation() {
      if (!model) {
        return;
      }

      animationScripts.forEach((animation: any) => {
        if (scrollPercent.current >= animation.start && scrollPercent.current < animation.end) {
          animation.function();
        }
      });
    }

    const fetchHandleScroll = handleScroll(scrollPercent);
    document.body.onscroll = fetchHandleScroll;

    window.addEventListener('resize', () => {
      handleResize(camera, renderer, sizes);
    });
    animate();

    return () => {
      window.removeEventListener('resize', () => {
        handleResize(camera, renderer, sizes);
      });
    };
  }, [scrollPercent]);

  // マウント時：マウスイベントリスナを追加
  useEffect(() => {
    const mouseMoveListener = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', mouseMoveListener);
  }, []);

  return (
    <>
      <canvas ref={canvasRef} />
      <div>
        <Pointer name="pointer is-small" position={mousePosition} />
        <Pointer name="pointer" position={mousePosition} />
        <Pointer name="pointer is-large" position={mousePosition} />
      </div>

      <main>
        <TopContents />
        <Intro />
        <Makes />
        <Info imgScale1={imgScale1} imgScale2={imgScale2} imgScale3={imgScale3} />
        <Bottom />
      </main>
    </>
  );
}
