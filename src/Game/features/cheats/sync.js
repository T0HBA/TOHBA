import { config, utils, sync, gameObjects, packetControl } from '../../../index.js';
import { KillZonesFlags } from '../../../Shared/utils.js';

export default class Sync {
    #initialized = false;
    #lastSendState = {
        position: {
            x: 0, y: 0, z: 0
        },
        orientation: {
            x: 0, y: 0, z: 0, w: 0
        }
    };
    #nextTime = 0;
    #config = config.data.syncData;
    skip = false;
    isRandomTPEnabled = false;

    reset = () => {
        this.#initialized = false;
        this.#nextTime = 0;
    }

    compareOrientation = state => {
        return (+state.orientation.x.toFixed(2) === +this.#lastSendState.orientation.x.toFixed(2) && 
            +state.orientation.y.toFixed(2) === +this.#lastSendState.orientation.y.toFixed(2) &&
            +state.orientation.z.toFixed(2) === +this.#lastSendState.orientation.z.toFixed(2) &&
            +state.orientation.w.toFixed(2) === +this.#lastSendState.orientation.w.toFixed(2));
    }

    sendUpdate = (sender, state) => {
        let health = gameObjects.localTank?.['HealthComponent']?.health;

        if (typeof health === 'number' && health !== 0) {
            let result = utils.isNotKillZone(state.position);

            if (result !== KillZonesFlags.None)
                utils.outKillZone(state.position, result);

            if (this.#lastSendState) {
                if (state.position.distance_ry1qwf$(this.#lastSendState.position) < 300 && 
                        this.compareOrientation(state))
                    return;
            }

            this.#lastSendState.position = state.position.clone();
            this.#lastSendState.orientation = state.orientation.clone();

            sender.sendUpdate_0(state, sender.world.physicsTime);
        }
    }

    randomPosition = t => {
        sync.isRandomTPEnabled = true;

        let map = gameObjects.gameMode?.['BattleMapComponent'],
            killZone = utils.getKillZone(map);

        if (killZone) {
            t.position.x = utils.getUniqueRandomArbitrary(this.#lastSendState.position.x, 3000,
                killZone.minX, killZone.maxX);
            t.position.y = utils.getUniqueRandomArbitrary(this.#lastSendState.position.y, 3000, 
                killZone.minY, killZone.maxY);
            t.position.z = !Math.round(Math.random()) ? map.bounds.maxZ + 500 : killZone.maxZ;

            t.orientation.x = 0;
            t.orientation.y = 0;
        }
    }

    process = (sender, chassisServer) => {
        utils.isBindPressed(this.#config.antiStrikerData) && 
            (config.antiStrikerData.state = !this.#config.antiStrikerData.state);

        utils.isBindPressed(this.#config.randomTeleportData) && 
            (this.#config.randomTeleportData.state = !this.#config.randomTeleportData.state);

        utils.isBindPressed(this.#config.antiMineData) && 
            (this.#config.antiMineData.state = !this.#config.antiMineData.state);

        if (sender && config.data.otherData.rapidUpdateData.state && 
            sender.world.physicsTime > this.#nextTime && this.#initialized) 
        {
            this.#nextTime = sender.world.physicsTime + config.data.otherData.rapidUpdateData.delay;
            sender.sendState_0(sender.tankPhysicsComponent_0.getInterpolatedBodyState());
        }

        if (!sender || this.#initialized)
            return;

        this.#initialized = true;

        sender.runAfterPhysicsUpdate = sender.runAfterPhysicsUpdate_mx4ult$;

        sender.runAfterPhysicsUpdate_mx4ult$ = function (t) {
            if (config.data.otherData.rapidUpdateData.state) 
                return;

            return this.runAfterPhysicsUpdate(t);
        }

        chassisServer.serverInterface_0.sendChassisControl_t8q23h$ = function () {}

        sender.__proto__.sendState_0 = function(t) {
            if (sync.skip || (t.position && t.position.x === 0 && t.position.y === 0 && t.position.z === 0))
                return;

            sync.#config.antiMineData.state && (t.position.z += sync.#config.antiMineData.height);

            sync.isRandomTPEnabled = false;

            if (sync.#config.antiStrikerData.state) {
                let tanks = utils.getTanks(sync.#config.antiStrikerData.type === 'Enemy'),
                    state = false;

                if (!utils.isArrayValid(tanks))
                    return;

                for (const tank of tanks) {
                    let shells = tank['StrikerRocketFactory']?.shellCache_0?.itemsInUse?.toArray();

                    if (utils.isArrayValid(shells)) {
                        for (const shell of shells) {
                            shell.components_0.array[1].direction.init_y2kzbl$(0, 0, 0);
                        }

                        state = true;
                    }
                }

                state && sync.randomPosition(t);
            }

            sync.#config.randomTeleportData.state && sync.randomPosition(t);

            sync.sendUpdate(this, t);
        }
    }
}