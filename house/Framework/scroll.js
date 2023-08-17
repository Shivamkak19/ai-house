console.log("gate 2342340")
window.addEventListener("scroll", function () {
    console.log(
        "gate 1"
    )
    let header = document.getElementById("checker");
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    header.style.opacity = 1 - scrollTop / 500;
 });