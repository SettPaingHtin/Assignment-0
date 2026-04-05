// Global variables for canvas and context
var canvas;
var ctx;

function main() {
    canvas = document.getElementById('example');
    if (!canvas) {
        console.log('Failed to retrieve the <canvas> element');
        return;
    }

    ctx = canvas.getContext('2d');
    
    // Clear canvas to black
    clearCanvas();
}

// Clears the canvas with a black rectangle
function clearCanvas() {
    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; // Black background
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Draws a vector from the center of the canvas
function drawVector(v, color) {
    var centerX = canvas.width / 2;
    var centerY = canvas.height / 2;

    // Scale by 20
    var scaledX = v.elements[0] * 20;
    var scaledY = v.elements[1] * 20;

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    // Canvas Y-axis is inverted (down is positive), so we subtract the scaled Y
    ctx.lineTo(centerX + scaledX, centerY - scaledY);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();
}

// Reads inputs and draws v1 and v2
function handleDrawEvent() {
    clearCanvas();

    var x1 = parseFloat(document.getElementById('v1_x').value);
    var y1 = parseFloat(document.getElementById('v1_y').value);
    var v1 = new Vector3([x1, y1, 0]);
    drawVector(v1, "red");

    var x2 = parseFloat(document.getElementById('v2_x').value);
    var y2 = parseFloat(document.getElementById('v2_y').value);
    var v2 = new Vector3([x2, y2, 0]);
    drawVector(v2, "blue");
}

// Handles the logic for vector operations
function handleDrawOperationEvent() {
    clearCanvas();

    // Read v1 and v2
    var x1 = parseFloat(document.getElementById('v1_x').value);
    var y1 = parseFloat(document.getElementById('v1_y').value);
    var v1 = new Vector3([x1, y1, 0]);

    var x2 = parseFloat(document.getElementById('v2_x').value);
    var y2 = parseFloat(document.getElementById('v2_y').value);
    var v2 = new Vector3([x2, y2, 0]);

    // Draw originals
    drawVector(v1, "red");
    drawVector(v2, "blue");

    var operation = document.getElementById('operation').value;
    var scalar = parseFloat(document.getElementById('scalar').value);

    // v3 and v4 to store copies/results so we don't modify originals mid-draw
    var v3 = new Vector3(v1.elements); 
    var v4 = new Vector3(v2.elements);

    if (operation === "add") {
        v3.add(v2);
        drawVector(v3, "green");
    } else if (operation === "sub") {
        v3.sub(v2);
        drawVector(v3, "green");
    } else if (operation === "mul") {
        v3.mul(scalar);
        v4.mul(scalar);
        drawVector(v3, "green");
        drawVector(v4, "green");
    } else if (operation === "div") {
        v3.div(scalar);
        v4.div(scalar);
        drawVector(v3, "green");
        drawVector(v4, "green");
    } else if (operation === "magnitude") {
        console.log("Magnitude v1:", v1.magnitude());
        console.log("Magnitude v2:", v2.magnitude());
    } else if (operation === "normalize") {
        v3.normalize();
        v4.normalize();
        drawVector(v3, "green");
        drawVector(v4, "green");
    } else if (operation === "angleBetween") {
        angleBetween(v1, v2);
    } else if (operation === "area") {
        areaTriangle(v1, v2);
    }
}

// Computes and prints the angle between two vectors
function angleBetween(v1, v2) {
    var d = Vector3.dot(v1, v2);
    var m1 = v1.magnitude();
    var m2 = v2.magnitude();
    
    // Protect against division by zero
    if (m1 === 0 || m2 === 0) {
        console.log("Cannot calculate angle with a zero vector.");
        return;
    }

    var cosAlpha = d / (m1 * m2);
    // Clamp the value between -1 and 1 to avoid floating point issues with Math.acos
    cosAlpha = Math.max(-1, Math.min(1, cosAlpha));
    
    var alphaRadians = Math.acos(cosAlpha);
    var alphaDegrees = alphaRadians * (180 / Math.PI);
    
    console.log("Angle:", alphaDegrees);
}

// Computes and prints the area of the triangle formed by v1 and v2
function areaTriangle(v1, v2) {
    var crossProd = Vector3.cross(v1, v2);
    var area = crossProd.magnitude() / 2;
    console.log("Area of the triangle:", area);
}