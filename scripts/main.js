window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    preloader.style.display = 'none';
});

let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    slides.forEach((slide, index) => {
        slide.style.transform = `translateX(-${currentSlide * 100}%)`;
    });
}, 3000);

function redirectToCity(city) {
    window.location.href = `city.html?city=${city}`;
}
