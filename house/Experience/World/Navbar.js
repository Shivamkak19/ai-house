// import { EventEmitter } from "events";
// import Experience from "../Experience"

// export default class Navbar extends EventEmitter{
//     constructor(){
//         super();
//         this.experience = new Experience();
//         this.preloader = this.experience.preloader;
//         this.resources = this.experience.resources;
//         this.world = this.experience.world;

//         // Select all elements between anchor1 and anchor2
//         // this.elements = document.querySelectorAll
//         // ("section.first-section ~ *:not(section.second-section)");

//         // this.elements = document.querySelectorAll
//         // ("div.anchor1 + *:not(div.anchor2)");

//         // Get the page-home div
//         // this.pageHome = document.querySelector(".page-home");

//         // this.sourceDiv = document.querySelector(".section-intro-wrapper");


//         this.resources.on("ready", ()=> {

//             const navbar = document.querySelector('.header');
//             let scrollCount = 0;

//             window.addEventListener('scroll', function() {
//             if (scrollCount > 1) {
//                 navbar.classList.add('hidden');
//             } else {
//                 navbar.classList.remove('hidden');
//             }
//             });

//             navbar.addEventListener('mouseenter', function() {
//             navbar.classList.remove('hidden');
//             });

//             navbar.addEventListener('mouseleave', function() {
//             scrollCount = 0;
//             navbar.classList.add('hidden');
//             });



//         });
//     }

// }



















