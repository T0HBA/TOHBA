import { config, menu, cImGui, striker } from '../../index.js';

menu.tabs.push({
    label: 'Weapons',
    process: () => {
        cImGui.createChild('##pop23', cImGui.ImVec2(0, 0), () => {
            ImGui.Checkbox('Get a target for the aimbot with the scope', 
                cImGui.access(config.data.weaponData.strikerData.getTargetForAimWithScope, 'state'));
    
            ImGui.Checkbox('Get a teleport target with a scope', 
                cImGui.access(config.data.weaponData.strikerData.getTargetForTPWithScope, 'state'));
    
            ImGui.Text('P.S. if off: you can select the target in Other tanks');
    
            ImGui.Separator();
    
            cImGui.ShowHelpMarker('If the rockets are stuck and nothing happens, press the [R] key.');
            ImGui.SameLine();
            ImGui.Checkbox('Rocket teleport', 
                cImGui.access(config.data.weaponData.strikerData.shellsTeleportData, 'state'));
    
            if (config.data.weaponData.strikerData.shellsTeleportData.state) {
                ImGui.SetCursorPosX(ImGui.GetCursorPosX() + 45);
    
                cImGui.ShowHelpMarker('Mack - thanks for the idea!');
                ImGui.SameLine();
                ImGui.Checkbox('No collision shells (Experimental)', cImGui.access(striker.rocketTP, 'teleportToTarget'));
            }
    
            cImGui.ShowHelpMarker('If you want to change the target, but the ambot does not let you do so, press the [N] key.');
            ImGui.SameLine();
            ImGui.Checkbox('Aimbot', cImGui.access(config.data.weaponData.strikerData.aimBotData, 'state'));
        }, 'Striker');
    
        ImGui.Text('coming soon');
    }
});