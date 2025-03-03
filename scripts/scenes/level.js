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
        this.layers = []
        for (const layerLayout of levelLayout) {
            this.layers.push(addLevel(layerLayout, layerSettings))
        }
        for (const layer of this.layers) {
            layer.use(scale(4));
        }
    }
}