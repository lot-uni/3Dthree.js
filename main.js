import * as THREE from "three";
import { OBJLoader } from 'three/addons/OBJLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// サイズを指定
const width = window.innerWidth;
const height = window.innerHeight;
const modelSize = 29.5;

// レンダラーを作成
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#myCanvas"),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(width, height);
renderer.setClearColor(0x87CEEB);

// シーンを作成
const scene = new THREE.Scene();

// カメラを作成
const camera = new THREE.PerspectiveCamera(45, width / height);
camera.position.set(0, 0, +1000);

// ライトを作成
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 1);
scene.add(light);

// objデータを読み込み
const loader = new OBJLoader();
loader.load('newBottle.obj', function (object) {
    object.scale.set(modelSize,modelSize,modelSize);
    scene.add(object);
    object.rotation.x=-Math.PI/2;
    object.position.y=-250;
}, undefined, function (error) {
  console.error('An error occurred while loading the OBJ file:', error);
});

// ラベルを作成
const geometry = new THREE.CylinderGeometry(80,80,280,280);
const TextureLoader = new THREE.TextureLoader();
const texture = TextureLoader.load("img/label.jpg");
texture.colorSpace = THREE.SRGBColorSpace;
const material = new THREE.MeshStandardMaterial({
    map: texture
})
const cylinder = new THREE.Mesh(geometry,material);
cylinder.position.y = -50;
scene.add(cylinder);


// OrbitControls のセットアップ
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;  // スムーズな操作にする
controls.dampingFactor = 0.25;  // 滑らかな回転の度合い
controls.screenSpacePanning = false;  // パン操作を無効にする（回転とズームのみ）

// 毎フレーム時に実行されるループイベント
function animate() {
  requestAnimationFrame(animate);
  light.position.set(camera.position.x, camera.position.y, camera.position.z);
  light.lookAt(scene.position);  // ライトが常にシーンの中心を向くようにする
  controls.update();
  renderer.render(scene, camera);
}
animate();
