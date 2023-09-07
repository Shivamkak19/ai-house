// console.log("log in OPAQUE.js")
var prevOpacity = 0;

window.addEventListener("scroll-manual", ()=> {
    console.log("gate 1 - opaque")

    let block = document.querySelector("#check1");
    // let scrollTop = document.documentElement.scrollTop;

    // Grab CSS values of document element
    const currentColor = getComputedStyle(block).backgroundColor;
    const hex = rgbaToHex(currentColor);
    // const opacity = 1 - window.scrollTop() / 500;

    // const opacity = prevOpacity + 0.05;
    // prevOpacity = opacity;

    const opacity = 0.8

    // console.log(hex)
    const newHex = updateHex(hex, opacity);
    // console.log(newHex);

    // Parse the current color and set the new background color with opacity
    block.style.backgroundColor = newHex;

 });






//  CHAT GPT Code --------------------------------------

//  RGBA to hex - REMOVE ALPHA
function rgbaToHex(rgba) {
    const colors = rgba.match(/^rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)$/);
    const alpha = Math.round(parseFloat(colors[4]) * 255); // Convert alpha to 0-255 range
    return `#${(1 << 24 | parseInt(colors[1]) << 16 | parseInt(colors[2]) << 8 | parseInt(colors[3])).toString(16).slice(1)}`;
}

// Base Hex + var opacity ---> New Hex
function updateHex(hexColor, opacity){

    const rgb = [
        parseInt(hexColor.slice(1, 3), 16),
        parseInt(hexColor.slice(3, 5), 16),
        parseInt(hexColor.slice(5, 7), 16)
    ];

    const alpha = Math.round(opacity * 255);
    const rgba = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${opacity})`;

    const newHex = `#${(1 << 24 | rgb[0] << 16 | rgb[1] << 8 | rgb[2]).toString(16).slice(1)}${alpha.toString(16).padStart(2, '0')}`;

    return newHex;
}

//  CHAT GPT Code --------------------------------------
