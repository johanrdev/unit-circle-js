const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const center = {
    x: canvas.width / 2,
    y: canvas.height / 2
};
const radius = canvas.width * 0.8;

let coordinates = [
    "\\left(\\frac{1}{2}, \\frac{\\sqrt{3}}{2}\\right)",
    "\\left(\\frac{\\sqrt{2}}{2}, \\frac{\\sqrt{2}}{2}\\right)",
    "\\left(\\frac{\\sqrt{3}}{2}, \\frac{1}{2}\\right)",
    "\\left(0, 1\\right)",

    "\\left(-\\frac{1}{2}, \\frac{\\sqrt{3}}{2}\\right)",
    "\\left(-\\frac{\\sqrt{2}}{2}, \\frac{\\sqrt{2}}{2}\\right)",
    "\\left(-\\frac{\\sqrt{3}}{2}, \\frac{1}{2}\\right)",
    "\\left(-1, 0\\right)",

    "\\left(-\\frac{\\sqrt{3}}{2}, -\\frac{1}{2}\\right)",
    "\\left(-\\frac{\\sqrt{2}}{2}, -\\frac{\\sqrt{2}}{2}\\right)",
    "\\left(-\\frac{1}{2}, -\\frac{\\sqrt{3}}{2}\\right)",
    "\\left(0, -1\\right)",

    "\\left(\\frac{1}{2}, -\\frac{\\sqrt{3}}{2}\\right)",
    "\\left(\\frac{\\sqrt{2}}{2}, -\\frac{\\sqrt{2}}{2}\\right)",
    "\\left(\\frac{\\sqrt{3}}{2}, -\\frac{1}{2}\\right)",
    "\\left(1, 0\\right)",
];

const anglesInRadians = [
    "\\large{\\frac{\\pi}{3}}",
    "\\large{\\frac{\\pi}{4}}",
    "\\large{\\frac{\\pi}{6}}",
    "\\large{\\frac{\\pi}{2}}",

    "\\large{\\frac{2\\pi}{3}}",
    "\\large{\\frac{3\\pi}{4}}",
    "\\large{\\frac{5\\pi}{6}}",
    "\\large{\\pi}",

    "\\large{\\frac{7\\pi}{6}}",
    "\\large{\\frac{5\\pi}{4}}",
    "\\large{\\frac{4\\pi}{3}}",
    "\\large{\\frac{3\\pi}{2}}",

    "\\large{\\frac{5\\pi}{3}}",
    "\\large{\\frac{7\\pi}{4}}",
    "\\large{\\frac{11\\pi}{6}}",
    "\\large{0, 2\\pi}",
];

const anglesInDegrees = [
    "\\large{30^\\circ}",
    "\\large{45^\\circ}",
    "\\large{60^\\circ}",
    "\\large{90^\\circ}",

    "\\large{120^\\circ}",
    "\\large{135^\\circ}",
    "\\large{150^\\circ}",
    "\\large{180^\\circ}",

    "\\large{210^\\circ}",
    "\\large{225^\\circ}",
    "\\large{240^\\circ}",
    "\\large{270^\\circ}",

    "\\large{300^\\circ}",
    "\\large{315^\\circ}",
    "\\large{330^\\circ}",
    "\\large{0^\\circ, 360^\\circ}",
];

const unitCircleAngles = [
    // Quadrant 1
    Math.PI / 6,
    Math.PI / 4,
    Math.PI / 3,
    Math.PI / 2,        // Quadrantal angle (positive vertical axis) 
    // Quadrant 2
    2 * Math.PI / 3,
    3 * Math.PI / 4,
    5 * Math.PI / 6,
    Math.PI,            // Quadrantal angle (negative horizontal axis)
    // Quadrant 3
    7 * Math.PI / 6,
    5 * Math.PI / 4,
    4 * Math.PI / 3,
    3 * Math.PI / 2,    // Quadrantal angle (negative vertical axis)
    // Quadrant 4
    5 * Math.PI / 3,
    7 * Math.PI / 4,
    11 * Math.PI / 6,
    2 * Math.PI         // Quadrantal angle (positive horizontal axis)
];

const drawText = (item, angle, radius) => {
    const ctx2 = canvas.getContext("2d");
    const svg = MathJax.tex2svg(item).firstElementChild;
    const image = document.createElement('img');

    image.onload = (e) => {
        const width = e.target.naturalWidth;
        const height = e.target.naturalHeight;
        const x = center.x + Math.cos(angle * -1) * 1 * radius - (width / 2);
        const y = center.y + Math.sin(angle * -1) * 1 * radius - (height / 2)
        ctx2.fillStyle = '#fff';
        ctx2.fillRect(x - 4, y - 4, width + 8, height + 8);
        ctx2.drawImage(e.target, x, y);
    }

    image.src = 'data:image/svg+xml;base64,' +
        btoa('<?xml version="1.0" encoding="UTF-8" standalone="no" ?>\n' + svg.outerHTML);
}

const drawArc = (x, y, radius, startAngle, endAngle, counterclockwise) => {
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.arc(x, y, radius, startAngle, endAngle, counterclockwise);
    ctx.stroke();
    ctx.closePath();
}

const drawLine = (fromX, fromY, toX, toY) => {
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.stroke();
    ctx.closePath();
}

const drawAngleLine = (angle) => {
    const ctx2 = canvas.getContext("2d");

    ctx2.save();
    ctx2.translate(center.x, center.y);
    ctx2.beginPath();
    ctx2.moveTo(0, 0);
    ctx2.lineTo(
        Math.cos(angle * -1) * canvas.width * 0.33,
        Math.sin(angle * -1) * canvas.width * 0.33
    );
    ctx2.setLineDash([10, 8]);
    ctx2.strokeStyle = '#bbb';
    ctx2.stroke();
    ctx2.closePath();
    ctx2.restore();
}

for (let i = 0; i < unitCircleAngles.length; i++) {
    drawAngleLine(unitCircleAngles[i]);
    drawText(coordinates[i], unitCircleAngles[i], radius * 0.55);
    drawText(anglesInRadians[i], unitCircleAngles[i], radius * 0.42);
    drawText(anglesInDegrees[i], unitCircleAngles[i], radius * 0.3);
}

drawArc(center.x, center.y, radius * 0.42, -Math.PI * 2, true);
drawArc(center.x, center.y, radius * 0.04, -Math.PI * 2, true);
drawLine(0, center.y, canvas.width, center.y);
drawLine(center.x, 0, center.x, canvas.height);