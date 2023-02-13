import { config, utils } from '../../../index.js';

export default class Stick {
    #target;
    #distance = 500;
    #index = 0;
    #config = config.data.stickData;

    reset = () => {
        this.#target = undefined;
        this.#distance = 500;
    }

    stick = tank => {
        this.#target = tank;
    }

    keyHandler = () => {
        utils.getKeyState('KeyW') && (this.#distance -= 10);
        utils.getKeyState('KeyS') && (this.#distance += 10);

        if (this.#distance > 3000) this.#distance = 3000;
        if (this.#distance < -3000) this.#distance = -3000;
    }

    nextTarget = () => {
        let tanks = utils.getTanks();

        if (!utils.isArrayValid(tanks))
            return;

        if (this.#index >= tanks.length) 
            this.#index = 0;
        
        this.#target = tanks[this.#index];
        this.#index++;
    }

    process = physics => {
        utils.isBindPressed(this.#config.deactivateData) && (this.#target = undefined);
        utils.isBindPressed(this.#config.nextTargetData) && this.nextTarget();

        if (!this.#target || !physics)
            return;

        let localState = physics.body?.state,
            targetState = this.#target['TankPhysicsComponent']?.body?.state;

        if (!localState || !targetState)
            return;

        let direction = {
            x: 0,
            y: 0,
            z: 0
        };

        let radian = (targetState.orientation.getYAxis_ry1qwf$(direction),
            Math.atan2(direction.y, direction.x));

        localState.position.init_ry1qwf$({
            x: targetState.position.x - this.#distance * Math.sin(-(radian - Math.PI / 2)),
            y: targetState.position.y - this.#distance * Math.cos(-(radian - Math.PI / 2)),
            z: targetState.position.z + this.#distance,
        });

        localState.orientation.init_nq7ezj$(targetState.orientation);
        localState.velocity.init_y2kzbl$();
        localState.angularVelocity.init_y2kzbl$();
        
        this.keyHandler();
    }
}