class UIManager {
    displayMainMenu() {
        add([
            sprite("background"),
            scale(4)
        ])

        const welcomeText = add([
            text("click Anywhere To Start"),
            pos(center()),
            scale(2),
            anchor("center")
        ])
        welcomeText.onMousePress(("left"), () => {
            go("levelsMenu");
        })
    }

    displayLevels(numOfLevels) {
        add([
            sprite("background"),
            scale(4)
        ])

        for (let i = 1; i <= numOfLevels; i++) {
            const level = add([
                text(`level ${i}`),
                scale(1),
                anchor("center"),
                pos(vec2(200*i, height()/2)),
                area(),
                `level`,
                {
                    go: () => go(`level${i}`)
                }
            ])
        }

        onClick(`level`, (obj) => {
            obj.go();
        })
    }
}

export const uiManager = new UIManager;
