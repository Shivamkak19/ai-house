import './style.css'
import Experience from "./Experience/Experience"
import { EventEmitter } from "events";
import {transition} from './js/transition'

// const transition = new Transition();

const canvas = document.querySelector("#canvas"); //Select the canvas element
const experience = new Experience(canvas); //Pass the canvas element as a parameter


