import { EventEmitter } from "events";
import Experience from "./Experience"

export default class Preloader2 extends EventEmitter{
    constructor(){
        super();

        this.experience = new Experience();
        this.world = this.experience.world;

        this.world.on("worldready", ()=>{

            this.start();
            console.log("check preloader2");

        })

    }

    async start(){

        console.log("initiate page load");

        const delay = ms => new Promise(res => setTimeout(res, ms));
        await delay(500);
        document.querySelector(".preloader").classList.add("hidden"); //find out why this is "hidden" instead of ".hidden"

        this.emit("enablecontrols");
    }

    update(){

    }

}