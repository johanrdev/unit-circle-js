const convRadiansDegrees = (radians) => radians * (180 / Math.PI);
const convDegreesRadians = (degrees) => degrees * (Math.PI / 180);

const drawArc = (ctx, x, y, radius, startAngle, endAngle, counterclockwise, strokeColor = null, fillColor = null) => {
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.arc(x, y, radius, startAngle, endAngle, counterclockwise);
    
    if (fillColor) {
        ctx.fillStyle = fillColor;
        ctx.fill();
    }

    if (strokeColor) {
        ctx.strokeColor = strokeColor;
        ctx.stroke();
    }
    
    ctx.closePath();
}

export {
    convRadiansDegrees,
    convDegreesRadians,
    drawArc
}