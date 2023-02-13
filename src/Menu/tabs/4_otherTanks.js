import { config, menu, cImGui, utils, stick, cameraHack, striker } from '../../index.js';

let selectedData = {
    tank: null,
    name: 'Not selected'
}

menu.tabs.push({
    label: 'Other tanks',
    process: () => {
        cImGui.createChild('##rl2kf', cImGui.ImVec2(497, 298), () => {
            let tanks = utils.getTanks();

            if (!utils.isArrayValid(tanks))
                return;

            for (const tank of tanks) {
                if (utils.isTankEnemy(tank))
                    continue;

                let userName = tank['UserTitleComponent']?.configuration_0?.userName;

                if (typeof userName !== 'string')
                    continue;

                if (ImGui.Selectable(userName, selectedData.tank === tank)) {
                    selectedData.tank = tank;
                    selectedData.name = userName;
                }
            }
        }, 'My team');

        ImGui.SameLine();

        cImGui.createChild('##c937', cImGui.ImVec2(0, 298), () => {
            let tanks = utils.getTanks(true);

            if (!utils.isArrayValid(tanks))
                return;

            for (const tank of tanks) {
                let userName = tank['UserTitleComponent']?.configuration_0?.userName;

                if (typeof userName !== 'string')
                    continue;

                if (ImGui.Selectable(userName, selectedData.tank === tank)) {
                    selectedData.tank = tank;
                    selectedData.name = userName;
                }
            }
        }, 'Enemy team');

        cImGui.createChild('##5vge', cImGui.ImVec2(0, 0), () => {
            if (!selectedData.tank) {
                selectedData.tank = null;
                selectedData.name = 'Not selected';
                return;
            }

            if (ImGui.Button(`Set target for Rocket Teleport ${JSON.stringify(config.data.weaponData.
                    strikerData.nextTargetData.bind.keys)}`, cImGui.ImVec2(986, 30))) {
                striker.rocketTP.target = utils.getTankId(selectedData.tank);
            }

            if (ImGui.Button('Set target for aimBot', cImGui.ImVec2(986, 30))) {
                striker.aimBotTarget = utils.getTankId(selectedData.tank);
            }

            if (ImGui.Button(`Stick ${JSON.stringify(config.data.stickData.nextTargetData.bind.keys)}`, 
                    cImGui.ImVec2(986, 30))) {
                stick.stick(selectedData.tank);
            }
    
            if (ImGui.Button(`Spectate ${JSON.stringify(config.data.spectateData.nextTargetData.bind.keys)}`, 
                    cImGui.ImVec2(986, 30))) {
                cameraHack.spectate(selectedData.tank);
            }

            ImGui.Separator();

            let stickBind       = config.data.stickData.deactivateData.bind.keys,
                spectateBind     = config.data.spectateData.deactivateData.bind.keys;

            ImGui.Text(`Press the ${JSON.stringify(stickBind)} key to turn off the stick and ${JSON.stringify(spectateBind)} spectate`);
        }, typeof selectedData.name === 'string' ? selectedData.name : 'Not selected');
    }
})