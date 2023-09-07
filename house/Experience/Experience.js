import * as THREE from "three"
import Sizes from "./Utils/Sizes"
import Camera from "./Camera"
import Renderer from "./Renderer"
import Time from "./Utils/Time"
import World from "./World/World"
import Resources from "./Utils/Resources"
import assets from "./Utils/assets"
import Theme from "./Theme"
import Preloader from "./Preloader"
import Controls from "./World/Controls"

import Controls2 from "./World/Controls2"
import World2 from "./World/World2"
import Preloader2 from "./Preloader2"

import Controls3 from "./World/Controls3"
import World3 from "./World/World3"


export default class Experience{

    static instance;
    constructor(canvas){
        if(Experience.instance){
            return Experience.instance
        }
        Experience.instance = this
        this.canvas = canvas;

        this.scene = new THREE.Scene();
        this.time = new Time();
        this.sizes = new Sizes();
        this.camera = new Camera();
        this.resources = new Resources(assets); //assets is parameter for Resources constructor
        this.theme = new Theme();
        this.renderer = new Renderer();

        //Set local variable to current page
        const currentPage = sessionStorage.getItem("currentPage");
        console.log(currentPage);

        //Set customizations
        if(currentPage === "index"){
            console.log("loading index customization");
            this.world = new World();
            this.preloader = new Preloader();

            // this.preloader.on("enablecontrols", ()=>{
            //     this.controls = new Controls3();
            // })
        }
        if(currentPage === "home"){
            console.log("loading second customization");
            this.world = new World2();
            this.preloader = new Preloader2();


        }
        else if(currentPage === "aitt"){
            console.log("loading aitt customization");

            this.world = new World3();
            this.preloader = new Preloader2();

        }
        else if(currentPage === "resources" || currentPage === "team"){
            console.log("loading resources customization");
            
            this.world = new World3();
            this.preloader = new Preloader2();
        }

        //On Update function - on Event Emitters
        this.sizes.on("resize", ()=>{
            this.resize();
        })
        this.time.on("update", ()=>{
            this.update();
        })
        
    }

    //functions
    resize(){
        this.camera.resize();
        this.world.resize();
        this.renderer.resize();
    }

    update(){
        this.preloader.update();
        this.camera.update();
        this.world.update();
        this.renderer.update();
    }
    
}