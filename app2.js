import { Application, Assets, Graphics, Sprite, RenderTexture, Point, Text, TextStyle } from '/node_modules/pixi.js/dist/pixi.mjs';

(async () =>
{
    // Create a new application
    const app = new Application();

    // Initialize the application
    await app.init({ resizeTo: window });

    // Append the application canvas to the document body
    document.body.appendChild(app.canvas);

    // prepare circle texture, that will be our brush
    const brush = new Graphics().circle(0, 0, 50).fill({ color: 0xffffff });

    // Create a line that will interpolate the drawn points
    const line = new Graphics();

    // Load the textures
    await Assets.load(['./new_pr.jpeg', './old_pr.jpg']);

    const { width, height } = app.screen;
    const stageSize = { width, height };

    const background = Object.assign(Sprite.from('./new_pr.jpeg'), stageSize);
    const imageToReveal = Object.assign(Sprite.from('./old_pr.jpg'), stageSize);
    const renderTexture = RenderTexture.create(stageSize);
    const renderTextureSprite = new Sprite(renderTexture);

    imageToReveal.mask = renderTextureSprite;

    app.stage.addChild(background, imageToReveal, renderTextureSprite);

    app.stage.eventMode = 'static';
    app.stage.hitArea = app.screen;
    app.stage
        .on('pointerdown', pointerDown)
        .on('pointerup', pointerUp)
        .on('pointerupoutside', pointerUp)
        .on('pointermove', pointerMove);

    let dragging = false;
    let lastDrawnPoint = null;

    function pointerMove({ global: { x, y } })
    {
        if (dragging)
        {
            brush.position.set(x, y);
            app.renderer.render({
                container: brush,
                target: renderTexture,
                clear: false,
                skipUpdateTransform: false,
            });
            // Smooth out the drawing a little bit to make it look nicer
            // this connects the previous drawn point to the current one
            // using a line
            if (lastDrawnPoint)
            {
                line.clear().moveTo(lastDrawnPoint.x, lastDrawnPoint.y).lineTo(x, y).stroke({ width: 100, color: 0xffffff });
                app.renderer.render({
                    container: line,
                    target: renderTexture,
                    clear: false,
                    skipUpdateTransform: false,
                });
            }
            lastDrawnPoint = lastDrawnPoint || new Point();
            lastDrawnPoint.set(x, y);
        }
    }

    function pointerDown(event)
    {
        dragging = true;
        pointerMove(event);
    }

    function pointerUp(event)
    {
        dragging = false;
        lastDrawnPoint = null;
    }

    // Create a text style
    const style = new TextStyle({
        fontFamily: 'Arial',
        fontSize: 24,
        fill: 'black',
        fontWeight: 'bold',
        align: 'center'
    });

    // Create the text
    const text = new Text('Scratch this picture to reveal a piece of nostalgia', style);

    // Position the text at the top center of the screen
    text.x = (app.screen.width - text.width) / 2;
    text.y = 20;

    // Add the text to the stage
    app.stage.addChild(text);

})();
