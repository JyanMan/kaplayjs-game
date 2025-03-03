class UIManager {
    displayMainMenu() {
        add([
            sprite("background"),
            scale(4)
        ])

        onMousePress(("left"), () => {
            go("level1");
        })
        const welcomeText = add([
            text("click Anywhere To Start"),
            pos(center()),
            scale(2),
            anchor("center")
        ])
    }

    displayLevels() {
        
    }
}

export const uiManager = new UIManager;
