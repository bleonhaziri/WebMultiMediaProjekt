import { Application, Graphics, Sprite, RenderTexture } from 'pixi.js';

document.addEventListener('DOMContentLoaded', () => {
    const app = new Application({
        width: window.innerWidth,
        height: window.innerHeight,
        backgroundColor: 0x1099bb,
    });
    document.getElementById('pixi-container').appendChild(app.view);

    const brush = new Graphics();
    brush.beginFill(0xffffff);
    brush.drawCircle(0, 0, 50);
    brush.endFill();

    const background = Sprite.from('images/prishtina.jpeg');
    const hiddenImage = Sprite.from('images/prishtina-hidden.jpg');

    hiddenImage.width = app.screen.width;
    hiddenImage.height = app.screen.height;
    background.width = app.screen.width;
    background.height = app.screen.height;

    const renderTexture = RenderTexture.create({
        width: app.screen.width,
        height: app.screen.height
    });

    const renderTextureSprite = new Sprite(renderTexture);

    hiddenImage.mask = renderTextureSprite;

    app.stage.addChild(background);
    app.stage.addChild(hiddenImage);
    app.stage.addChild(renderTextureSprite);

    app.stage.interactive = true;
    app.stage.on('pointerdown', onPointerDown);
    app.stage.on('pointerup', onPointerUp);
    app.stage.on('pointermove', onPointerMove);

    let dragging = false;

    function onPointerDown(event) {
        dragging = true;
        onPointerMove(event);
    }

    function onPointerUp() {
        dragging = false;
    }

    function onPointerMove(event) {
        if (!dragging) return;
        const { x, y } = event.data.global;
        brush.position.set(x, y);
        app.renderer.render(brush, renderTexture, false, null, false);
    }
});