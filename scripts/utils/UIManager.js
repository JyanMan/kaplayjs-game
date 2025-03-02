class UIManager {
    displayMainMenu() {
        add([
            sprite("background"),
            scale(4)
        ])
        const startButton = add([
            text("Click to Start"),
            pos(center()),
            anchor("center"),
            scale(4)
        ])

        onMousePress(("left"), () => {
            console.log("start");
            go("level1");
        })
    }

    displayLevels() {
        
    }
}

export const uiManager = new UIManager;
