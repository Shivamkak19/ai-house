import * as THREE from "three"
import Sizes from "../Experience/Utils/Sizes"
import Renderer from "../Experience/Renderer"
import Time from "../Experience/Utils/Time"
import World from "../Experience/World/World"
import Resources from "../Experience/Utils/Resources"
import assets from "../Experience/Utils/assets"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import Experience from "../Experience/Experience"

export default class Camera{
    constructor(){
        this.experience = new Experience();

        this.cam4 = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, .5, 1000 );
        this.experience.scene.add(this.cam4)

        //MUST set camera position in order for orbit controls to work (Major Bug Fix, 1/17/23 1: 15 AM)
        this.cam4.position.z = 5;


    }
 


    resize(){

    }

    update(){

    }
}


/*
        //Checks if canvas from experience to camera properly
        if (!this.canvas) {
            console.error("Error: canvas is not defined.");
            return;
        }


        */


        /* Code that saved the project in debugging:

        this.cam4 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 1000);
        this.cam4.position.z = 5;
        this.scene.add(this.cam4)

        */