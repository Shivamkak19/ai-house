import * as THREE from "three"

import Experience from "./Experience"
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"

export default class Camera{
    constructor(){
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;

        this.createPerspectiveCamera();
        this.createOrthographicCamera();
        this.setOrbitControls();
    }
    
    //Creates a Camera, with parameters FOV, aspect ratio, near, far)
    createPerspectiveCamera(){
        this.perspectiveCamera = new THREE.PerspectiveCamera(70, this.sizes.aspect, .1, 1000);
        // this.perspectiveCamera.position.x = 29;
        // this.perspectiveCamera.position.y = 14;
        // this.perspectiveCamera.position.z = 12;
        
        this.perspectiveCamera.position.x = 0;
        this.perspectiveCamera.position.y = 3.5;
        this.perspectiveCamera.position.z = 0;
        this.perspectiveCamera.zoom = 3
        this.helper = new THREE.CameraHelper(this.perspectiveCamera);

        this.scene.add(this.perspectiveCamera)
    }

    //Creates an orthographic camera with necessary parameters
    createOrthographicCamera(){
        this.orthographicCamera = new THREE.OrthographicCamera(
            (-this.sizes.aspect * this.sizes.frustrum) /2,
            (this.sizes.aspect * this.sizes.frustrum) /2,
            this.sizes.frustrum/2,
            -this.sizes.frustrum/2,
            -20,
            20
        );

        //Adjusts camera view for LERP rotation with mouse move 
        //Could also use lookAt origin, but just used rotation.x
        this.orthographicCamera.position.x = 0
        this.orthographicCamera.position.y = -1.5;
        this.orthographicCamera.position.z = -10;
        this.orthographicCamera.rotation.x = -Math.PI / 6;
        this.orthographicCamera.zoom = 0.25

        this.scene.add(this.orthographicCamera)

        //grid helper and axes helper 
        // const size = 20;
        // const divisions = 20;
        // const gridHelper = new THREE.GridHelper( size, divisions );
        // this.scene.add( gridHelper );
        // const axesHelper = new THREE.AxesHelper( 100 );
        // this.scene.add( axesHelper ); 

        //Adds grid to help see and adjust lights
        this.helper = new THREE.CameraHelper(this.orthographicCamera);
        // this.scene.add(this.helper);
    }

    setOrbitControls(){

        this.controls = new OrbitControls(this.perspectiveCamera, this.canvas);       
        this.controls.enableZoom = true; 
        
        // this.controls.minAzimuthAngle = -1 * (Math.PI / 2.5)
        // this.controls.maxAzimuthAngle = Math.PI / 2.5
        // this.controls.minPolarAngle = Math.PI / 16
        // this.controls.maxPolarAngle = Math.PI
        // this.controls.minDistance = 15
        // this.controls.maxDistance = 300
        this.controls.enableDamping = true;
        this.controls.dampingFactor = .05
    }

    //Resizes the camera parameters when window size changes
    resize(){
        this.perspectiveCamera.aspect = this.sizes.aspect;
        this.perspectiveCamera.updateProjectionMatrix();

        this.orthographicCamera.left = (-this.sizes.aspect *this.sizes.frustrum) /2;
        this.orthographicCamera.right = (this.sizes.aspect *this.sizes.frustrum) /2;
        this.orthographicCamera.top = this.sizes.frustrum/2;
        this.orthographicCamera.bottom = -this.sizes.frustrum/2;
        this.orthographicCamera.updateProjectionMatrix();
    }

    update(){
        this.controls.update();

        // Update for orthographic camera helper
        // this.helper.matrixWorldNeedsUpdate = true;
        // this.helper.update();
        // this.helper.position.copy(this.orthographicCamera.position);
        // this.helper.rotation.copy(this.orthographicCamera.rotation);

        // To determine placement of camera
        // console.log(this.perspectiveCamera.position)
    }
}


