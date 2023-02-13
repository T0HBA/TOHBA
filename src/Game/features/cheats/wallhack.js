import { utils, config, striker } from '../../../index.js';

export default class WallHack {
    #config = config.data.wallHackData;

    drawTankGlow = (tank, color = 0) => {
        let collisionGeometry   = tank['DetailedCollisionGeometry'],
            weaponSkin          = collisionGeometry?.weaponSkin_0?.root,
            weaponChildren      = weaponSkin?.children_ich852$_0?.array,
            hull                = collisionGeometry?.weaponSkin_0?.hullSkinComponent_0?.hull,
            hullChildren        = hull?.children_ich852$_0?.array;

        if (!weaponChildren || !hullChildren) return;

        if (color === 0) {
            weaponSkin.outlined     = false;
            hull.outlined           = false;

            for (const element of weaponChildren) {
                element.outlined    = false;
            }

            for (const element of hullChildren) {
                element.outlined    = false;
            }

            return;
        }

        weaponSkin.outlined         = true;
        weaponSkin.outlineBold      = false;
        weaponSkin.outlineColor     = color;

        hull.outlined               = true;
        hull.outlineBold            = false;
        hull.outlineColor           = color;

        for (const element of weaponChildren) {
            element.outlined        = true;
            element.outlineBold     = false;
            element.outlineColor    = color;
        }

        for (const element of hullChildren) {
            element.outlined        = true;
            element.outlineBold     = false;
            element.outlineColor    = color;
        }
    }

    drawTankChams = (tank, color = 0) => {
        let temperatureComponent = tank['TemperatureComponent'];
        
        if (!temperatureComponent || color === 0) return;

        temperatureComponent.currentTransform_0.redMultiplier   = color[0] * (color[3] * 10 + 0.001);
        temperatureComponent.currentTransform_0.greenMultiplier = color[1] * (color[3] * 10 + 0.001);
        temperatureComponent.currentTransform_0.blueMultiplier  = color[2] * (color[3] * 10 + 0.001);

        temperatureComponent.temperature_0                      = 0;
        temperatureComponent.currentTransform_0.redOffset       = 0;
        temperatureComponent.currentTransform_0.greenOffset     = 0;
        temperatureComponent.currentTransform_0.blueOffset      = 0;
    }

    tankChamsHandler = tank => {
        if (!this.#config.tankChamsData.state) return;

        if (utils.getTankId(tank) === striker.rocketTP.target)
            return this.drawTankChams(tank, this.#config.tankChamsData.colorTarget);

        if (utils.isTankEnemy(tank))
            return this.drawTankChams(tank, this.#config.tankChamsData.colorEnemy);

        if (!this.#config.tankChamsData.onlyEnemy)
            this.drawTankChams(tank, this.#config.tankChamsData.colorTeam);
    }

    tankGlowHandler = tank => {
        if (!this.#config.tankGlowData.state)
            return this.drawTankGlow(tank);

        if (utils.getTankId(tank) === striker.rocketTP.target)
            return this.drawTankGlow(tank, this.#config.tankGlowData.colorTarget.dec);

        if (utils.isTankEnemy(tank))
            return this.drawTankGlow(tank, this.#config.tankGlowData.colorEnemy.dec);

        if (!this.#config.tankGlowData.onlyEnemy)
            this.drawTankGlow(tank, this.#config.tankGlowData.colorTeam.dec);
        else
            this.drawTankGlow(tank);
    }

    nameDistance = tank => {
        let title = tank['UserTitleComponent'];

        if (title)
            title.currentAlpha_0 = 1;
    }

    process = () => {
        let tanks = utils.getTanks();

        if (!utils.isArrayValid(tanks))
            return;

        for (const tank of tanks) {
            this.nameDistance(tank);
            this.tankChamsHandler(tank);
            this.tankGlowHandler(tank);
        }
    }
}