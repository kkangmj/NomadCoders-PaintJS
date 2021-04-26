const canvas = document.getElementById("jsCanvas");
const colors = document.getElementById("jsColors");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");

const INITIAL_COLOR = "#a52a2a";

const ctx = canvas.getContext("2d");

ctx.fillStyle = "white";
ctx.fillRect(0, 0, 700, 800);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function startPainting(){
    painting = true;
}

function stopPainting(){
    painting = false;
}

function onMouseMove(event){
    const offsetX = event.offsetX;
    const offsetY = event.offsetY;

    if (painting){
        ctx.lineTo(offsetX, offsetY);
        ctx.stroke();
    } else{
        ctx.beginPath();
        ctx.moveTo(offsetX, offsetY);
        ctx.closePath();
    }
}

function changeColor(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function changeRange(){
    ctx.lineWidth = range.value;
}

function changeMode(){
    if (!filling){
        ctx.fillRect(0, 0, 700, 800);
        mode.innerHTML = "Paint";
        filling = true;
    } else{
        mode.innerHTML = "Fill";
        filling = false;
    }
}

function changeFillColor(){
    if (filling){
        ctx.fillRect(0, 0, 700, 800);
    }
}

function handleCM(event){
    event.preventDefault();
}

function saveClick(){
    const image = canvas.toDataURL("image/jpeg");
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS.png";
    link.click();
}

if (canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", changeFillColor);
    canvas.addEventListener("contextmenu", handleCM);
}

if (colors){
    colors.addEventListener("click", changeColor);
}

if (range){
    range.addEventListener("input", changeRange);
}

if (mode){
    mode.addEventListener("click", changeMode);
}

if (save){
    save.addEventListener("click", saveClick);
}