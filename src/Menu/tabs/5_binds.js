import { config, menu, cImGui } from '../../index.js';

const bindsData = {
    function: 'Not selected'
};

const createActiveButton = (label, size = cImGui.ImVec2(0, 0)) => {
    cImGui.createActiveButton(label, (bindsData.function === label), size) && 
        (bindsData.function = label);
}

let functionsHandler = name => {
    let cfg;
    switch (name) {
        case 'AirBreak':
            cfg = config.data.airBreakData;
            cImGui.bindKey('Forward',               cImGui.ImVec2(986, 20), cfg.movementData.forward.bind);
            cImGui.bindKey('Back',                  cImGui.ImVec2(986, 20), cfg.movementData.back.bind);
            cImGui.bindKey('Left',                  cImGui.ImVec2(986, 20), cfg.movementData.left.bind);
            cImGui.bindKey('Right',                 cImGui.ImVec2(986, 20), cfg.movementData.right.bind);
            cImGui.bindKey('Up',                    cImGui.ImVec2(986, 20), cfg.movementData.up.bind);
            cImGui.bindKey('Down',                  cImGui.ImVec2(986, 20), cfg.movementData.down.bind);
            cImGui.bindKey('Toggle state',          cImGui.ImVec2(986, 20), cfg.toggleStateData.bind);
            cImGui.bindKey('Type: default',         cImGui.ImVec2(986, 20), cfg.typeData.default.bind);
            cImGui.bindKey('Type: airWalk',         cImGui.ImVec2(986, 20), cfg.typeData.airWalk.bind);
            cImGui.bindKey('Type: simple',          cImGui.ImVec2(986, 20), cfg.typeData.simple.bind);
            cImGui.bindKey('Speed +',               cImGui.ImVec2(986, 20), cfg.speedData.inc.bind);
            cImGui.bindKey('Speed -',               cImGui.ImVec2(986, 20), cfg.speedData.dec.bind);
            cImGui.bindKey('Smooth +',              cImGui.ImVec2(986, 20), cfg.smoothData.inc.bind);
            cImGui.bindKey('Smooth -',              cImGui.ImVec2(986, 20), cfg.smoothData.dec.bind);
            cImGui.bindKey('Limiting Kill Zones',   cImGui.ImVec2(986, 20), cfg.killZoneData.bind);
            break;

        case 'Sync':
            cfg = config.data.syncData;
            cImGui.bindKey('Avoid rockets',         cImGui.ImVec2(986, 20), cfg.antiStrikerData.bind);
            cImGui.bindKey('Anti-Aim',              cImGui.ImVec2(986, 20), cfg.randomTeleportData.bind);
            cImGui.bindKey('Avoid mines',           cImGui.ImVec2(986, 20), cfg.antiMineData.bind);
            break;
        
        case 'Clicker':
            cfg = config.data.clickerData;
            cImGui.bindKey('Armor',                 cImGui.ImVec2(986, 20), cfg.autoArmorData.bind);
            cImGui.bindKey('Damage',                cImGui.ImVec2(986, 20), cfg.autoDamageData.bind);
            cImGui.bindKey('Nitro',                 cImGui.ImVec2(986, 20), cfg.autoNitroData.bind);
            cImGui.bindKey('Mine',                  cImGui.ImVec2(986, 20), cfg.autoMiningData.bind);
            cImGui.bindKey('Healing',               cImGui.ImVec2(986, 20), cfg.autoHealingData.bind);
            break;

        case 'Striker':
            cfg = config.data.weaponData.strikerData;
            cImGui.bindKey('AimBot',                cImGui.ImVec2(986, 20), cfg.aimBotData.bind);
            cImGui.bindKey('Shells teleport',       cImGui.ImVec2(986, 20), cfg.shellsTeleportData.bind);
            cImGui.bindKey('Get a target for the aimbot with the scope', 
                                                    cImGui.ImVec2(986, 20), cfg.getTargetForAimWithScope.bind);
            cImGui.bindKey('Get a teleport target with a scope', 
                                                    cImGui.ImVec2(986, 20), cfg.getTargetForTPWithScope.bind);
            cImGui.bindKey('Next target',           cImGui.ImVec2(986, 20), cfg.nextTargetData.bind);
            break;

        case 'Camera':
            cfg = config.data.cameraData;
            cImGui.bindKey('Change distance',       cImGui.ImVec2(986, 20), cfg.bind);
            break;

        case 'Stick':
            cfg = config.data.stickData;
            cImGui.bindKey('Next target',           cImGui.ImVec2(986, 20), cfg.nextTargetData.bind);
            cImGui.bindKey('Deactivate',            cImGui.ImVec2(986, 20), cfg.deactivateData.bind);
            break;

        case 'Spectate':
            cfg = config.data.spectateData;
            cImGui.bindKey('Next target',           cImGui.ImVec2(986, 20), cfg.nextTargetData.bind);
            cImGui.bindKey('Deactivate',            cImGui.ImVec2(986, 20), cfg.deactivateData.bind);
            break;
    };
};

menu.tabs.push({
    label: 'Binds',
    process: () => {
        cImGui.createChild('##peh32', cImGui.ImVec2(0, 530), () => {
            functionsHandler(bindsData.function);
        }, bindsData.function);
        
        cImGui.createChild('##sg391',       cImGui.ImVec2(0, 0), () => {
            createActiveButton('AirBreak',  cImGui.ImVec2(134, 30));
            ImGui.SameLine();
            createActiveButton('Sync',      cImGui.ImVec2(134, 30));
            ImGui.SameLine();
            createActiveButton('Clicker',   cImGui.ImVec2(134, 30));
            ImGui.SameLine();
            createActiveButton('Striker',   cImGui.ImVec2(134, 30));
            ImGui.SameLine();
            createActiveButton('Camera',    cImGui.ImVec2(134, 30));
            ImGui.SameLine();
            createActiveButton('Stick',     cImGui.ImVec2(134, 30));
            ImGui.SameLine();
            createActiveButton('Spectate',  cImGui.ImVec2(134, 30));
        }, 'Functions');
    }
})