import { config, striker, utils, sync } from '../../../index.js';

export default class Striker {
    #initialized = false;
    aimBotTarget = undefined;
    #config = config.data.weaponData.strikerData;

    rocketTP = {
        target: undefined,
        state: false,
        timeout: undefined,
        teleportToTarget: false,
        index: 0
    }

    reset = () => {
        this.#initialized = false;
        this.aimBotTarget = undefined;
        this.rocketTP = {
            target: undefined,
            state: false,
            timeout: undefined,
            teleportToTarget: false,
            index: 0
        }
    }

    shellsTeleport = (strikerComponent, strikerShells) => {
        const shellsConfig = this.#config.shellsTeleportData,
            shells = strikerShells.shellCache_0?.itemsInUse?.toArray();

        if (!utils.isArrayValid(shells))
            return;

        for (const shell of shells) {
            if (shellsConfig.state)
                shell.components_0.array[1].direction.init_y2kzbl$(0, 0, 0);

            shell.components_0.array[11].staticHit_0 = function () {};    
            shell.components_0.array[11].selfDestruct_0 = function () {};
        }

        if (!shellsConfig.state || !this.rocketTP.target)
            return;

        const target = utils.getTankById(this.rocketTP.target),
            targetState = target?.['TankPhysicsComponent']?.body?.state;

        if (!targetState)
            return;

        if (this.rocketTP.state !== true && shells.length === strikerComponent.salvoRocketsCount && 
                !this.rocketTP.timeout) {
            const lastShell = shells.at(-1).components_0.array,
                distance = lastShell[3].barrelOrigin.distance_ry1qwf$(targetState.position);

            if (this.rocketTP.teleportToTarget) {
                console.log('timeout');
                this.rocketTP.timeout = setTimeout(() => {
                    this.rocketTP.state = true;
                    this.rocketTP.timeout = undefined;
                }, 2000);
            } else if (lastShell[1].distance_0 >= distance) {
                console.log('distance');
                this.rocketTP.state = true;
            }
        }

        if (utils.isBindPressed(shellsConfig))
            this.rocketTP.state = true;
            
        if (!this.rocketTP.state)
            return;

        if (this.rocketTP.timeout) {
            clearTimeout(this.rocketTP.timeout);
            this.rocketTP.timeout = undefined;
        }

        this.rocketTP.state = false;

        for (const shell of shells) {
            const server = shell.components_0.array[11];
            
            server.shellStates_0.lastKnownState_0.position.init_ry1qwf$(targetState.position);
            server.serverInterface_0.tryToHit_nn87qu$(server.world.physicsTime, server.raycastShell_0.shellId, 
                server.shellStates_0);
        }

        for (let i = 0; i < strikerComponent.salvoRocketsCount; i++) {
            strikerComponent.explodeRockets();
        }
    }

    aimBot = (physics, weaponTrigger, turret) => {
        const aimBotConfig = this.#config.aimBotData;
        
        if (!aimBotConfig.state || !weaponTrigger.pulled_0 || utils.isBindPressed(aimBotConfig))
            return;

        const target = utils.getTankById(this.aimBotTarget),
            targetState = target?.['TankPhysicsComponent']?.body?.state;

        if (!targetState)
            return;

        const p1 = physics.body.state.position,
            p2 = targetState.position;

        turret.direction = turret.getLocalDirectionFromWorldDirection_0(
            Math.atan2(p2.y - p1.y, p2.x - p1.x) - Math.PI / 2
        );
    }

    nextTarget = () => {
        const tanks = utils.getTanks();

        if (!utils.isArrayValid(tanks))
            return;

        if (this.rocketTP.index >= tanks.length) 
            this.rocketTP.index = 0;
        
        this.rocketTP.target = utils.getTankId(tanks[this.rocketTP.index]);
        this.rocketTP.index++;
    }

    process = (strikerComponent, strikerServer, turret, turretServer,
                strikerShells, weaponTrigger, strikerLocking, sender) => 
    {
        if (!strikerComponent   || 
            !strikerServer      || 
            !turret             || 
            !turretServer       || 
            !strikerShells      || 
            !weaponTrigger      ||
            !strikerLocking     ||
            !sender)            return;

        this.shellsTeleport(strikerComponent, strikerShells);
        this.aimBot(sender.tankPhysicsComponent_0, weaponTrigger, turret);

        const strikerConfig = config.data.weaponData.strikerData;

        utils.isBindPressed(strikerConfig.nextTargetData) && this.nextTarget();

        utils.isBindPressed(strikerConfig.getTargetForAimWithScope) && 
            (strikerConfig.getTargetForAimWithScope.state = !strikerConfig.getTargetForAimWithScope.state);

        utils.isBindPressed(strikerConfig.getTargetForTPWithScope) && 
            (strikerConfig.getTargetForTPWithScope.state = !strikerConfig.getTargetForTPWithScope.state);

        if (this.#initialized)
            return;

        const targetingSystem = strikerComponent.targetingSystem_0?.targetingSystem_vutpoz$_0,
            sectorsCalculator = targetingSystem?.directionCalculator_0?.targetingSectorsCalculator_0;

        if (!sectorsCalculator)
            return;

        sectorsCalculator.maxElevationAngle_0 = Infinity;
        sectorsCalculator.minElevationAngle_0 = -Infinity;

        strikerLocking.sendState = strikerLocking.tick_i15cpw$;

        strikerLocking.tick_i15cpw$ = function (t, e, n, o) {
            turretServer.sendUpdate_0(true);

            if (sync.isRandomTPEnabled) {
                sync.skip = true;
                sync.sendUpdate(sender, sender.tankPhysicsComponent_0.getInterpolatedBodyState());
            }

            this.sendState(t, e, n, o);
            sync.skip = false;
            
            if (sync.isRandomTPEnabled && !config.data.otherData.rapidUpdateData.state) {
                sender.sendState_0(sender.tankPhysicsComponent_0.getInterpolatedBodyState());
            }
        }

        turretServer.sendUpdate_0 = function (t) {
            if (t !== true)
                return;

            this.saveTurretState_0();

            if (this.lastDirection && +this.lastDirection.toFixed(2) === +this.lastSentState_0.direction.toFixed(2))
                return;

            this.lastSentState_0.rotationSpeedNumber = 0;
            this.lastDirection = this.lastSentState_0.direction;
            this.serverInterface_0.update_79f0ox$(this.world.physicsTime, this.tankComponent_0.incarnationId,
                this.lastSentState_0);
        }

        strikerComponent.__proto__.lockTarget_gcez93$ = function (t, e) {
            if (striker.#config.getTargetForAimWithScope.state && e) striker.aimBotTarget      = e;
            if (striker.#config.getTargetForTPWithScope.state  && e) striker.rocketTP.target    = e;

            let result = this.lockTarget_gcez93$$default(t, e);

            striker.#config.aimBotData.state && striker.aimBotTarget && 
                utils.isBindPressed(striker.#config.aimBotData) !== true && 
                (t.targetId = striker.aimBotTarget);
            
            return result || false;
        }

        strikerServer.__proto__.createShell_0 = function (t) {
            if (striker.#config.shellsTeleportData.state)
                t.direction.init_y2kzbl$(0, 0, 0);

            turretServer.sendUpdate_0(true);

            if (sync.isRandomTPEnabled && !striker.rocketTP.teleportToTarget) {
                sync.skip = true;
                sync.sendUpdate(sender, sender.tankPhysicsComponent_0.getInterpolatedBodyState());
            } else if (striker.rocketTP.teleportToTarget) {
                sync.skip = true;

                const state = sender.tankPhysicsComponent_0.getInterpolatedBodyState();

                const target = utils.getTankById(striker.rocketTP.target),
                    targetState = target?.['TankPhysicsComponent']?.body?.state;

                if (targetState) {
                    state.position.x = targetState.position.x;
                    state.position.y = targetState.position.y;
                    state.position.z = targetState.position.z + 100;
                } 

                sync.sendUpdate(sender, state);
            }

            this.shellCommunicationServer_0.tryToShoot_595qrd$(this.world.physicsTime, 0, t.shellId, t.direction);
            sync.skip = false;

            if (sync.isRandomTPEnabled && !config.data.otherData.rapidUpdateData.state) {
                sender.sendState_0(sender.tankPhysicsComponent_0.getInterpolatedBodyState());
            }
        }

        strikerServer.__proto__.createGuidedRocket_0 = strikerServer.__proto__.createShell_0;

        this.#initialized = true;
    }
}