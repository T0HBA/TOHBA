import { config, airBreak, utils, cameraHack } from '../../../index.js';

export default class Camera {
    #distance = 1500;
    #index = 0;
    #initialized = false;
    #spectateBody;
    #mousemoveEvent = false;
    #camera;
    #config = config.data.cameraData;

    reset = () => {
        this.#initialized = false;
        this.#spectateBody = undefined;
        this.#camera = undefined;
    }

    spectate = targetId => {
        this.#spectateBody = targetId;
    }

    deactivate = () => {
        this.#spectateBody = undefined;
    }

    distance = () => {
        if (!this.#config.state)
            return;

        this.#distance += 1000, this.#distance > 2500 && (this.#distance = 500);
    }

    nextTarget = () => {
        let tanks = utils.getTanks();

        if (!utils.isArrayValid(tanks))
            return;

        if (this.#index >= tanks.length) 
            this.#index = 0;
        
        this.#spectateBody = tanks[this.#index];
        this.#index++;
    }

    process = (camera, controller) => {
        let spectateConfig = config.data.spectateData;

        utils.isBindPressed(this.#config) && this.distance();
        utils.isBindPressed(spectateConfig.deactivateData) && this.deactivate();
        utils.isBindPressed(spectateConfig.nextTargetData) && this.nextTarget();

        if (this.#initialized || !camera || !controller)
            return;

        this.#camera = camera;

        camera.polarDistance_0.copy   = camera.polarDistance_0.update_dleff0$;
        camera.pitch_0.copy           = camera.pitch_0.update_dleff0$;
        camera.elevation_0.copy       = camera.elevation_0.update_dleff0$;
        camera.pivot_0.copy           = camera.pivot_0.update_sl07mc$;

        camera.polarDistance_0.update_dleff0$ = function (t, e) {
            if (cameraHack.#config.state === false) 
                return this.copy(t, e);

            this.value += (cameraHack.#distance - this.value) / 20;
        };

        camera.pitch_0.update_dleff0$ = function (t, e) {
            if (cameraHack.#config.state === false) 
                return this.copy(t, e);

            this.value = camera.absoluteIdealPitch_0;
        };

        camera.elevation_0.update_dleff0$ = function (t, e) {
            if (cameraHack.#config.state === false) 
                return this.copy(t, e);
            
            this.value = e;
        };

        camera.pivot_0.update_sl07mc$ = function (t, e) {
            let body = cameraHack.#spectateBody?.['TankPhysicsComponent']?.body;
            
            this.copy(t, body ? body.state.position : e);
        };

        controller.cameraDown_0 = function (t) {
            if ((airBreak.state && utils.getKeyState('KeyE')) || cameraHack.#config.state)
                return this.down_0 = false;

            this.down_0 = t.isPressed;
        };

        controller.cameraUp_0 = function (t) {
            if ((airBreak.state && utils.getKeyState('KeyQ')) || cameraHack.#config.state)
                return this.up_0 = false;

            this.up_0 = t.isPressed;
        };

        if (this.#mousemoveEvent !== true) {
            document.addEventListener('mousemove', e => {
                if (this.#config.state === false || !this.#camera || !document.pointerLockElement)
                    return;
                
                this.#camera.pathPosition += 1 * (5e-5 + (0.001 - 5e-5) * 50 / 100) * e.movementY;
            }, false);

            this.#mousemoveEvent = true;
        }

        this.#initialized = true;
    }
}