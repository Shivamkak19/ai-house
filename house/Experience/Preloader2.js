import { EventEmitter } from "events";
import Experience from "./Experience"
import GSAP from "gsap";
import { Timeline } from "gsap/gsap-core";

export default class Preloader2 extends EventEmitter{
    constructor(){
        super();

        this.experience = new Experience();
        this.world = this.experience.world;

        this.world.on("worldready", ()=>{

            this.roomChildren = this.experience.world.room.roomChildren;
            this.start();
            console.log("check preloader2");

        })

    }

    async start(){

        console.log("initiate page load");

        const delay = ms => new Promise(res => setTimeout(res, ms));
        await delay(500);
        document.querySelector(".preloader").classList.add("hidden"); //find out why this is "hidden" instead of ".hidden"

        // Add Tiger Scaling - Apply Transform in Blender is causing issues
        this.tigerTimeline = new GSAP.timeline();
        this.tigerTimeline.to(this.roomChildren.tiger_model.scale, {
            x: 0.15,
            y: 0.15,
            z: 0.15,
            ease: "back.out.(2.2)",
            duration: 0.4,
        })


        this.emit("enablecontrols");
    }

    update(){

    }

}