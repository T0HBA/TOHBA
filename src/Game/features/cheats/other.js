import { utils, config, other, clicker } from '../../../index.js';

export default class Other {
    #mammothTemp = false;
    #config = config.data.otherData;

    speedHack = smoother => {
        if (!smoother) 
            return;

        if (this.#config.speedHack)
            smoother.currentValue = 1e+100;
        else
            smoother.currentValue = smoother.targetValue;
    }

    autoLowHPClicker = health => {
        if (this.#config.autoHealingClicker === false || !health) return;

        if (health.health !== health.maxHealth && health.health !== 0) {
            clicker.temp = true;
        } else if (this.#mammothTemp === false)
            clicker.temp = false;
    }

    autoMammothClicker = tank => {
        if (!this.#config.autoHealingClicker) return;
        
        let mammothUlt = tank['MammothUltimateEffectComponent'],
            preparation = tank['UltimatePreparationEffectComponent'];

        if (!mammothUlt || !preparation) 
            return;

        if (typeof mammothUlt.copy !== 'function') {
            mammothUlt.copy = mammothUlt.stopEffect_0;

            mammothUlt.stopEffect_0 = function (t) {
                clicker.temp = false;
                other.#mammothTemp = false;
                return this.copy(t);
            }
        } else if (preparation.tickEnabled) {
            clicker.temp = true;
            this.#mammothTemp = true;
        }
    }

    freezeTank = tank => {
        let body = tank['TankPhysicsComponent']?.body;

        if (!body)
            return;

        if (this.#config.freezeTanks) {
            body.state.velocity.init_y2kzbl$();
            body.state.angularVelocity.init_y2kzbl$();
            body.movable = false;
        } else if (!body.movable)
            body.movable = true;
    }

    bodyParser = () => {
        let tanks = utils.getTanks();

        if (!utils.isArrayValid(tanks))
            return;

        for (const tank of tanks) {
            this.freezeTank(tank);

            if (utils.isTankEnemy(tank))
                this.autoMammothClicker(tank);
        }
    }

    noCollision = physics => {
        if (!physics)
            return;

        this.#config.noCollision ? physics.setDeadPhantomState_0() : physics.setFullyInteractableState_0();
    }

    process = (physics, health, speed) => {
        this.bodyParser();
        this.noCollision(physics);
        this.autoLowHPClicker(health);
        this.speedHack(speed?.maxSpeedSmoohter_0?.smoother);
    }
}