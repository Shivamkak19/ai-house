import { EventEmitter } from "events";

export default class Theme extends EventEmitter{
    constructor(){
        super();
        this.theme = "light"

        //grabs the HTML element with class name ("")
        this.toggleButton = document.querySelector(".toggle-button");
        this.toggleCircle = document.querySelector(".toggle-circle");

        this.tiger = document.querySelector("#tiger");
        this.tigertrek = document.querySelector("#tigertrek")

        this.setEventListeners();
    }

    setEventListeners(){
        this.toggleButton.addEventListener("click", ()=>{
            this.toggleCircle.classList.toggle("slide");
            this.theme = this.theme==="light"? "dark": "light"; //ternary operator
            document.body.classList.toggle("dark-theme"); //dark on
            document.body.classList.toggle("light-theme"); // light off

            //method from parent class, EventEmitter
            this.emit("switch", this.theme);
        })



    }
}




