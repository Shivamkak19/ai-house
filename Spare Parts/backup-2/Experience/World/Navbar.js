import { EventEmitter } from "events";
import Experience from "../Experience"

export default class Navbar extends EventEmitter{
    constructor(){
        super();
        this.experience = new Experience();
        this.preloader = this.experience.preloader;
        this.resources = this.experience.resources;
        this.world = this.experience.world;

        // Select all elements between anchor1 and anchor2
        // this.elements = document.querySelectorAll
        // ("section.first-section ~ *:not(section.second-section)");

        this.elements = document.querySelectorAll
        ("div.anchor1 + *:not(div.anchor2)");

        // Get the page-home div
        this.pageHome = document.querySelector(".page-home");

        // this.sourceDiv = document.querySelector(".section-intro-wrapper");


        this.resources.on("ready", ()=> {

            // this.viewportOutput = document.body.innerHTML;
            // this.pageHome.innerHTML = this.viewportOutput;

            // this.copiedCanvas = this.canvas.cloneNode(true);
            // this.pageHome.appendChild(this.copiedCanvas);

            // // Loop through the selected elements
            // for (let i = 0; i < this.elements.length; i++) {
            // // Make a clone of the element
            //     let clone = this.elements[i].cloneNode(true);
            // // Append the clone to the page-home div
            //     this.pageHome.appendChild(clone);
            // }



            const sectionIntroWrapper = document.querySelector(".section-intro-wrapper");

            const sectionIntroWrapperClone = sectionIntroWrapper.cloneNode(true);
            this.pageHome.appendChild(sectionIntroWrapperClone);
            this.pageHome.classList.add("no-interaction");



//             // Get the page-home div
// const pageHome = document.getElementById("page-home");

// // Get the canvas element 
// const canvas = document.querySelector('.experience-canvas#canvas');

// // Make a copy of the canvas element 
// const canvasCopy = canvas.cloneNode(true);

// // Loop through the selected elements
// for (let i = 0; i < this.elements.length; i++) {
//     // Make a copy of the current element
//     const elementCopy = this.elements[i].cloneNode(true);

//     // Append the copy of the element to the page-home div
//     pageHome.appendChild(elementCopy);
// }

// // Append the copy of the canvas element to the page-home div
// pageHome.appendChild(canvasCopy);


        });
    }

}



















