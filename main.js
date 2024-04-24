const canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

const window_height = window.innerHeight;
const window_width = window.innerWidth;

canvas.height = window_height;
canvas.width = window_width;

canvas.style.background = '#ffff00';

class Circle {
    constructor(x, y, radius, color, text, velocidad) {
        this.posX = x;
        this.posY = y;
        this.radius = radius;
        this.color = color;
        this.text = text;
        this.velocidad = velocidad;
        this.dx = 1 * this.velocidad;
        this.dy = 1 * this.velocidad;
    }

    draw(context) {
        context.beginPath();
        context.strokeStyle = this.color;
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.font = '18px Arial';
        context.fillText(this.text, this.posX, this.posY);
        context.lineWidth = 5;
        context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
        context.stroke();
        context.closePath();
    }

    update(context, window_width, window_height) {
        // Actualizamos la posición sumando la velocidad actual
        this.posX += this.dx;
        this.posY += this.dy;

        // Comprobamos si el círculo ha chocado con los bordes y ajustamos su posición y dirección
        if (this.posX + this.radius >= window_width || this.posX - this.radius <= 0) {
            this.dx = -this.dx; // Invertimos la dirección horizontal para hacer que rebote
            // Ajustamos la posición para que el círculo no sobrepase los bordes
            this.posX = Math.min(window_width - this.radius, Math.max(this.radius, this.posX));
        }
        if (this.posY + this.radius >= window_height || this.posY - this.radius <= 0) {
            this.dy = -this.dy; // Invertimos la dirección vertical para hacer que rebote
            // Ajustamos la posición para que el círculo no sobrepase los bordes
            this.posY = Math.min(window_height - this.radius, Math.max(this.radius, this.posY));
        }
    }
}

let circles = [];

function generateRandomCircles(numCircles) {
    for (let i = 0; i < numCircles; i++) {
        let x = Math.random() * window_width;
        let y = Math.random() * window_height;
        let radius = Math.random() * 100 + 50; // Radio entre 50 y 150
        let color = '#' + Math.floor(Math.random()*16777215).toString(16); // Color aleatorio
        let text = 'TEC'; // Texto constante
        let velocidad = 4; // Velocidad constante
        circles.push(new Circle(x, y, radius, color, text, velocidad));
    }
}

generateRandomCircles(10); // Genera 10 círculos aleatorios

let updateCircles = function() {
    ctx.clearRect(0, 0, window_width, window_height);
    for (let circle of circles) {
        circle.update(ctx, window_width, window_height);
        circle.draw(ctx);
    }
    requestAnimationFrame(updateCircles);
};

updateCircles();
