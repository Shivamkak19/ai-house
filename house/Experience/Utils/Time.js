import { EventEmitter } from "events";
import Stats from 'stats.js'


export default class Time extends EventEmitter{
    constructor(){
        super(); //must call super constructor to access event Emitter
        this.start = Date.now();
        this.current = this.start;
        this.elapsed = 0;
        this.delta = 16; //16 ms is time between each frame at 60 fps

        this.stats = new Stats()
        this.stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
        document.body.appendChild(this.stats.dom)        

        this.update();

        
    }

    update(){
        this.stats.begin();

        const currentTime = Date.now();
        this.delta = currentTime - this.current;
        this.current = currentTime;
        this.elapsed = this.current - this.start;
        this.emit("update"); //emits an event
        window.requestAnimationFrame(() => this.update()); //or you can use for parameter: this.update.bind(this)

        this.stats.end();
    }



}