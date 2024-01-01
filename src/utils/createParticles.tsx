// ライブラリのインポート
import * as THREE from 'three';

export default function createParticles(scene: THREE.Scene) {
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
}
