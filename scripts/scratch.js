import { Application, Assets, Graphics, Sprite, RenderTexture, Point } from 'pixi.js';

(async () => {
    // Create a new application
    const app = new Application({ resizeTo: window });

    // Append the application canvas to the document body
    document.getElementById('pixi-container').appendChild(app.view);

    // prepare circle texture, that will be our brush
    const brush = new Graphics();
    brush.beginFill(0xffffff);
    brush.drawCircle(0, 0, 50);
    brush.endFill();

    // Create a line that will interpolate the drawn points
    const line = new Graphics();

    // Load the textures
    await Assets.load(['images/Gjilani.jpg', 'url_to_new_city_image.jpg']);

    const { width, height } = app.screen;
    const stageSize = { width, height };

    const background = Object.assign(Sprite.from('url_to_old_city_image.jpg'), stageSize);
    const imageToReveal = Object.assign(Sprite.from('url_to_new_city_image.jpg'), stageSize);
    const renderTexture = RenderTexture.create(stageSize);
    const renderTextureSprite = new Sprite(renderTexture);

    imageToReveal.mask = renderTextureSprite;

    app.stage.addChild(background, imageToReveal, renderTextureSprite);

    app.stage.interactive = true;
    app.stage.hitArea = app.screen;
    app.stage
        .on('pointerdown', pointerDown)
        .on('pointerup', pointerUp)
        .on('pointerupoutside', pointerUp)
        .on('pointermove', pointerMove);

    let dragging = false;
    let lastDrawnPoint = null;

    function pointerMove(event) {
        if (dragging) {
            const { x, y } = event.data.global;
            brush.position.set(x, y);
            app.renderer.render(brush, renderTexture, false);

            if (lastDrawnPoint) {
                line.clear();
                line.lineStyle(100, 0xffffff);
                line.moveTo(lastDrawnPoint.x, lastDrawnPoint.y);
                line.lineTo(x, y);
                app.renderer.render(line, renderTexture, false);
            }
            lastDrawnPoint = new Point(x, y);
        }
    }

    function pointerDown(event) {
        dragging = true;
        pointerMove(event);
    }

    function pointerUp(event) {
        dragging = false;
        lastDrawnPoint = null;
    }
})();