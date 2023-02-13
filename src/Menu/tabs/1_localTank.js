import { config, menu, cImGui } from '../../index.js';

menu.tabs.push({
    label: 'Local tank',
    process: () => {
        cImGui.createChild('##crgtj', cImGui.ImVec2(339, 200), () => {
            let cfg = config.data.airBreakData;

            ImGui.SliderInt('Speed##kyxu', cImGui.access(cfg.speedData, 'state'), 1, 1000);

            ImGui.SliderInt('Smooth##bshu', cImGui.access(cfg.smoothData, 'state'), 1, 100);

            ImGui.Text('Type: ');

            ImGui.SameLine();

            cImGui.createActiveButton('Default##jzqy', (cfg.typeData.state === 'default'), 
                cImGui.ImVec2(0, 0)) && (cfg.typeData.state = 'default');

            ImGui.SameLine();

            cImGui.createActiveButton('AirWalk', (cfg.typeData.state === 'airWalk'), 
                cImGui.ImVec2(0, 0)) && (cfg.typeData.state = 'airWalk');

            ImGui.SameLine();

            cImGui.createActiveButton('Simple', (cfg.typeData.state === 'noob'), 
                cImGui.ImVec2(0, 0)) && (cfg.typeData.state = 'noob');

            ImGui.Checkbox('Limiting Kill Zones', cImGui.access(cfg.killZoneData, 'state'));
        }, 'AirBreak');

        ImGui.SameLine();

        cImGui.createChild('##8757', cImGui.ImVec2(339, 200), () => {
            let cfg = config.data.syncData;
            
            cImGui.ShowHelpMarker('If someone shoots with a striker, the anti-aim will automatically turn on');
            ImGui.SameLine();
            ImGui.Checkbox('Avoid rockets', cImGui.access(cfg.antiStrikerData, 'state'));

            ImGui.SameLine();

            cImGui.createActiveButton('Only enemy##95ewq', (cfg.antiStrikerData.type === 'Enemy'), 
                cImGui.ImVec2(0, 0)) && (cfg.antiStrikerData.type = 'Enemy');

            ImGui.SameLine();

            cImGui.createActiveButton('All##opeez', (cfg.antiStrikerData.type === 'ALL'), 
                cImGui.ImVec2(0, 0)) && (cfg.antiStrikerData.type = 'ALL');
            
            cImGui.ShowHelpMarker('Random teleport around the map');
            ImGui.SameLine();
            ImGui.Checkbox('Anti-Aim', cImGui.access(cfg.randomTeleportData, 'state'));

            cImGui.ShowHelpMarker('Lifts you up to a height of your choice');
            ImGui.SameLine();
            ImGui.Checkbox('Avoid mines', cImGui.access(cfg.antiMineData, 'state'));

            if (cfg.antiMineData.state) {
                ImGui.SetCursorPosX(ImGui.GetCursorPosX() + 45);
                ImGui.InputInt('Height', cImGui.access(cfg.antiMineData, 'height'), 10, 10);
            }
            
            return;

            ImGui.ShowHelpMarker('Controls the state of the server');
            ImGui.SameLine();
            ImGui.Checkbox('Anti-Crash (Experimental)', ImGui.access(PacketsControl, 'antiCrash'));

            if (PacketsControl.antiCrash) {
                ImGui.SetCursorPosX(ImGui.GetCursorPosX() + 45);
                ImGui.InputInt('Delay', ImGui.access(PacketsControl, 'delay'), 10, 10);

                if (PacketsControl.delay < 10) PacketsControl.delay = 10;
            }
        }, 'Sync');

        ImGui.SameLine();

        cImGui.createChild('##53jbk', cImGui.ImVec2(0, 200), () => {
            let cfg = config.data.clickerData;
            ImGui.Checkbox('Armor', cImGui.access(cfg.autoArmorData, 'state'));
            ImGui.Checkbox('Damage', cImGui.access(cfg.autoDamageData, 'state'));
            ImGui.Checkbox('Nitro', cImGui.access(cfg.autoNitroData, 'state'));
            ImGui.Checkbox('Mine', cImGui.access(cfg.autoMiningData, 'state'));
            ImGui.Checkbox('Healing', cImGui.access(cfg.autoHealingData, 'state'));

            if (cfg.autoHealingData.state) {
                ImGui.SetCursorPosX(ImGui.GetCursorPosX() + 15);
                ImGui.InputInt('Delay##jypy', cImGui.access(cfg.autoHealingData, 'delay'), 10);

                cfg.autoHealingData.delay < 0 && (cfg.autoHealingData.delay = 0);
            }
        }, 'Clicker');

        cImGui.createChild('##vtse', cImGui.ImVec2(0, 0), () => {
            cImGui.ShowHelpMarker('Removes all mines on the map (FPS UP)');
            ImGui.SameLine();
            ImGui.Checkbox('Remove mines', cImGui.access(config.data.removeMinesData, 'state'));
    
            ImGui.SameLine();
    
            cImGui.createActiveButton('Remove only my team', (config.data.removeMinesData.type === 'TEAM'), cImGui.ImVec2(0, 0)) && 
                (config.data.removeMinesData.type = 'TEAM');
    
            ImGui.SameLine();
    
            cImGui.createActiveButton('Remove all mines', (config.data.removeMinesData.type === 'ALL'), cImGui.ImVec2(0, 0)) && 
                (config.data.removeMinesData.type = 'ALL');
    
            cImGui.ShowHelpMarker('Automatically turns on clicker (Healing) when health is not full or there is a mammoth overdrive turned on');
            ImGui.SameLine();
            ImGui.Checkbox('Auto healing clicker', cImGui.access(config.data.otherData, 'autoHealingClicker'));
    
            cImGui.ShowHelpMarker('Infinite acceleration');
            ImGui.SameLine();
            ImGui.Checkbox('SpeedHack', cImGui.access(config.data.otherData, 'speedHack'));
    
            cImGui.ShowHelpMarker('A third-person camera like in GTA. Distance key [V]');
            ImGui.SameLine();
            ImGui.Checkbox('GTA Camera', cImGui.access(config.data.cameraData, 'state'));
    
            cImGui.ShowHelpMarker('Disabling the tank drop');
            ImGui.SameLine();
            ImGui.Checkbox('Freeze Tanks', cImGui.access(config.data.otherData, 'freezeTanks'));
    
            cImGui.ShowHelpMarker('Disabling tank collision');
            ImGui.SameLine();
            ImGui.Checkbox('No collision', cImGui.access(config.data.otherData, 'noCollision'));
    
            cImGui.ShowHelpMarker('Fast sending of data to the server');
            ImGui.SameLine();
            ImGui.Checkbox('Rapid Update', cImGui.access(config.data.otherData.rapidUpdateData, 'state'));
    
            if (config.data.otherData.rapidUpdateData.state) {
                let cfg = config.data.otherData.rapidUpdateData;
    
                ImGui.SetCursorPosX(ImGui.GetCursorPosX() + 45);
                
                ImGui.InputInt('Delay##cwwh', cImGui.access(cfg, 'delay'), 10);
    
                if (cfg.delay < 50 && cfg.warning !== true) {
                    let io = ImGui.GetIO();
    
                    ImGui.SetNextWindowSize(cImGui.ImVec2(0, 0));
    
                    ImGui.SetNextWindowPos(cImGui.ImVec2(io.DisplaySize.x * 0.5, io.DisplaySize.y * 0.5), 
                        ImGui.Cond.Always, cImGui.ImVec2(0.5, 0.5));
    
                    ImGui.SetNextWindowFocus();
    
                    ImGui.Begin('WARNING', null, ImGui.WindowFlags.NoCollapse | ImGui.WindowFlags.NoResize);
    
                    ImGui.Text('It is not recommended to select a value\nlessthan 50 ms, it may cause a crash.');
    
                    if (ImGui.Button('OK', cImGui.ImVec2(303, 30))) {
                        cfg.warning = true;
                    }
    
                    ImGui.End();
                }
    
                config.data.otherData.rapidUpdateData.delay < 10 && (config.data.otherData.rapidUpdateData.delay = 10);
            }
        }, 'Other');
    }
})