import './style.css'
import Experience from "./Experience/Experience"
import Transition from './navbar/js/transition'

const transition = new Transition();

const canvas = document.querySelector(".experience-canvas"); //Select the canvas element
const experience = new Experience(canvas); //Pass the canvas element as a parameter



