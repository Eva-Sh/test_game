const   LEFT = 37,
        RIGHT = 39,
        SPACE = 32;

export default class Actions {
    constructor() {
        this.currentKeys = new Map;

        window.addEventListener('keyup', this.onKeyUp.bind(this));
        window.addEventListener('keydown', this.onKeyDown.bind(this));
    }

    onKeyUp(e) {
        this.currentKeys.set(e.keyCode, false);
    }

    onKeyDown(e) {
        this.currentKeys.set(e.keyCode, true);
    }

    isLeftPressed() {
        return this.currentKeys.get(LEFT);
    }

    isRightPressed() {
        return this.currentKeys.get(RIGHT);
    }
}
