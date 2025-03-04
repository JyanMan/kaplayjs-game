export class Level {
    constructor(level) {
        this.level = level;
    }
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

    onCheckLevelFinished(player) {
        player.gameObj.onCollide((obj) => {
            if (isLevelFinished(obj)) {
                levelFinished(this.level);
            }
        })
    }
}

function isLevelFinished(obj) {
    return (
        obj.tags.includes('end-crystal') &&
        get("enemy").length <= 0
    )
}

function levelFinished(level) {
    const storedCompletedLevels = JSON.parse(sessionStorage.getItem("completedLevels"));
    const completedLevels = new Set([...storedCompletedLevels]);
    completedLevels.add(level);
    //console.log(completedLevels);

    sessionStorage.setItem("completedLevels", JSON.stringify([...completedLevels]));
    go("menu");
}