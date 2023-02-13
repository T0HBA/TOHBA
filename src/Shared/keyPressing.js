// https://github.com/brunoinds/isKeyPressed

class KeyPressing {
    keyPresseds = [];

    constructor() {
        document.addEventListener('keydown', (e) => {
            this.keyPresseds.includes(e.code) === false && this.keyPresseds.push(e.code);
        });

        document.addEventListener('keyup', (e) => {
            if (this.keyPresseds.includes(e.code) === true) {
                let index = this.keyPresseds.indexOf(e.code);
                index > -1 && this.keyPresseds.splice(index, 1);
            }
        });

        unsafeWindow.addEventListener('visibilitychange', () => {
            this.keyPresseds = [];
        });

        unsafeWindow.addEventListener('focus', () => {
            this.keyPresseds = [];
        });
    }

    isKeyPressed = (keyCode) => {
        return this.keyPresseds.includes(keyCode);
    };
}

export const kp = unsafeWindow.kp = new KeyPressing;