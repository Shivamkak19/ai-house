import Experience from "../Experience"
import * as THREE from "three"
import GSAP from "gsap"

export default class Controls{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera;
        
    }

    resize(){

    }

    update(){

    }
}

/* Camera Customization

More things to consider:
use conditionals
use gsap to rotate the camera depending on point in curve
lerp rotations

Camera options: 

Option 1: Camera is animated along a loop, goes forward or backward

    onWheel(){
        window.addEventListener("wheel", (e) => {
            if(e.deltaY > 0){
                this.lerp.target += 0.01;
                this.back = false;
            }
            else{
                this.lerp.target -= 0.01;
                this.back = true;
            }
        })
    }

    update(){
    this.lerp.current = GSAP.utils.interpolate(this.lerp.current, this.lerp.target, this.lerp.ease);
    this.lerp.target = GSAP.utils.clamp(0, 1, this.lerp.target)
    this.lerp.current = GSAP.utils.clamp(0, 1, this.lerp.current)

    if(this.back){
        this.lerp.target += 0.001;
    }
    else{
        this.lerp.target -= 0.001;
    }

    // this.lerp.target += 0.0001; To animate LERP
    this.curve.getPointAt(this.lerp.current, this.vector1);
    this.experience.camera.orthographicCamera.position.copy(this.vector1);
    }

Option 2: Camera is manually scrolled along a loop with LERPing

    onWheel(){
        window.addEventListener("wheel", (e) => {
            if(e.deltaY > 0){
                this.lerp.target += 0.01;
            }
            else{
                this.lerp.target -= 0.01;
            }
        })
    }

    update(){
    this.lerp.current = GSAP.utils.interpolate(this.lerp.current, this.lerp.target, this.lerp.ease);
    this.lerp.target = GSAP.utils.clamp(0, 1, this.lerp.target)
    this.lerp.current = GSAP.utils.clamp(0, 1, this.lerp.current)

    this.curve.getPointAt(this.lerp.current, this.vector1);
    this.experience.camera.orthographicCamera.position.copy(this.vector1);
    }

Option 3: Infinite Loop along curve (mix/match with other options)

    onWheel(){
        window.addEventListener("wheel", (e) => {
            if(e.deltaY > 0){
                this.progress += 0.01;
                if(this.progress > 1){
                    this.progress = 0;
                }                
            }
            else{
                this.progress -= 0.01;
                if(this.progress < 0){
                    this.progress = 1;
                }
            }
        })
    }

    update(){
    //Animates the curve to the parameterization of Catmull Curve
    //this.progress % 1 returns values [0,1]
    this.curve.getPointAt(this.progress % 1, this.vector1);
    this.experience.camera.orthographicCamera.position.copy(this.vector1);
    }

Option 4: Camera looks at the path as it travels, manual scroll, LERPing

    onWheel(){
        window.addEventListener("wheel", (e) => {
            if(e.deltaY > 0){
                this.lerp.target += 0.01;
                this.back = false;
            }
            else{
                this.lerp.target -= 0.01;
                this.back = true;
            }
        })
    }

    update(){
        this.lerp.current = GSAP.utils.interpolate(this.lerp.current, this.lerp.target, this.lerp.ease);
        this.lerp.target = GSAP.utils.clamp(0, 1, this.lerp.target)
        this.lerp.current = GSAP.utils.clamp(0, 1, this.lerp.current)

        if(this.back){
            this.lerp.target += 0.001;
        }
        else{
            this.lerp.target -= 0.001;
        }

        // this.lerp.target += 0.0001; To animate LERP
        this.curve.getPointAt(this.lerp.current, this.vector1);

        this.curve.getPointAt(this.lerp.current + 0.00001, this.vector2);

        this.experience.camera.orthographicCamera.position.copy(this.vector1);
        this.camera.orthographicCamera.lookAt(this.vector2)

    }

Option 5: Camera goes along loop, always points radially inward

    this.directionalVector = new THREE.Vector3(0,0,0);
    this.staticVector = new THREE.Vector3(0,1,0);
    this.crossVector = new THREE.Vector3(0,0,0);

    onWheel(){
    window.addEventListener("wheel", (e) => {
        if(e.deltaY > 0){
            this.lerp.target += 0.01;
            this.back = false;
        }
        else{
            this.lerp.target -= 0.01;
            this.back = true;
        }
    })
    
    update(){
        this.lerp.current = GSAP.utils.interpolate(this.lerp.current, this.lerp.target, this.lerp.ease);

        this.curve.getPointAt(this.lerp.current % 1, this.vector1);
        this.camera.orthographicCamera.position.copy(this.vector1);

        //Finds tangent to the curve, direction vector. Takes cross product of the tangent and the vector (0,1, 0)
        
        this.directionalVector.subVectors(
             //automatically generates a new vector
            this.curve.getPointAt((this.lerp.current % 1) + 0.000001),
            this.vector1
            )
        this.directionalVector.normalize();
        this.crossVector.crossVectors(this.directionalVector, this.staticVector);

        //Scales the cross product so that it is effectively not starting at the origin
        this.crossVector.multiplyScalar(100000);
        
        //For more complex curves, consider setting to lookAt(0,0,0) for impression that camera is focused on the house
        this.camera.orthographicCamera.lookAt(this.crossVector)
    }

    //To make the camera outward vs inward facing, toggle static vector between (0,1,0) and (0,-1,0)
    //The multiply scalar is necessary to make sure the directional vector used 
    //is effectively the one on the path, not the one starting at the origin

Set Path function + class constructor, to create a curve to follow for camera:

    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera;
        this.progress = 0;
        this.vector1 = new THREE.Vector3(0,0,0);
        this.vector2 = new THREE.Vector3(0,0,0);

        //linear interpolation, for GSAP scroll
        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.1,
        }

        this.directionalVector = new THREE.Vector3(0,0,0);
        this.staticVector = new THREE.Vector3(0,1,0);
        this.crossVector = new THREE.Vector3(0,0,0);
        
    }

    setPath(){
            //CatmullRomCurve 3 from three.js docs
            this.curve = new THREE.CatmullRomCurve3( [
                new THREE.Vector3( -5, 0, 0),
                new THREE.Vector3( 0, 0, -5),
                new THREE.Vector3( 5, 0, 0 ),
                new THREE.Vector3( 0, 0, 5 ),
            ] );
            this.curve.closed = true;

            const points = this.curve.getPoints( 50 );
            const geometry = new THREE.BufferGeometry().setFromPoints( points );
            const material = new THREE.LineBasicMaterial( { color: 0xff0000 } );
            // Create the final object to add to the scene
            const curveObject = new THREE.Line( geometry, material );
            this.scene.add(curveObject);

        }

*/

