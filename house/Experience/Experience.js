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
import Navbar from "./World/Navbar"

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
        this.world = new World();
        this.preloader = new Preloader();
        this.renderer = new Renderer();

        // this.navbar = new Navbar();


        this.preloader.on("enablecontrols", ()=>{
            this.controls = new Controls();
        })

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