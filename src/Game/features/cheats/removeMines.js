import { config, utils } from '../../../index.js';

export default class RemoveMines {
    #mines;
    #config = config.data.removeMinesData;

    constructor() {
        setInterval(this.removeMines, 0);
    }

    reset = () => {
        this.#mines = undefined;
    }

    removeMines = () => {
        if (!this.#config.state || !this.#mines || typeof this.#mines?.minesByUser_0?.keys === 'undefined') 
            return;

        for (let n = this.#mines.minesByUser_0.keys.iterator(); n.hasNext();) {
            let o = n.next();

            if (this.#config.type === 'TEAM' && utils.isTankEnemy(utils.getTankById(o)))
                continue;

            this.#mines.removeAllMines_0(o);
        }
    }

    process = (mines) => mines && (this.#mines = mines);
}