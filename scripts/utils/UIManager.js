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
                    go: () => go(`level${i}`),
                    value: i
                }
            ])
        }

        const storedCompletedLevels = JSON.parse(sessionStorage.getItem("completedLevels"));
        const completedLevels = new Set([...storedCompletedLevels]);

        onClick(`level`, (obj) => {
            if (!completedLevels.has(obj.value-1)) {
                console.log("complete previous level/s");
                return;
            }
            obj.go();
        })
    }

    displayDefeated() {
        add([
            sprite("background"),
            scale(4)
        ])
        const defeatText = add([
            text('YOU DAMN LOST MAN'),
            scale(3),
            pos(vec2(width()/2, 200)),
            anchor('center'),
        ])
        const retryText = add([
            text('Retry????'),
            scale(2),
            pos(vec2(width()/2, 500)),
            anchor('center'),
            area(),
            'retry-btn'
        ])

        onClick('retry-btn', () => {
            go('menu');
        })
    }
}

export const uiManager = new UIManager;
