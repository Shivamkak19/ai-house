import * as THREE from "three"

import Experience from "./Experience"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
//import { Camera } from "three";
import Camera from "./Camera"

export default class Renderer{


    constructor(){
        this.experience = new Experience();
        this.camera3 = new Camera();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.camera = this.experience.camera;

        this.setRenderer();

    }

    setRenderer() {
        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true});
    
        //Attributes for desired render output
        this.renderer.physicallyCorrectLights = true;
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.renderer.toneMapping = THREE.CineonToneMapping; //enables tone map
        this.renderer.toneMappingExposure = 1.75;
        this.renderer.shadowMap.enabled = true; //enables shadows
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(this.sizes.pixelRatio); //sets pixel ratio
    }

    resize(){
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(this.sizes.pixelRatio); 
    }

    update(){
        // this.renderer.setViewport(0,0, this.sizes.width, this.sizes.height)
        this.renderer.render(this.scene, this.camera.orthographicCamera)

        //Second Screen
        //Cuts the viewport into sections, must set the cutout shape (set scissor), 
        //as well as what goes into the cutout (setViewport with customized dimensions)
        //change which camera view is put where by changing the camera input for each separate this.renderer.render()
        // this.renderer.setScissorTest(true);
        // this.renderer.setViewport(
        //     this.sizes.width - this.sizes.width / 3,
        //     this.sizes.height - this.sizes.height / 3,
        //     this.sizes.width / 3,
        //     this.sizes.height / 3
        // );

        // this.renderer.setScissor(
        //     this.sizes.width - this.sizes.width / 3,
        //     this.sizes.height - this.sizes.height / 3,
        //     this.sizes.width / 3,
        //     this.sizes.height / 3
        // );

        // this.renderer.render(this.scene, this.camera.perspectiveCamera)
        // this.renderer.setScissorTest(false);
    }
}
