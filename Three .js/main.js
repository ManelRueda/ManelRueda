import * as THREE from 'three';
import { GLTFLoader } from 'GLTFLoader';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// --------------------------- A. ESCENA ---------------------------
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xB1B8BA);

// --------------------------- B. CÁMARA ---------------------------
const camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(1, 1, 4);
// Guardamos la posición y objetivo inicial de la cámara
const initialCameraPosition = camera.position.clone();
const initialCameraTarget = new THREE.Vector3(0, 0, 0);

// --------------------------- C. RENDERER ---------------------------
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

// --------------------------- D. LUCES ---------------------------
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 5, 5);

const dirLight2 = new THREE.DirectionalLight(0xffffff, 1);
dirLight2.position.set(-5, -5, -5);

scene.add(dirLight, dirLight2);

// --------------------------- E. CARGAR MODELOS ---------------------------
const loader = new GLTFLoader();

loader.load(
  'models/Nombre.glb',
  (gltf) => scene.add(gltf.scene),
  undefined,
  (error) => console.error(error)
);

loader.load(
  'models/Radio.glb',
  (gltf) => {
    gltf.scene.position.set(2, -2, 0);
    scene.add(gltf.scene);
  },
  undefined,
  (error) => console.error(error)
);

// --------------------------- F. CONTROLES ---------------------------
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// --------------------------- G. CLICK / RAYCASTER ---------------------------
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Div de información
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

// Variables para animación de cámara
let targetPosition = null;
let targetLookAt = null;
let currentLookAt = initialCameraTarget.clone();

// --------------------------- J. AUDIO ---------------------------
let currentAudio = null;

// Relación NOMBRE BLENDER → AUDIO
const audioMap = {
  "Play": "models/Portal Radio Tune.mp3",
  // Puedes agregar otros objetos con audio aquí
  // "Objeto2": "audio/sonido2.mp3",
};

// --------------------------- CLICK ---------------------------
renderer.domElement.addEventListener('click', onClick);

function onClick(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children, true);

  // Click fuera → restaurar cámara, ocultar info y parar audio
  if (intersects.length === 0) {
    infoDiv.style.display = 'none';
    targetPosition = initialCameraPosition.clone();
    targetLookAt = initialCameraTarget.clone();
    controls.enabled = true;
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      currentAudio = null;
    }
    return;
  }

  // Buscar objeto con nombre (subir por la jerarquía si hace falta)
  let obj = intersects[0].object;
  while (obj && !obj.name) obj = obj.parent;

  if (!obj) {
    infoDiv.style.display = 'none';
    targetPosition = initialCameraPosition.clone();
    targetLookAt = initialCameraTarget.clone();
    controls.enabled = true;
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      currentAudio = null;
    }
    return;
  }

  console.log("Nombre en Blender:", obj.name);

  // --------------------------- AUDIO ---------------------------
  if (obj.name === "Play") {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }
    currentAudio = new Audio(audioMap["Play"]);
    currentAudio.play();
  } else if (obj.name === "Pause") {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      currentAudio = null;
    }
  }

  // --------------------------- MOSTRAR INFO ---------------------------
  infoDiv.style.display = 'block';
  infoDiv.innerHTML = `<strong>Nombre:</strong> ${obj.name}<br><p>Haz clic fuera del objeto para cerrar</p>`;

  // --------------------------- ACERCAR CÁMARA ---------------------------
  controls.enabled = false;
  const offset = new THREE.Vector3(0, 0, 2);
  targetPosition = obj.getWorldPosition(new THREE.Vector3()).clone().add(offset);
  targetLookAt = obj.getWorldPosition(new THREE.Vector3()).clone();
}


        // --------------------------- H. LOOP / ANIMACIÓN ---------------------------
        function animate() {
          requestAnimationFrame(animate);

        if (targetPosition && targetLookAt) {
          camera.position.lerp(targetPosition, 0.1);
          currentLookAt.lerp(targetLookAt, 0.1);
          camera.lookAt(currentLookAt);
    }

        controls.update();
        renderer.render(scene, camera);
}

        animate();

// --------------------------- I. AJUSTE DE VENTANA ---------------------------
window.addEventListener('resize', () => {
          camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
});
