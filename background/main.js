//Steps to run:
//1. Install node.js, npm, vite.js, and gsap
//2. In terminal, enter npm run dev

//imports
import * as THREE from 
'https://unpkg.com/three@0.126.1/build/three.module.js';
import {OrbitControls} from 
'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import gsap from 'gsap'

//dat.gui (development only)
/*const gui = new dat.GUI()
const world = {
  plane: {
    width: 400,
    height: 400,
    widthSegments: 50,
    heightSegments: 50
  }
}

gui.add(world.plane, 'width', 1, 500)
  .onChange(generatePlane)
gui.add(world.plane, 'height', 1, 500)
  .onChange(generatePlane)
  gui.add(world.plane, 'widthSegments', 1, 100)
  .onChange(generatePlane)
  gui.add(world.plane, 'heightSegments', 1, 100)
  .onChange(generatePlane) */

//Generate Plane
function generatePlane(){

  planeMesh.geometry.dispose()
  planeMesh.geometry = new THREE.PlaneGeometry(400, 400, 50, 50)

  const {array} = planeMesh.geometry.attributes.position
  const randomValues = []

  for (let i = 0; i < array.length; i++){

    if(i % 3 == 0){
      const x = array[i]
      const y = array[i + 1]
      const z = array[i + 2]
    
      array[i] = x + (Math.random() - 0.5) * 3
      array[i + 1] = y + (Math.random() - 0.5) * 3
      array[i + 2] = z + (Math.random() - 0.5) * 3
    }
  randomValues.push(Math.random() * Math.PI * 2)
}

planeMesh.geometry.attributes.position.randomValues = randomValues
planeMesh.geometry.attributes.position.originalPosition = planeMesh.geometry.attributes.position.array

const colors = []
for (let i = 0; i < planeMesh.geometry.attributes.position.count; i++){
  colors.push(0.188,0.188,0.188)
}

planeMesh.geometry.setAttribute(
  'color', 
  new THREE.BufferAttribute(
    new Float32Array(colors), 3)
)  
  }

//Objects/Attributes
const raycaster = new THREE.Raycaster()
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer()

const mouse = {
  x: undefined,
  y: undefined
}

//Orbit Controls
document.body.appendChild(renderer.domElement)
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableZoom = true
//controls.enableRotate = false

/*
controls.listenToKeyEvents(document.body)
controls.keys = {
	LEFT: 'ArrowLeft', //left arrow
	UP: 'ArrowUp', // up arrow
	RIGHT: 'ArrowRight', // right arrow
	BOTTOM: 'ArrowDown' // down arrow
}
*/

controls.minAzimuthAngle = -1 * (Math.PI / 2.5)
controls.maxAzimuthAngle = Math.PI / 2.5
controls.minPolarAngle = Math.PI / 16
controls.maxPolarAngle = Math.PI
controls.minDistance = 15
controls.maxDistance = 300
controls.enableDamping = true;
controls.dampingFactor = .05

renderer.setSize(innerWidth, innerHeight)
renderer.setPixelRatio(devicePixelRatio)

const planeGeometry = new THREE.PlaneGeometry(400,400,50,50)
const planeMaterial = new THREE.MeshPhongMaterial({side: THREE.DoubleSide, flatShading: THREE.FlatShading, vertexColors: true })
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial)
const light = new THREE.DirectionalLight(0xffffff, 1)
const backLight = new THREE.DirectionalLight(0xffffff, 1)

//animate
let frame = 0
function animate() {
  requestAnimationFrame(animate)
  renderer.render(scene, camera) 
  raycaster.setFromCamera(mouse, camera)

  frame += 0.01
  const {array, originalPosition, randomValues} = planeMesh.geometry.attributes.position
  for(let i = 0; i < array.length; i+= 3){

    array[i] = originalPosition[i] + Math.cos(frame + randomValues[i]) * 0.01
    array[i + 1] = originalPosition[i + 1] + Math.sin(frame + randomValues[i + 1]) * 0.01
  }

  planeMesh.geometry.attributes.position.needsUpdate = true
  
  const intersects = raycaster.intersectObject(planeMesh) //checks if mouse is touching plane
  if (intersects.length > 0){

    const {color} = intersects[0].object.geometry.attributes
    intersects[0].object.geometry.attributes.
    color.needsUpdate = true

    const initialColor = {
      r: 0.188,
      g: 0.188,
      b: 0.188
    }

    const hoverColor = {
      //hover orange 1
      r: 244 / 255,  
      g: 164 / 255,
      b: 16 / 255,
      //hover color 2
      rr: 9 / 255,          
      gg: 155 / 255,
      bb: 228 / 255,  
      //hover color 3
      rrr: 228 / 255,        
      ggg: 104 / 255,
      bbb: 9 / 255,    
    }

    gsap.to(hoverColor, {
      r: initialColor.r,
      g: initialColor.g,
      b: initialColor.b,
      rr: initialColor.r,
      gg: initialColor.g,
      bb: initialColor.b,
      rrr: initialColor.r,
      ggg: initialColor.g,
      bbb: initialColor.b,      

      duration: 30,
      onUpdate: () => {
        //vertice 1
        color.setX(intersects[0].face.a, hoverColor.r)
        color.setY(intersects[0].face.a, hoverColor.g)
        color.setZ(intersects[0].face.a, hoverColor.b)

        //vertice 2
        color.setX(intersects[0].face.b, hoverColor.rr)
        color.setY(intersects[0].face.b, hoverColor.gg)
        color.setZ(intersects[0].face.b, hoverColor.bb)

        //vertice 3
        color.setX(intersects[0].face.c, hoverColor.rrr)  
        color.setY(intersects[0].face.c, hoverColor.ggg)
        color.setZ(intersects[0].face.c, hoverColor.bbb)        
      }
    })
  } 
}

//Run Commands
scene.add(planeMesh)
scene.add(light)
scene.add(backLight)

light.position.set(0,1, 1)
backLight.position.set(0,0, -1)
camera.position.z = 50

addEventListener('mousemove', (event) => {
  mouse.x = (2* (event.clientX / innerWidth)) - 1 
  mouse.y = (-2* (event.clientY / innerHeight)) + 1 
}) 
generatePlane()
animate()
