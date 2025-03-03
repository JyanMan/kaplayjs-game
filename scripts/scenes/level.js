export class Level {
    drawBackground(scaleValue) {
        add([
            sprite("background"),
            scale(scaleValue),
            fixed(),
            layer("background")
        ])
    }

    drawMapLayout(levelLayout, mappings) {
        //console.log(levelLayout);
        const layerSettings = {
            tileWidth: 24,
            tileHeight: 24,
            tiles: mappings,
        }
        //console.log(levelLayout);

        const layer = addLevel(levelLayout, layerSettings)
        layer.use(scale(4));
    }
}