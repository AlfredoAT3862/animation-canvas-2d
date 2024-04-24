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
        if (this.posX + this.radius > window_width || this.posX - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.posY - this.radius < 0 || this.posY + this.radius > window_height) {
            this.dy = -this.dy;
        }

        this.posX += this.dx;
        this.posY += this.dy;
    }
}

let circles = [
    new Circle(100, 100, 100, 'green', 'TEC', 4),
    new Circle(window_width - 100, 100, 100, 'red', 'TEC', 4),
    new Circle(100, window_height - 100, 100, 'blue', 'TEC', 4),
    new Circle(window_width - 100, window_height - 100, 100, 'orange', 'TEC', 4),
    new Circle(window_width / 2, window_height / 2, 100, 'purple', 'TEC', 4)
];

let updateCircles = function() {
    ctx.clearRect(0, 0, window_width, window_height);
    for (let circle of circles) {
        circle.update(ctx, window_width, window_height);
        circle.draw(ctx);
    }
    requestAnimationFrame(updateCircles);
};

updateCircles();
