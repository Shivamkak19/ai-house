import './style.css'
import Experience from "./Experience/Experience"
import Transition from './navbar/js/transition'

// const transition = new Transition();

const canvas = document.querySelector("#canvas"); //Select the canvas element
const experience = new Experience(canvas); //Pass the canvas element as a parameter

//Option 1, same thing
//const experience = new Experience(document.querySelector(".experience-canvas"))

// if (!canvas) {
//     console.error("Error: canvas element not found. Make sure the canvas element is present in the HTML.");
// }




