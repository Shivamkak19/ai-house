import { EventEmitter } from "events";

export default class Time extends EventEmitter{
    constructor(){
        super(); //must call super constructor to access event Emitter
        this.start = Date.now();
        this.current = this.start;
        this.elapsed = 0;
        this.delta = 16; //16 ms is time between each frame at 60 fps

        this.update();

        
    }

    update(){
        const currentTime = Date.now();
        this.delta = currentTime - this.current;
        this.current = currentTime;
        this.elapsed = this.current - this.start;
        this.emit("update"); //emits an event
        window.requestAnimationFrame(() => this.update()); //or you can use for parameter: this.update.bind(this)
    }



}