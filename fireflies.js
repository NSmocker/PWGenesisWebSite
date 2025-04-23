const canvas = document.getElementById('firefliesCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const fireflies = [];
const fireflyCount = 100;
let mouse = { x: null, y: null };

class Firefly {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 2 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.opacity = Math.random();
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 0, ${this.opacity})`;
        ctx.fill();
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Відбивання від країв екрану
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

        // Взаємодія з мишкою
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 20) {
            const angle = Math.atan2(dy, dx);
            this.speedX = Math.cos(angle) * 2; // Збільшуємо швидкість у напрямку від мишки
            this.speedY = Math.sin(angle) * 2;
        }

        // Анімація прозорості
        this.opacity += Math.random() * 0.02 - 0.01;
        if (this.opacity < 0.3) this.opacity = 0.3;
        if (this.opacity > 1) this.opacity = 1;
    }
}

function init() {
    for (let i = 0; i < fireflyCount; i++) {
        fireflies.push(new Firefly());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fireflies.forEach(firefly => {
        firefly.update();
        firefly.draw();
    });
    requestAnimationFrame(animate);
}

// Відстеження руху мишки
window.addEventListener('mousemove', (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

// Оновлення розмірів canvas при зміні розміру вікна
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

init();
animate();