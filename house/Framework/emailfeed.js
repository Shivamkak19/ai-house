// Import JSON to dynamically fill text content
import emailFeed from "./emailfeed.json"
// Convert to array to grab first 3 elements of array
const emailFeedArray = Object.values(emailFeed)

console.log(emailFeedArray)


// Grab relevant DOM elements
// Feed Display 1
const fullModeButton1 = document.querySelector(".fullMode1")
const emailFeed1 = fullModeButton1.parentElement.parentElement
const longBio1 = emailFeed1.lastElementChild.lastElementChild

const image1 = emailFeed1.firstElementChild
const title1 = emailFeed1.children[1].firstElementChild
const date1 = emailFeed1.children[1].lastElementChild


// Feed Display 2
const fullModeButton2 = document.querySelector(".fullMode2")
const emailFeed2 = fullModeButton2.parentElement.parentElement
const longBio2 = emailFeed2.lastElementChild.lastElementChild

const image2 = emailFeed2.firstElementChild
const title2 = emailFeed2.children[1].firstElementChild
const date2 = emailFeed2.children[1].lastElementChild


// Feed Display 3
const fullModeButton3 = document.querySelector(".fullMode3")
const emailFeed3 = fullModeButton3.parentElement.parentElement
const longBio3 = emailFeed3.lastElementChild.lastElementChild

const image3 = emailFeed3.firstElementChild
const title3 = emailFeed3.children[1].firstElementChild
const date3 = emailFeed3.children[1].lastElementChild

// Feed Display 4
const fullModeButton4 = document.querySelector(".fullMode4")
const emailFeed4 = fullModeButton4.parentElement.parentElement
const longBio4 = emailFeed4.lastElementChild.lastElementChild

const image4 = emailFeed4.firstElementChild
const title4 = emailFeed4.children[1].firstElementChild
const date4 = emailFeed4.children[1].lastElementChild



// Set Images, titles, and short bios dynamically
image1.src = emailFeedArray[0].img
title1.innerHTML = emailFeedArray[0].title
date1.innerHTML = emailFeedArray[0].date
longBio1.innerHTML =  emailFeedArray[0].short

image2.src = emailFeedArray[1].img
title2.innerHTML = emailFeedArray[1].title
date2.innerHTML = emailFeedArray[1].date
longBio2.innerHTML =  emailFeedArray[1].short


image3.src = emailFeedArray[2].img
title3.innerHTML = emailFeedArray[2].title
date3.innerHTML = emailFeedArray[2].date
longBio3.innerHTML =  emailFeedArray[2].short


image4.src = emailFeedArray[3].img
title4.innerHTML = emailFeedArray[3].title
date4.innerHTML = emailFeedArray[3].date
longBio4.innerHTML =  emailFeedArray[3].short



// Set Event listeners for fullMode button clicks
handleClickFullMode(fullModeButton1, emailFeed1, longBio1, emailFeedArray[0])
handleClickFullMode(fullModeButton2, emailFeed2, longBio2, emailFeedArray[1])
handleClickFullMode(fullModeButton3, emailFeed3, longBio3, emailFeedArray[2])
handleClickFullMode(fullModeButton4, emailFeed4, longBio4, emailFeedArray[3])


// Add event listeners and adjust styles
function handleClickFullMode(buttonProp, emailFeedProp, longBioProp, jsonProp) {

    buttonProp.addEventListener("click", () =>{

        if (!emailFeedProp.classList.contains("fullMode-open")) {
            expandElement(emailFeedProp, jsonProp.long, longBioProp);

            // Sets display to none on all other email feed boxes
            handleInvisible(emailFeedProp)

          } 
        else {
            revertElement(emailFeedProp, jsonProp.short, longBioProp);
            
            // Set all email feeds to visible
            removeInvisible()

          }
    
        setButton(buttonProp)
        
    })
}

// Set Button text
function setButton(buttonProp) {
    //   Change button text
    if (buttonProp.innerHTML === "Read Full") {

        buttonProp.innerHTML = "Go back to list";
        buttonProp.classList.add("fullMode-button")

    } 
    else {

        buttonProp.innerHTML = "Read Full";
        buttonProp.classList.remove("fullMode-button")

    }
}
// Function to expand the element
function expandElement(emailFeedProp, textProp, longBioProp) {
    // fullMode.classList.add("fullMode-open");
    emailFeedProp.classList.add("fullMode-open");
    longBioProp.innerHTML = textProp;
  }
  
// Function to revert the element to its original size
function revertElement(emailFeedProp, textProp, longBioProp) {
// fullMode.classList.remove("fullMode-open");
emailFeedProp.classList.remove("fullMode-open");
longBioProp.innerHTML = textProp;

}
  

function handleInvisible(emailFeedProp) {

    if (emailFeedProp.classList.contains("emailFeed1")) {
        emailFeed2.classList.add("invisible")
        emailFeed3.classList.add("invisible")
        emailFeed4.classList.add("invisible")
    }

    if (emailFeedProp.classList.contains("emailFeed2")) {
        emailFeed1.classList.add("invisible")
        emailFeed3.classList.add("invisible")
        emailFeed4.classList.add("invisible")
    }

    if (emailFeedProp.classList.contains("emailFeed3")) {
        emailFeed1.classList.add("invisible")
        emailFeed2.classList.add("invisible")
        emailFeed4.classList.add("invisible")
    }

    if (emailFeedProp.classList.contains("emailFeed4")) {
        emailFeed1.classList.add("invisible")
        emailFeed2.classList.add("invisible")
        emailFeed3.classList.add("invisible")
    }
}


function removeInvisible() {

    emailFeed1.classList.remove("invisible")
    emailFeed2.classList.remove("invisible")
    emailFeed3.classList.remove("invisible")
    emailFeed4.classList.remove("invisible")
}


// SANDBOX
// const image1 = emailFeed1.firstElementChild
// var src1 = image1.src
// src1 = "../public/monsters/art.jpg"
// image1.src = src1
// console.log(image1)
// console.log(src1)
// const image1 = emailFeed1.firstElementChild
// const title1 = emailFeed1.children[1].firstElementChild
// const shortBio1 = emailFeed1.children[1].lastElementChild

// console.log(title1)
// console.log(shortBio1)
