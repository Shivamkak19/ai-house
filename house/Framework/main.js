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


