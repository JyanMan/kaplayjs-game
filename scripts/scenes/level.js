export class Level {
    drawBackground(scaleValue) {
        add([
            sprite("background"),
            scale(scaleValue),
            fixed(),
            z(-1)
        ])
    }

    drawMapLayout(levelLayout, mappings) {
        //console.log(levelLayout);
        const layerSettings = {
            tileWidth: 32,
            tileHeight: 32,
            tiles: mappings
        }
        //console.log(levelLayout);

        const layer = addLevel(levelLayout, layerSettings)
        layer.use(scale(2)); 

        // this.layer = [];
        // for (const layerLayout of levelLayout) {
        //     //console.log(layerLayout);
        //     this.layer.push(addLevel(layerLayout, layerSettings));
        // }

        // for (const layer of this.layer) {
        //     layer.use(scale(4));
        // }
    }
}