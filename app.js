import { Application, MeshPlane, Assets, Container, Sprite, Text, TextStyle, Graphics } from '/node_modules/pixi.js/dist/pixi.mjs';

(async () => {
    // Create a new application for the first part
    const app1 = new Application();

    // Initialize the first application
    await app1.init({ background: '#FFFF', resizeTo: window });

    // Append the first application canvas to the document body
    document.body.appendChild(app1.view);

    // Load the new texture from the local assets folder
    const texture = await Assets.load('./kosovo_flag.jpg');

    // Create a simple plane and add it to the stage
    const plane = new MeshPlane({ texture, verticesX: 10, verticesY: 10 });

    // Scale the plane to make it smaller
    plane.scale.set(1, 1); // Scale down by 50%

    // Position the plane in the center of the screen
    plane.x = (app1.screen.width - plane.width) / 2;
    plane.y = (app1.screen.height - plane.height) / 2;

    app1.stage.addChild(plane);

    // Get the buffer for vertex positions.
    const { buffer } = plane.geometry.getAttribute('aPosition');

    // Listen for animate update
    let timer = 0;

    app1.ticker.add(() => {
        // Randomize the vertice positions a bit to create movement.
        for (let i = 0; i < buffer.data.length; i++) {
            buffer.data[i] += Math.sin(timer / 10 + i) * 0.5;
        }
        buffer.update();
        timer++;
    });

    // Create a text style
    const style = new TextStyle({
        fontFamily: 'Arial',
        fontSize: 36,
        fill: 'navy',
        fontWeight: 'bold',
        align: 'center'  
    });

    // Create the text
    const text = new Text('Click here to explore Balkans hidden gem', style);

    // Position the text below the plane
    text.x = (app1.screen.width - text.width) / 2;
    text.y = plane.y + plane.height + 20;

    // Make the text interactive and clickable
    text.interactive = true;
    text.buttonMode = true;
    text.on('pointerdown', () => {
        window.location.href = 'index2.html';
    });

    app1.stage.addChild(text);

    // Create a graphics element to serve as a button background
    const buttonBackground = new Graphics();
    buttonBackground.beginFill(0x000000, 0.2);
    buttonBackground.drawRect(text.x - 10, text.y - 10, text.width + 20, text.height + 20);
    buttonBackground.endFill();

    // Add the button background to the stage before the text to ensure it appears behind the text
    app1.stage.addChildAt(buttonBackground, app1.stage.getChildIndex(text));
})();
