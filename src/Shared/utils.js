import { gameObjects, menu } from '../index.js';
import { kp } from './keyPressing.js';

export const KillZonesFlags = {
    None: 0,
    LessX: 1 << 0,
    GreaterX: 1 << 1,
    LessY: 1 << 2,
    GreaterY: 1 << 3,
    LessZ: 1 << 4,
    GreaterZ: 1 << 5
}

const killZoneRange = {
    'space': {
        maxXY: 499,
        maxZ: 3399,
        minZ: 99
    },
    'default': {
        maxXY: 499,
        maxZ: 1999,
        minZ: 99
    },
    'remaster': {
        maxXY: -14200,
        maxZ: 1790,
        minZ: 99
    }
}

const remasterMaps = [
    {
        high_: 376,
        low_: -110954192
    },
    {
        high_: 0,
        low_: 500401401
    }
]

export default class Utils {
    isArrayPressed = (keys) => {
        if (!this.isArrayValid(keys)) 
            return false;

        for (let key of keys) {
            if (!this.getKeyState(key)) 
                return false;
        }

        return true;
    }

    isBindPressed = (object) => {
        if (menu.isOpen)
            return false;
        
        let bind = object.bind;
        if ('pressed' in bind) {
            let result = this.isArrayPressed(bind.keys);
            
            if (bind.pressed === false) {
                if (result === true) {
                    bind.pressed = true;
                    return true;
                }
            } else if (result !== true) {
                bind.pressed = false;
                return false;
            }

            return false;
        }

        return this.isArrayPressed(bind.keys);
    }

    getKeyState = (key) => {
        return kp.isKeyPressed(key) && !this.isChatOpen();
    }

    isChatOpen = () => {
        return gameObjects.gameMode?.['BattleChatComponent']?.isInputActive_0;
    }

    isArrayValid = (array) => {
        return typeof array !== 'undefined' && Array.isArray(array) && array.length > 0;
    }

    getComponentNames = (array) => {
        if (!utils.isArrayValid(array))
            return;

        let obj = {};

        for (const element of array) {
            let name = element.constructor?.$metadata$?.simpleName;
            name && (obj[name] = element);
        }

        obj['originalArray'] = array;

        return obj;
    }

    isRemasterMap = (map) => {
        for (let element of remasterMaps) {
            if (element.low_ === map.mapId.low_ && element.high_ === map.mapId.high_)
                return true;
        }

        return false;
    };

    getKillZone = (map) => {
        if (!map)
            return;

        let value = map.gravity_0 === 300 ? killZoneRange['space'] : 
            this.isRemasterMap(map) === true ? killZoneRange['remaster'] : killZoneRange['default'];
        return {
            maxX: map.bounds.maxX + value.maxXY,
            minX: map.bounds.minX - value.maxXY,
            maxY: map.bounds.maxY + value.maxXY,
            minY: map.bounds.minY - value.maxXY,
            maxZ: map.bounds.maxZ + value.maxZ,
            minZ: map.bounds.minZ - value.minZ,
        };
    }

    isNotKillZone = position => {
        let map = gameObjects.gameMode?.['BattleMapComponent'],
            result = KillZonesFlags.None;

        if (!map) 
            return result;

        let killZone = this.getKillZone(map);

        if (position.x !== 0 && position.x >= killZone.maxX) result |= KillZonesFlags.GreaterX;
        if (position.x !== 0 && position.x <= killZone.minX) result |= KillZonesFlags.LessX;
        if (position.y !== 0 && position.y >= killZone.maxY) result |= KillZonesFlags.GreaterY;
        if (position.y !== 0 && position.y <= killZone.minY) result |= KillZonesFlags.LessY;
        if (position.z !== 0 && position.z >= killZone.maxZ) result |= KillZonesFlags.GreaterZ;
        if (position.z !== 0 && position.z <= killZone.minZ) result |= KillZonesFlags.LessZ;

        return result;
    }

    outKillZone = (position, flags) => {
        let map = gameObjects.gameMode?.['BattleMapComponent'];

        if (!map) return;

        let killZone = this.getKillZone(map);

        if (flags & KillZonesFlags.GreaterX)    position.x = killZone.maxX;
        if (flags & KillZonesFlags.LessX)       position.x = killZone.minX;
        if (flags & KillZonesFlags.GreaterY)    position.y = killZone.maxY;
        if (flags & KillZonesFlags.LessY)       position.y = killZone.minY;
        if (flags & KillZonesFlags.GreaterZ)    position.z = killZone.maxZ;
        if (flags & KillZonesFlags.LessZ)       position.z = killZone.minZ;
    }

    isTankEnemy = tank => {
        if (tank['entity']?.isPossessed)
            return false;

        let possesedTeam = gameObjects.gameMode?.['originalArray']?.[0]?.gameMode_0?.possesedTankTeam?.name;

        if (!possesedTeam || possesedTeam === 'NONE') 
            return true;

        return possesedTeam !== tank?.['TankComponent']?.team?.name;
    }

    getTanks = (isOnlyEnemy = false) => {
        let tanks = gameObjects.gameMode?.['originalArray']?.[0]?.gameMode_0?.tanksOnField?.getTanks()?.array;

        if (!this.isArrayValid(tanks))
            return;

        let result = [];

        for (const tank of tanks) {
            let components = this.getComponentNames(tank.components_0?.array);
            
            if (tank.isPossessed || !components)
                continue;

            components['entity'] = tank;
            
            if (isOnlyEnemy && !this.isTankEnemy(components))
                continue;
            
            result.push(components);
        }

        return result;
    }

    getTankByEntity = entity => {
        if (!entity)
            return;

        let components = this.getComponentNames(entity?.components_0?.array);

        if (!components)
            return;

        components['entity'] = entity;

        return components;
    }

    getTankById = tankId => {
        let tanksOnField = gameObjects.gameMode?.['originalArray']?.[0]?.gameMode_0?.tanksOnField;

        if (!tanksOnField)
            return;

        let entity = tanksOnField.getTank_s8cxhz$(tankId),
            components = this.getComponentNames(entity?.components_0?.array);

        if (!components)
            return;

        components['entity'] = entity;

        return components;
    }

    getTankId = tank => {
        let gameMode = gameObjects.gameMode?.['originalArray']?.[0]?.gameMode_0;

        if (!gameMode)
            return;

        return gameMode.getPlayerId_e1jjdz$_0(tank.entity);
    }

    getUniqueRandomArbitrary = (curr, range, min, max) => {
        let num = this.getRandomArbitrary(min, max);

        if (num <= curr + range && num >= curr - range) {
            return this.getUniqueRandomArbitrary(curr, range, min, max);
        }

        return num;
    }

    getRandomArbitrary = (min, max) => {
        return Math.floor(Math.random() * (max - min) + min);
    }
}