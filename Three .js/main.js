import * as THREE from 'three';
import { GLTFLoader } from 'GLTFLoader';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// --------------------------- ESCENA ---------------------------
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x636768);

// --------------------------- CÁMARA ---------------------------
const camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 2, 6);
const initialCameraPosition = camera.position.clone();
const initialCameraTarget = new THREE.Vector3(0, 0, 0);

// --------------------------- RENDERER ---------------------------
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

// --------------------------- LUCES ---------------------------
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 5, 5);
dirLight.castShadow = true;
scene.add(dirLight);

const dirLight2 = new THREE.DirectionalLight(0xffffff, 1);
dirLight2.position.set(-5, -5, -5);
dirLight2.castShadow = true;
scene.add(dirLight2);

// --------------------------- CONTROLES ---------------------------
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.target.copy(initialCameraTarget);

// --------------------------- OBJETOS CLICABLES ---------------------------
const cameraObjects = ["Radio","Porfolio"]; // objetos que mueven cámara
const clickableObjects = ["Radio", "Play", "Pause","Porfolio"]; // todos los clicables
const spotLights = {}; // foco individual por objeto

// --------------------------- CARGAR MODELOS ---------------------------
const loader = new GLTFLoader();

loader.load(
  'models/Museo.glb',
  (gltf) => {
    scene.add(gltf.scene);

    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        if (clickableObjects.includes(child.name)) {
          child.castShadow = true;
          child.receiveShadow = true;

          // si es de cámara, agregar foco
          if (cameraObjects.includes(child.name)) {
            const objPos = child.getWorldPosition(new THREE.Vector3());
            const spot = new THREE.SpotLight(0xffffff, 15);
            spot.position.set(objPos.x, objPos.y + 4, objPos.z); // más alto
            spot.angle = Math.PI / 10;
            spot.penumbra = 0.2;
            spot.decay = 2;
            spot.distance = 10;
            spot.target = child;
            spot.visible = false;
            spot.castShadow = true;
            scene.add(spot);
            scene.add(spot.target);
            spotLights[child.name] = spot;
          }
        }
      }
    });
  },
  undefined,
  (error) => console.error(error)
);

// --------------------------- RAYCASTER ---------------------------
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// --------------------------- DIV INFO ---------------------------
const infoDiv = document.createElement('div');
infoDiv.style.position = 'absolute';
infoDiv.style.top = '20px';
infoDiv.style.right = '20px';
infoDiv.style.padding = '10px';
infoDiv.style.backgroundColor = 'rgba(0,0,0,0.7)';
infoDiv.style.color = 'white';
infoDiv.style.fontFamily = 'Arial';
infoDiv.style.display = 'none';
infoDiv.style.zIndex = '10';
document.body.appendChild(infoDiv);

// --------------------------- BOTÓN X ---------------------------
const exitButton = document.createElement('button');
exitButton.innerText = 'X';
exitButton.style.position = 'absolute';
exitButton.style.top = '20px';
exitButton.style.left = '20px';
exitButton.style.padding = '8px 12px';
exitButton.style.fontSize = '18px';
exitButton.style.display = 'none';
document.body.appendChild(exitButton);

// --------------------------- VARIABLES AUDIO Y CÁMARA ---------------------------
let currentAudio = null;
const audioMap = { "Play": "models/Portal Radio Tune.mp3" };

let targetPosition = null;
let targetLookAt = null;
let inFocus = false;
let activeSpot = null;

// --------------------------- CLICK SOBRE OBJETO ---------------------------
renderer.domElement.addEventListener('click', (event) => {

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children, true);
  if (intersects.length === 0) return;

  let obj = intersects[0].object;
  while (obj && !obj.name) obj = obj.parent;
  if (!obj) return;

  // ---------------- AUDIO ----------------
  if (obj.name === "Play") {
    if (currentAudio) { currentAudio.pause(); currentAudio.currentTime = 0; }
    currentAudio = new Audio(audioMap["Play"]);
    currentAudio.play();
  }
  if (obj.name === "Pause") {
    if (currentAudio) { currentAudio.pause(); currentAudio.currentTime = 0; currentAudio = null; }
  }

  // ---------------- INFO ----------------
  if (clickableObjects.includes(obj.name)) {
    infoDiv.style.display = 'block';
    infoDiv.innerHTML = `<strong>Nombre:</strong> ${obj.name}<br><p>Haz clic en X para salir</p>`;
  }

  // ---------------- ENFOQUE CÁMARA ----------------
  if (cameraObjects.includes(obj.name)) {
    inFocus = true;
    controls.enabled = false;

    const objPos = obj.getWorldPosition(new THREE.Vector3());
    const forward = new THREE.Vector3(0, 0, 1);
    const worldQuaternion = obj.getWorldQuaternion(new THREE.Quaternion());
    forward.applyQuaternion(worldQuaternion);

    const distance = 0.5;
    targetPosition = objPos.clone().add(forward.multiplyScalar(distance));
    targetPosition.y += 0.3;
    targetLookAt = objPos.clone();

    exitButton.style.display = 'block';

    // ---------------- LUCES ----------------
    ambientLight.intensity = 0;

    // apagar foco previo
    if (activeSpot) activeSpot.visible = false;

    // encender foco del objeto clicado
    const spot = spotLights[obj.name];
    if (spot) { spot.visible = true; activeSpot = spot; }
  }
});

// --------------------------- BOTÓN X ---------------------------
exitButton.addEventListener('click', () => {
  inFocus = false;

  camera.position.copy(initialCameraPosition);
  controls.target.copy(initialCameraTarget);
  targetPosition = null;
  targetLookAt = null;

  exitButton.style.display = 'none';
  infoDiv.style.display = 'none';

  controls.enabled = true;
  controls.update();

  // ---------------- LUCES ----------------
  ambientLight.intensity = 0.8;
  if (activeSpot) { activeSpot.visible = false; activeSpot = null; }
});

// --------------------------- LOOP ---------------------------
function animate() {
  requestAnimationFrame(animate);

  if (targetPosition && targetLookAt) {
    camera.position.lerp(targetPosition, 0.08);
    controls.target.lerp(targetLookAt, 0.08);

    if (camera.position.distanceTo(targetPosition) < 0.01) {
      targetPosition = null;
      targetLookAt = null;
    }
  }

  controls.update();
  renderer.render(scene, camera);
}

animate();

// --------------------------- RESIZE ---------------------------
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});