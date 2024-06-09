document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById('canvas-container');
    const ctx = canvas.getContext('2d');

    // Array of image sources
    const images = [
        '../images/ring.png',
        '../images/displace.png',
        '../images/ring.png',
        '../images/kosova_map1.png'
    ];

    // Variables for animation
    let maggots = [];
    let ring = null;
    let displacement = null;
    const numMaggots = 20;

    // Load images and start animation
    loadImages(images, (loadedImages) => {
        displacement = loadedImages[1];
        ring = loadedImages[2];
        maggots = createMaggots(numMaggots, loadedImages[0]);
        animate();
    });

    // Function to load images
    function loadImages(sources, callback) {
        let count = 0;
        const images = [];
        sources.forEach((source, index) => {
            const img = new Image();
            img.src = source;
            img.onload = () => {
                images[index] = img;
                count++;
                if (count === sources.length) {
                    callback(images);
                }
            };
        });
    }

    // Create maggots
    function createMaggots(num, img) {
        const maggots = [];
        for (let i = 0; i < num; i++) {
            const maggot = {
                img: img,
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                speed: 1,
                direction: Math.random() * Math.PI * 2,
                scale: 1 + Math.random() * 0.3
            };
            maggots.push(maggot);
        }
        return maggots;
    }

    // Animate the maggots
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        maggots.forEach(maggot => {
            maggot.direction += (Math.random() - 0.5) * 0.1;
            maggot.x += Math.sin(maggot.direction) * maggot.speed;
            maggot.y += Math.cos(maggot.direction) * maggot.speed;

            // Wrap around canvas
            if (maggot.x < 0) maggot.x = canvas.width;
            if (maggot.x > canvas.width) maggot.x = 0;
            if (maggot.y < 0) maggot.y = canvas.height;
            if (maggot.y > canvas.height) maggot.y = 0;

            ctx.save();
            ctx.translate(maggot.x, maggot.y);
            ctx.rotate(maggot.direction);
            ctx.scale(maggot.scale, maggot.scale);
            ctx.drawImage(maggot.img, -maggot.img.width / 2, -maggot.img.height / 2);
            ctx.restore();
        });

        // Draw displacement effect
        if (displacement) {
            ctx.drawImage(displacement, mouseX - displacement.width / 2, mouseY - displacement.height / 2);
        }

        // Draw ring effect
        if (ring) {
            ctx.drawImage(ring, mouseX - ring.width / 2, mouseY - ring.height / 2);
        }

        requestAnimationFrame(animate);
    }

    // Mouse move event
    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;
    canvas.addEventListener('mousemove', (event) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = event.clientX - rect.left;
        mouseY = event.clientY - rect.top;
    });
});

