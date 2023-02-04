export default function(element){ // DOM Element passed in
    element.style.overflow = "hidden";

    //Takes the element passed in and splits into spans by the chars
    element.innerHTML = element.innerText
    .split("")
    .map((char) =>{
        //Adds a space if the char is a space
        if(char === " "){
            return `<span> ${char}</span>`; 
            //Adds a space, even while applying display: flex to the original div
            //Googled to find the specific command "&nbsp"
        }

        return `<span class= "animated">${char}</span>`
    })
    .join("");

    //${char} enters a string literal
    //.join("") joins the new spans without any spaces

    return element;
}