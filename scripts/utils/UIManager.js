class UIManager {
    displayMainMenu() {
        add([
            sprite("background"),
            scale(4)
        ])

        onMousePress(("left"), () => {
            go("level1");
        })
    }

    displayLevels() {
        
    }
}

export const uiManager = new UIManager;
