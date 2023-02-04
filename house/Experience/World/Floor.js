import Experience from "../Experience"
import * as THREE from "three"
import GSAP from "gsap"

export default class Floor{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.light1 = this.experience.world.environment.sunLight;
        this.light2 = this.experience.world.environment.sunLight2;
        this.light3 = this.experience.world.environment.sunLight3;
        this.raycaster = new THREE.Raycaster();
        this.camera = this.experience.camera;
        this.renderer = this.experience.renderer;
        this.frame = 0;

        this.mouse = {
          x: undefined,
          y: undefined
        }

        this.light2.position.set(0,1, 1)
        this.light3.position.set(0,0, -1)
        this.camera.perspectiveCamera.position.z = 50

        this.setFloor();
        this.setCircles();
        this.onMouseMove();
        this.generatePlane();

    }

    setFloor(){
        this.geometry = new THREE.PlaneGeometry(10, 10, 10, 10);
        this.material = new THREE.MeshPhongMaterial({side: THREE.DoubleSide, flatShading: true, vertexColors: true })
        this.plane = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.plane);
        //this.plane.rotation.x = Math.PI / 2;
        this.plane.position.x = 0; 
        this.plane.position.y = 0; 
        this.plane.position.z = -20; 
        this.plane.visible = true; // Will set to true with GSAP
        this.plane.receiveShadow = true; //not working
    }

    generatePlane(){
      this.plane.geometry.dispose()
      this.plane.geometry = new THREE.PlaneGeometry(400, 400, 100, 75);
    
      const {array} = this.plane.geometry.attributes.position
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

    this.plane.geometry.attributes.position.randomValues = randomValues
    // console.log(this.plane.geometry.attributes.position.randomValues === randomValues)
    this.plane.geometry.attributes.position.originalPosition = this.plane.geometry.attributes.position.array
    
    const colors = []
    for (let i = 0; i < this.plane.geometry.attributes.position.count; i++){
      colors.push(0.1,0.1,1)
    }
    //set to (0.1, 0.1, 1) for purple

    this.plane.geometry.setAttribute(
      'color', 
      new THREE.BufferAttribute(
        new Float32Array(colors), 3)
    )  
    }

    onMouseMove(){
      addEventListener("mousemove", (event) => {
        this.mouse.x = (2* (event.clientX / innerWidth)) - 1
        this.mouse.y = (-2* (event.clientY / innerHeight)) + 1 
      }) 

    }

    animate(){
      this.raycaster.setFromCamera(this.mouse, this.camera.orthographicCamera)
      this.frame += 0.01;

      const {array, originalPosition, randomValues} = this.plane.geometry.attributes.position
      for(let i = 0; i < array.length; i+= 3){
    
        array[i] = originalPosition[i] + Math.cos(this.frame + randomValues[i]) * 0.005
        array[i + 1] = originalPosition[i + 1] + Math.sin(this.frame + randomValues[i + 1]) * 0.005
      }
    
      this.plane.geometry.attributes.position.needsUpdate = true
      
      const intersects = this.raycaster.intersectObject(this.plane) //checks if mouse is touching plane
      if (intersects.length > 0){
    
        const {color} = intersects[0].object.geometry.attributes
        intersects[0].object.geometry.attributes.color.needsUpdate = true
    
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
    
        GSAP.to(hoverColor, {
          r: initialColor.r,
          g: initialColor.g,
          b: initialColor.b,
          rr: initialColor.r,
          gg: initialColor.g,
          bb: initialColor.b,
          rrr: initialColor.r,
          ggg: initialColor.g,
          bbb: initialColor.b,      
    
          duration: 5,
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

    setCircles(){
      const geometry = new THREE.CircleGeometry( 5, 64);
      const material1 = new THREE.MeshStandardMaterial( { color: 0x040404 } );
      const material2 = new THREE.MeshStandardMaterial( { color: 0xFF6C00 } );
      const material3 = new THREE.MeshStandardMaterial( { color: 0x0074FF } );

      console.log()

      // material1.
      this.circle1 = new THREE.Mesh( geometry, material1 );
      this.circle2 = new THREE.Mesh( geometry, material2 );
      this.circle3 = new THREE.Mesh( geometry, material3 );

      this.circle1.position.y = -0.29;

      //Offsets 2nd circle to follow movement of the house
      this.circle2.position.y = -0.28;
      this.circle2.position.x = 2;

      this.circle3.position.y = -0.27;

      this.circle1.scale.set(0,0,0);
      this.circle2.scale.set(0,0,0);
      this.circle3.scale.set(0,0,0);

      this.circle1.rotation.x = -Math.PI / 2;
      this.circle2.rotation.x = -Math.PI / 2;
      this.circle3.rotation.x = -Math.PI / 2;

      this.circle1.receiveShadow = true;
      this.circle2.receiveShadow = true;
      this.circle3.receiveShadow = true;

      this.circle1.material.transparent = true;
      this.circle2.material.transparent = true;
      this.circle3.material.transparent = true;

      this.circle1.material.opacity = 0.3;
      this.circle2.material.opacity = 0.4;
      this.circle3.material.opacity = 0.4;

      console.log(this.circle1.material.opacity)

      this.scene.add(this.circle1);
      this.scene.add(this.circle2);
      this.scene.add(this.circle3);
    }

    resize(){

    }

    update(){
      this.animate()
    }
}

