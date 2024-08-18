import { convRadiansDegrees, convDegreesRadians, drawArc } from "./utils.js";

const canvas = document.getElementById("animatedCanvas");
const ctx = canvas.getContext("2d");
const canvasBox = canvas.getBoundingClientRect();

const displayValues = {
    degrees: document.querySelector("#degreeValue > span"),
    radians: document.querySelector("#radianValue > span"),
    pDegrees: document.querySelector("#pDegreeValue > span"),
    pRadians: document.querySelector("#pRadianValue > span"),
    revolutions: document.querySelector("#revolutionValue > span"),
    sine: document.querySelector("#sineValue > span"),
    cosine: document.querySelector("#cosineValue > span"),
    tangent: document.querySelector("#tangentValue > span"),
    cosecant: document.querySelector("#cosecantValue > span"),
    secant: document.querySelector("#secantValue > span"),
    cotangent: document.querySelector("#cotangentValue > span")
}

const angleSourceInputOptions = document.querySelectorAll("input[name='angleSourceInput']");
const angleSourceInputBox = document.getElementById("angleSourceInputBox");
const angleSourceNumericInput = document.getElementById("angleSourceNumericInput");
const setAngleButton = document.getElementById("setAngleButton");

const radius = canvas.width * 0.335;
const center = {
    x: (canvasBox.right - canvasBox.left) / 2 + canvasBox.left,
    y: (canvasBox.bottom - canvasBox.top) / 2 + canvasBox.top
}
let angle = 0;
let allowInput = false;

const drawRadius = () => {
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;

    angle = angle >= 360 ? 0 : angle;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineTo(x, y);
    ctx.moveTo(x, y);
    ctx.lineTo(x, 0);
    ctx.strokeStyle = 'black';
    ctx.stroke();
    ctx.closePath();

    drawArc(ctx, x, y, 5, 0, Math.PI * 2, true, 'black', 'white');

    ctx.restore();

    drawArc(ctx, canvas.width / 2, canvas.height / 2, 25, angle, 0, true, 'black');
}

const updateData = () => {
    const degrees = convRadiansDegrees(angle);
    const radians = angle;
    const pDegrees = convRadiansDegrees(getPrincipalAngle(angle));
    const pRadians = getPrincipalAngle(angle);
    const revolutions = getFullRevolutions(angle);
    const sine = Math.sin(angle);
    const cosine = Math.cos(angle);
    const tangent = Math.sin(angle) / Math.cos(angle);
    const cosecant = 1 / Math.sin(angle);
    const secant = 1 / Math.cos(angle);
    const cotangent = Math.cos(angle) / Math.sin(angle);

    displayValues.degrees.innerHTML = degrees.toFixed(2);
    displayValues.radians.innerHTML = radians.toFixed(2);
    displayValues.pDegrees.innerHTML = pDegrees.toFixed(2);
    displayValues.pRadians.innerHTML = pRadians.toFixed(2);
    displayValues.revolutions.innerHTML = revolutions.toFixed(0);
    displayValues.sine.innerHTML = sine.toFixed(2);
    displayValues.cosine.innerHTML = cosine.toFixed(2);

    displayValues.tangent.innerHTML = [90, 270].includes(
        convRadiansDegrees(getPrincipalAngle(angle))) ? 
        'Undefined' : tangent.toFixed(2);

    displayValues.cosecant.innerHTML = [0, 180].includes(
        convRadiansDegrees(getPrincipalAngle(angle))) ? 
        'Undefined' : cosecant.toFixed(2)

    displayValues.secant.innerHTML = [90, 270].includes(
        convRadiansDegrees(getPrincipalAngle(angle))) ? 
        'Undefined' : secant.toFixed(2);
        
    displayValues.cotangent.innerHTML = [0, 180].includes(
        convRadiansDegrees(getPrincipalAngle(angle))) ? 
        'Undefined' : cotangent.toFixed(2);
}

const getPrincipalAngle = (theta) => {
    const revolutions = getFullRevolutions(theta);
    const principalAngle = theta - (revolutions * (Math.PI * 2));
    return principalAngle;
}

const getFullRevolutions = (theta) => {
    return Math.floor(theta / (Math.PI * 2));
}

addEventListener("mousemove", function(e) {
    if (allowInput) return;

    const mouseX = e.pageX - center.x;
    const mouseY = e.pageY - center.y;
    angle = Math.atan2(mouseY, -mouseX) + Math.PI;

    updateData();
    drawRadius();
});

angleSourceInputOptions.forEach(element => {
    element.addEventListener("change", function(e) {
        const item = e.target.value;

        allowInput = parseInt(item) == 1 ? true : false;

        if (allowInput) {
            angle = 0;
            updateData();
            drawRadius(); 
        }

        angleSourceInputBox.style.display = (allowInput ? 'block' : 'none');
    })
});

setAngleButton.addEventListener("click", function(e) {
    const value = parseInt(angleSourceNumericInput.value);
    angle = convDegreesRadians(value);

    updateData();
    drawRadius();
});

updateData();
drawRadius();