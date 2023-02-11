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

        // this.menuOpen = false;
        // this.menuButton = document.querySelector(".menu-button");
        // this.navBar = document.querySelector(".pages-nav");
        // this.pages = document.querySelector(".page");
        // this.pageStack = document.querySelector(".pages-stack");

        // this.pageStack.classList.toggle("cancel");

        // this.tigertrek.classList.toggle("hidden-section");
        this.setEventListeners();
    }

    //Animates based on click event listener
    //Research into what type of event listeners exist

    //On click, toggles the listed class ("slide")
    setEventListeners(){
        this.toggleButton.addEventListener("click", ()=>{
            this.toggleCircle.classList.toggle("slide");
            this.theme = this.theme==="light"? "dark": "light"; //ternary operator
            document.body.classList.toggle("dark-theme"); //dark on
            document.body.classList.toggle("light-theme"); // light off

            //method from parent class, EventEmitter
            this.emit("switch", this.theme);
        })

        // this.tiger.addEventListener("click", ()=>{
        //     this.tigertrek.classList.toggle("hidden-section");
        // })


        // this.menuButton.addEventListener("click", ()=>{
        //     document.body.classList.toggle("hidden2"); //dark on
        //     this.navBar.classList.toggle("highZ");
        //     this.pageStack.classList.toggle("highZ");
        
        //     this.navBar.style.position = this.navBar.style.position === "fixed" ? "absolute" : "fixed";
        //     this.pages.style.position = this.pages.style.position === "fixed" ? "absolute" : "fixed";
            
        //     this.pageStack.classList.toggle("cancel");
            
        //     // this.navBar.classList.toggle("positionFix");
        //     // this.pages.classList.toggle("positionFix");
        // })



    }
}




