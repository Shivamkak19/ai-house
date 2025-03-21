import Room from "./Room"
import Controls from "./Controls"
import Environment from "./Environment"
import Experience from "../Experience";
import Floor from "./Floor";
import * as THREE from "three"
import { EventEmitter } from "events";

import Room2 from "./Room2";
import Controls2 from "./Controls2"
import Controls3 from "./Controls3"



export default class World extends EventEmitter{
    constructor(){
        super();
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.camera = this.experience.camera;
        this.resources = this.experience.resources;
        this.theme = this.experience.theme;

        //Creates world after receiving "ready" event
        this.resources.on("ready", ()=> {
            this.environment = new Environment();
            this.floor = new Floor();
            this.room = new Room2();
            this.controls = new Controls2();
            console.log("reached world2");
            this.emit("worldready");
        });

        //Switches theme after receiving event from button click
        this.theme.on("switch", (theme) =>{
            this.switchTheme(theme);
        })

    }

    switchTheme(theme){
        if(this.environment){
            this.environment.switchTheme(theme);
        }
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
        if(this.floor){
            this.floor.update();
        }

        
    }
}