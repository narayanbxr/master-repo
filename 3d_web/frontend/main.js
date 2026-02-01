// ================= IMPORTS =================
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// ================= GLOBAL VARIABLES =================
let selectedObject = null
let rotationSpeed = 0.01

// ================= SCENE =================
const scene = new THREE.Scene()
scene.background = new THREE.Color(0x111111)

// ================= PIVOT (CENTER ROTATION GROUP) =================
const pivot = new THREE.Group()
scene.add(pivot)

// (Optional but VERY useful for debugging center)
// const axes = new THREE.AxesHelper(2)
// pivot.add(axes)

// ================= CAMERA =================
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  100
)
camera.position.set(0, 0, 10)

// ================= RENDERER =================
const canvas = document.getElementById('three-canvas')
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true
})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)

// ================= LIGHTS =================
scene.add(new THREE.AmbientLight(0xffffff, 0.5))

const dirLight1 = new THREE.DirectionalLight(0xffffff, 1)
dirLight1.position.set(5, 10, 7)
scene.add(dirLight1)

const dirLight2 = new THREE.DirectionalLight(0xffffff, 0.6)
dirLight2.position.set(-5, -5, -5)
scene.add(dirLight2)

// ================= CONTROLS =================
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

// 🔴 IMPORTANT CHANGE: disable OrbitControls autoRotate
// We rotate ONLY via pivot
controls.autoRotate = false

// ================= PHYSICS MODEL =================
function physicsModel(volume, speed) {
  const pressure = volume * speed * 0.5
  const power = pressure * speed
  return { pressure, power }
}

// ================= LOAD CUBE =================
const loader = new GLTFLoader()
loader.load('/cube.glb', (gltf) => {
  const model = gltf.scene
  selectedObject = model

  // 🔹 Center geometry at origin
  const box = new THREE.Box3().setFromObject(model)
  const center = box.getCenter(new THREE.Vector3())
  model.position.sub(center)

  // 🔹 Safe visible material
  model.traverse((child) => {
    if (child.isMesh) {
      child.material = new THREE.MeshStandardMaterial({
        color: 0x4CAF50,
        roughness: 0.6,
        metalness: 0.1
      })
    }
  })

  // 🔹 Add ONLY to pivot
  pivot.add(model)

  // 🔹 Auto-fit camera
  const size = box.getSize(new THREE.Vector3())
  const maxDim = Math.max(size.x, size.y, size.z)
  const fov = camera.fov * Math.PI / 180
  let cameraZ = Math.abs(maxDim / (2 * Math.tan(fov / 2)))
  cameraZ *= 1.8

  camera.position.set(0, 0, cameraZ)
  camera.lookAt(0, 0, 0)
  controls.target.set(0, 0, 0)
  controls.update()
})

// ================= RESIZE =================
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})

// ================= ANIMATION LOOP =================
function animate() {
  requestAnimationFrame(animate)

  // ✅ PURE ROTATION ABOUT CUBE CENTER
  pivot.rotation.y += rotationSpeed

  if (selectedObject) {
    const volume =
      selectedObject.scale.x *
      selectedObject.scale.y *
      selectedObject.scale.z

    const physics = physicsModel(volume, rotationSpeed * 100)

    selectedObject.traverse((child) => {
      if (child.isMesh) {
        child.material.emissive.setRGB(
          Math.min(physics.pressure / 80, 0.3),
          0,
          0
        )
      }
    })
  }

  controls.update()
  renderer.render(scene, camera)
}
animate()

// ================= RESET VIEW =================
document.getElementById('resetBtn')?.addEventListener('click', () => {
  camera.position.set(0, 0, 10)
  controls.target.set(0, 0, 0)
  controls.update()
})

// ================= ROTATION SPEED UI =================
const speedSlider = document.getElementById('speedSlider')
const speedValue = document.getElementById('speedValue')
const speedMeter = document.getElementById('speedMeter')
const gaugeNeedle = document.getElementById('gaugeNeedle')
const rpmText = document.getElementById('rpmText')

speedSlider?.addEventListener('input', () => {
  const v = parseFloat(speedSlider.value)

  rotationSpeed = v * 0.01
  speedValue.textContent = v.toFixed(1)

  const rpm = Math.round(v * 1000)
  rpmText.textContent = rpm

  const angle = -90 + (v / 5) * 180
  gaugeNeedle.style.transform = `rotate(${angle}deg)`
  speedMeter.style.width = (v / 5) * 100 + '%'
})

// ================= DIMENSION CALCULATOR =================
const lengthInput = document.getElementById('lengthInput')
const breadthInput = document.getElementById('breadthInput')
const heightInput = document.getElementById('heightInput')
const calculateBtn = document.getElementById('calculateBtn')
const volumeValue = document.getElementById('volumeValue')
const areaValue = document.getElementById('areaValue')
const volumeMeter = document.getElementById('volumeMeter')

calculateBtn?.addEventListener('click', () => {
  if (!selectedObject) return

  const l = parseFloat(lengthInput.value)
  const b = parseFloat(breadthInput.value)
  const h = parseFloat(heightInput.value)
  if (l <= 0 || b <= 0 || h <= 0) return

  const volume = l * b * h
  const surfaceArea = 2 * (l * b + b * h + h * l)

  volumeValue.textContent = volume.toFixed(2)
  areaValue.textContent = surfaceArea.toFixed(2)
  volumeMeter.style.width = Math.min(volume * 10, 100) + '%'

  selectedObject.scale.set(l, b, h)
  drawGraph(l, b, h)
})

// ================= GRAPH =================
const graph = document.getElementById('graphCanvas')
const gctx = graph.getContext('2d')

function drawGraph(l, b, h) {
  gctx.clearRect(0, 0, graph.width, graph.height)

  const volume = l * b * h
  const heightBar = Math.min(volume * 10, graph.height)

  gctx.fillStyle = '#2196F3'
  gctx.fillRect(50, graph.height - heightBar, 50, heightBar)
  gctx.fillStyle = 'white'
  gctx.fillText('Volume', 45, graph.height - 5)
}
