import * as THREE from 
'https://unpkg.com/three@0.126.1/build/three.module.js';
import {OrbitControls} from 
'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import gsap from 'gsap'

// http://localhost:5173/

//instantiates GUI object
const gui = new dat.GUI()
const world = {
  plane: {
    width: 400,
    height: 400,
    widthSegments: 50,
    heightSegments: 50
  }
}

//gui.add adds a gui interface, onChange function runs whenever a change is made to gui.add
gui.add(world.plane, 'width', 1, 500)
  .onChange(generatePlane)
gui.add(world.plane, 'height', 1, 500)
  .onChange(generatePlane)
  gui.add(world.plane, 'widthSegments', 1, 100)
  .onChange(generatePlane)
  gui.add(world.plane, 'heightSegments', 1, 100)
  .onChange(generatePlane)

//Edits the geometry by accessing vertices, sets the planeMesh to the live changes in GUI
  function generatePlane(){
    planeMesh.geometry.dispose()
    planeMesh.geometry = new THREE.PlaneGeometry(
      world.plane.width, 
      world.plane.height, 
      world.plane.widthSegments, 
      world.plane.heightSegments
      )

//Randomly altering the xyz position of vertices to create jagged effect

//object destructuring
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

planeMesh.geometry.attributes.position.
  randomValues = randomValues
planeMesh.geometry.attributes.position.
  originalPosition = 
planeMesh.geometry.attributes.position.array

//populates an array with colors for each vertice, to pass to setAttribute function

const colors = []
for (let i = 0; i < planeMesh.geometry.attributes.position.count; i++){
  colors.push(0,.19,.4)
}

//sets the color of vertices by setting a new Buffer Attribute (Float32 Array)
// this array represents RGB color values (ranges from 0 to 1 here, not 0 to 256), hence 3 for the last parameter
planeMesh.geometry.setAttribute(
  'color', 
  new THREE.BufferAttribute(
    new Float32Array(colors), 3)
)  
  }

const raycaster = new THREE.Raycaster()
const scene = new THREE.Scene();
const camera = new THREE.
  PerspectiveCamera(75, innerWidth / 
  innerHeight, 0.1, 1000
  )

  const renderer = new THREE.WebGLRenderer(
  )

renderer.setSize(innerWidth, innerHeight)

//improves the edges of the cube animation by matching pixel ratio of the device
renderer.setPixelRatio(devicePixelRatio)

document.body.appendChild(renderer.
  domElement)

//allows orbit controls for the planeMesh
new OrbitControls(camera, renderer.domElement)
//moves the box within view of the frame
camera.position.z = 50

//Creates a planeGeometry object, adds it to the scene
const planeGeometry = new THREE.PlaneGeometry(world.plane.width, world.plane.height, world.plane.widthSegments, world.plane.heightSegments)
const planeMaterial = new THREE.MeshPhongMaterial({
  side: THREE.DoubleSide, // allows for both sides of plane to be visible
  flatShading: THREE.FlatShading, // allows you to see depth of the faces (polygonal look)
  vertexColors: true //allows for coloring of individual vertices
})

const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial)
scene.add(planeMesh)
generatePlane()

//creates a light, set position, add to scene
const light = new THREE.DirectionalLight(0xffffff, 1)
light.position.set(0,1, 1)
scene.add(light)

const backLight = new THREE.DirectionalLight(0xffffff, 1)
backLight.position.set(0,0, -1)
scene.add(backLight)

//creates an object for storing mouse coordinates
const mouse = {
  x: undefined,
  y: undefined
}

let frame = 0
//animates the box so that the box is rendered each time with +1 rotation about x axis
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
    //changes color of each of the three vertices on each face
    const {color} = intersects[0].object.geometry.attributes

    //vertice 1
    color.setX(intersects[0].face.a, 0.1)
    color.setY(intersects[0].face.a, 0.5)
    color.setZ(intersects[0].face.a, 1)

    //vertice 2
    color.setX(intersects[0].face.b, 0.1)
    color.setY(intersects[0].face.b, 0.5)
    color.setZ(intersects[0].face.b, 1)

    //vertice 3
    color.setX(intersects[0].face.c, 0.1)  
    color.setY(intersects[0].face.c, 0.5)
    color.setZ(intersects[0].face.c, 1)

    //prompts the mesh to update its colors
    intersects[0].object.geometry.attributes.
    color.needsUpdate = true

    const initialColor = {
      r: 0,
      g: 0.19,
      b: 0.4
    }

    const hoverColor = {
      r: 0.1,
      g: 0.5,
      b: 1
    }

    //Updates the attributes of hoverColor (r,g,b) to the corresponding attribute values of initialColor
    gsap.to(hoverColor, {
      r: initialColor.r,
      g: initialColor.g,
      b: initialColor.b,
      duration: 2,

    //Using onUpdate function, updates the actual value of the vertices to the update hoverColor attribute values
      onUpdate: () => {
        //vertice 1
        color.setX(intersects[0].face.a, hoverColor.r)
        color.setY(intersects[0].face.a, hoverColor.g)
        color.setZ(intersects[0].face.a, hoverColor.b)

        //vertice 2
        color.setX(intersects[0].face.b, hoverColor.r)
        color.setY(intersects[0].face.b, hoverColor.g)
        color.setZ(intersects[0].face.b, hoverColor.b)

        //vertice 3
        color.setX(intersects[0].face.c, hoverColor.r)  
        color.setY(intersects[0].face.c, hoverColor.g)
        color.setZ(intersects[0].face.c, hoverColor.b)        
      }
    })
  }
}

//sets mouse object attributes to client information from mouse movement
//normalizes mouse coordinates from -1 < x < 1 and 1 < y < -1 centered at (0,0), which is required for raycaster
addEventListener('mousemove', (event) => {
  mouse.x = (2* (event.clientX / innerWidth)) - 1 
  mouse.y = (-2* (event.clientY / innerHeight)) + 1 
})

animate()
