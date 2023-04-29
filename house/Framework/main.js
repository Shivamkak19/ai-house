import './style.css'
import Experience from "../Experience/Experience"


// Get the current page URL
const currentPageUrl = window.location.pathname;

// Set the sessionStorage variable based on the current page
if (currentPageUrl.includes("index")) {
  sessionStorage.setItem("currentPage", "index");
} else if(currentPageUrl.includes("home")){
  sessionStorage.setItem("currentPage", "home");
} else if (currentPageUrl.includes("aitt")) {
  sessionStorage.setItem("currentPage", "aitt");
} else if (currentPageUrl.includes("resources")) {
  sessionStorage.setItem("currentPage", "resources");
}

const currentCanvas = document.querySelector("#canvas");
const home = new Experience(currentCanvas);

const currentPage = sessionStorage.getItem("currentPage");
// console.log(currentPage);


// const canvasBox = document.querySelector("canvas");
// if(canvasBox.classList.contains(".canvas1")){
//   const currentCanvas = document.querySelector("#canvas1");
//   const home = new Experience(currentCanvas);
// }
// else if(!canvasBox.classList.contains("canvas2")){
//   const currentCanvas = document.querySelector("canvas2");
//   const home = new Experience2(currentCanvas);
// }



// console.log("gate 1");

// if(document.querySelector("#canvas1") != null){
//   console.log("gate 2");
//   const currentCanvas = document.querySelector("#canvas1");
//   const home = new Experience2(currentCanvas);

// }

// else if(document.querySelector("#canvas") != null){
//   console.log("gate5");
//   const currentCanvas = document.querySelector("#canvas1");
//   const home = new Experience(currentCanvas);

// }

// console.log("gate 3");

