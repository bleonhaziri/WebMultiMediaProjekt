document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const city = urlParams.get('city');

    document.getElementById('city-name').textContent = city;

    // Example information, you can replace this with actual data
    const cityInfo = {
        'Prishtina': 'Prishtina is the capital and largest city of Kosovo.',
        'Mitrovica': 'Mitrovica is known for its diverse cultural heritage.',
        'Peja': 'Peja is famous for its stunning Rugova Canyon.',
        'Prizreni': 'Prizreni is known for its well-preserved Ottoman architecture.',
        'Ferizaj': 'Ferizaj is a bustling city with a rich history.',
        'Gjilani': 'Gjilani is known for its cultural events and festivals.',
        'Gjakova': 'Gjakova is famous for its old bazaar and historical sites.'
    };

    document.getElementById('city-info').textContent = cityInfo[city];

    // PIXI.js code for image effect
    const app = new PIXI.Application({
        width: 800,
        height: 600,
        backgroundColor: 0x1099bb
    });
    document.getElementById('city-image-container').appendChild(app.view);

    const imagePath = `images/${city.toLowerCase()}.jpeg`;
    PIXI.Loader.shared.add(imagePath).load(() => {
        const cityImage = new PIXI.Sprite(PIXI.Loader.shared.resources[imagePath].texture);
        cityImage.x = app.renderer.width / 2;
        cityImage.y = app.renderer.height / 2;
        cityImage.anchor.set(0.5);
        app.stage.addChild(cityImage);
    });
});