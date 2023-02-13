import { config, utils, packetControl, gameObjects } from '../../../index.js';

export default class Clicker {
    #config = config.data.clickerData;
    #supplies;
    #timeout;
    temp = false;

    constructor() {
        setInterval(this.suppliesLowPriority, 300);
        setInterval(this.suppliesHighPriority, 0);
    }

    reset = () => {
        this.temp = false;
        this.#supplies = undefined;
        this.#timeout = undefined;
    }

    getSupplyByName = name => {
        return this.#supplies.get_11rb$(this.#supplies.head_1lr44l$_0?.key.constructor[name]);
    }

    activateSupply = (name, low = false) => {
        if (low) {
            let actions = Array.from(gameObjects.world?.inputManager?.input?.gameActions_0?.map);

            if (!utils.isArrayValid(actions))
                return;

            for (const action of actions) {
                if (action[0].name === name) {
                    action[1].wasPressed = true;
                    action[1].wasReleased = true;
                    return;
                }
            }
        }

        const state = gameObjects.localTank?.['TankPhysicsComponent'].body?.state;

        if (state?.position && state.position.x !== 0 && state.position.y !== 0 && state.position.z !== 0) {
            if (gameObjects.localTank?.['HealthComponent']?.health !== 0 && packetControl.serverState) {
                this.getSupplyByName(name)?.onUserActivatedSupply();
            }
        }
    }

    suppliesHighPriority = () => {
        if (!this.#supplies)
            return;

        if (this.#config.autoMiningData.state)
            this.activateSupply('MINE');

        if (!this.#config.autoHealingData.state && this.temp === false) return;

        if (!this.#timeout) {
            this.#timeout = setTimeout(() => {
                this.activateSupply('FIRST_AID');
                this.activateSupply('MINE');
                this.#timeout = undefined;
            }, this.#config.autoHealingData.delay);
        }
    };

    suppliesLowPriority = () => {
        if (!this.#supplies)
            return;

        if (this.#config.autoArmorData.state)
            this.activateSupply('USE_DOUBLE_ARMOR', true);

        if (this.#config.autoDamageData.state)
            this.activateSupply('USE_DOUBLE_DAMAGE', true);

        if (this.#config.autoNitroData.state)
            this.activateSupply('USE_NITRO', true);
    };

    process = supplies => {
        utils.isBindPressed(this.#config.autoHealingData) && 
            (this.#config.autoHealingData.state = !this.#config.autoHealingData.state);

        utils.isBindPressed(this.#config.autoArmorData) && 
            (this.#config.autoArmorData.state = !this.#config.autoArmorData.state);

        utils.isBindPressed(this.#config.autoDamageData) && 
            (this.#config.autoDamageData.state = !this.#config.autoDamageData.state);

        utils.isBindPressed(this.#config.autoNitroData) && 
            (this.#config.autoNitroData.state = !this.#config.autoNitroData.state);

        utils.isBindPressed(this.#config.autoMiningData) && 
            (this.#config.autoMiningData.state = !this.#config.autoMiningData.state);

        supplies && (this.#supplies = supplies);
    }
}