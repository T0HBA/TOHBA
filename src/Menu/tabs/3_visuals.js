import { config, menu, cImGui } from '../../index.js';

const rgbToHex = (v) => [parseInt((255 * v[0]).toFixed(1)),
    parseInt((255 * v[1]).toFixed(1)), parseInt((255 * v[2]).toFixed(1))].map(x => {
    const hex = x.toString(16)
    return hex.length === 1 ? '0' + hex : hex
}).join('');

const rgbToDec = (v) => {
    return parseInt(rgbToHex(v), 16);
};

let colorsTab = 0;

menu.tabs.push({
    label: 'Visuals',
    process: () => {
        cImGui.createChild('##gk7q', cImGui.ImVec2(339, 298.5), () => {
            ImGui.Checkbox('Enabled', cImGui.access(config.data.wallHackData.tankGlowData, 'state'));
            ImGui.Checkbox('Only enemy', cImGui.access(config.data.wallHackData.tankGlowData, 'onlyEnemy'));
        }, 'Glow');
    
        cImGui.createChild('##jr4l', cImGui.ImVec2(339, 298.5), () => {
            ImGui.Checkbox('Enabled', cImGui.access(config.data.wallHackData.tankChamsData, 'state'));
            ImGui.Checkbox('Only enemy', cImGui.access(config.data.wallHackData.tankChamsData, 'onlyEnemy'));
        }, 'Chams');
        
        ImGui.SameLine();
    
        ImGui.SetCursorPosY(ImGui.GetCursorPosY() - 303);
    
        cImGui.createChild('##y1bm', cImGui.ImVec2(0, 300), () => {
            cImGui.createChild('##g9eb', cImGui.ImVec2(0, 35), () => {
                if (cImGui.createActiveButton('Team', (colorsTab === 0), cImGui.ImVec2(202, 0))) colorsTab = 0;
                ImGui.SameLine();
                if (cImGui.createActiveButton('Enemy', (colorsTab === 1), cImGui.ImVec2(202, 0))) colorsTab = 1;
                ImGui.SameLine();
                if (cImGui.createActiveButton('Target', (colorsTab === 2), cImGui.ImVec2(202, 0))) colorsTab = 2;
            });
    
            cImGui.createChild('##tn9u', cImGui.ImVec2(0, 225), () => {
                switch (colorsTab) {
                    case 0: 
                        cImGui.createChild('##7shn', cImGui.ImVec2(0, 100), () => {
                            ImGui.ColorEdit3('##j8im', config.data.wallHackData.tankGlowData.colorTeam.rgb);
                            config.data.wallHackData.tankGlowData.colorTeam.dec = 
                                rgbToDec(config.data.wallHackData.tankGlowData.colorTeam.rgb);
                        }, 'Glow');
    
                        cImGui.createChild('##y4w', cImGui.ImVec2(0, 0), () => {
                            ImGui.ColorEdit4('##hkb8', config.data.wallHackData.tankChamsData.colorTeam);
                        }, 'Chams');
                        break;
                    case 1: 
                        cImGui.createChild('##epop', cImGui.ImVec2(0, 100), () => {
                            ImGui.ColorEdit3('##34mt', config.data.wallHackData.tankGlowData.colorEnemy.rgb);
                            config.data.wallHackData.tankGlowData.colorEnemy.dec = 
                                rgbToDec(config.data.wallHackData.tankGlowData.colorEnemy.rgb);
                        }, 'Glow');
    
                        cImGui.createChild('##y4w', cImGui.ImVec2(0, 0), () => {
                            ImGui.ColorEdit4('##n8ii', config.data.wallHackData.tankChamsData.colorEnemy);
                        }, 'Chams');
                        break;
                    case 2: 
                        cImGui.createChild('##u0osh', cImGui.ImVec2(0, 100), () => {
                            ImGui.ColorEdit3('##vbng', config.data.wallHackData.tankGlowData.colorTarget.rgb);
                            config.data.wallHackData.tankGlowData.colorTarget.dec = 
                                rgbToDec(config.data.wallHackData.tankGlowData.colorTarget.rgb);
                        }, 'Glow');
    
                        cImGui.createChild('##y4w', cImGui.ImVec2(0, 0), () => {
                            ImGui.ColorEdit4('##b4gpj', config.data.wallHackData.tankChamsData.colorTarget);
                        }, 'Chams');
                        break;
                }
            });
        }, 'Colors');
    
        ImGui.SetCursorPosX(ImGui.GetCursorPosX() + 347);
    
        cImGui.createChild('##wk2d', cImGui.ImVec2(0, 0), () => {
            ImGui.SliderFloat('blur', cImGui.access(config.data.filtersData, 'blur'), 0, 5);
            ImGui.SliderFloat('brightness', cImGui.access(config.data.filtersData, 'brightness'), 0, 1);
            ImGui.SliderFloat('contrast', cImGui.access(config.data.filtersData, 'contrast'), 0, 200);
            ImGui.SliderFloat('grayscale', cImGui.access(config.data.filtersData, 'grayscale'), 0, 100);
            ImGui.SliderFloat('hue-rotate', cImGui.access(config.data.filtersData, 'hue-rotate'), 0, 360);
            ImGui.SliderFloat('invert', cImGui.access(config.data.filtersData, 'invert'), 0, 100);
            ImGui.SliderFloat('saturate', cImGui.access(config.data.filtersData, 'saturate'), 0, 5);
            ImGui.SliderFloat('sepia', cImGui.access(config.data.filtersData, 'sepia'), 0, 100);
        }, 'Filters');
    }
});