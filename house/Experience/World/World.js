import Room from "./Room"
import Controls from "./Controls"
import Environment from "./Environment"
import Experience from "../Experience";
import Floor from "./Floor";
import * as THREE from "three"

export default class World{
    constructor(){
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.camera = this.experience.camera;
        this.resources = this.experience.resources;

        //Creates world after receiving "ready" event
        this.resources.on("ready", ()=> {
            this.environment = new Environment();
            this.room = new Room();
            this.floor = new Floor();
            this.controls = new Controls();
        });

    }

    resize(){

    }

    update(){
        //This will be called by experience class before assets are loaded, so must put conditional of whether room has been created to avoid null error
        if(this.room){
            this.room.update();
        }
        if(this.controls){
            this.controls.update();
        }

        
    }
}