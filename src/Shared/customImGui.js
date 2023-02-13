import { kp } from './keyPressing.js';

export const createChild = (name, size, callback, label) => {
    ImGui.BeginChild(name, size, true, label ? ImGui.WindowFlags.MenuBar : undefined);
    if (label) {
        if (ImGui.BeginMenuBar()) {
            ImGui.SetCursorPosX((ImGui.GetWindowSize().x / 2) - (label.length * ImGui.GetFontSize() / 4));
            ImGui.TextUnformatted(label);
            ImGui.EndMenuBar();
        }
    }
    callback();
    ImGui.EndChild();
}

const normalButton = () => {
    ImGui.PushStyleColor(ImGui.Col.Button, ImGui.GetStyleColorVec4(ImGui.Col.Button));
    ImGui.PushStyleColor(ImGui.Col.Text, ImGui.GetStyleColorVec4(ImGui.Col.TextDisabled));
}

const activeButton = () => {
    ImGui.PushStyleColor(ImGui.Col.Button, new ImGui.Color(0.26, 0.26, 0.26));
    ImGui.PushStyleColor(ImGui.Col.Text, ImGui.GetStyleColorVec4(ImGui.Col.Text));
}

export const createActiveButton = (label, active, size) => {
    active ? activeButton() : normalButton();
    let ret = ImGui.Button(label, size);
    ImGui.PopStyleColor(2);
    return ret;
}

export const access = (o, key) => {
    return (v = o[key]) => o[key] = v;
}

export const style = () => {
    let style = ImGui.GetStyle();
    let colors = ImGui.GetStyle().Colors;

    style.Alpha = 1.0;
    style.WindowPadding.x = 8;
    style.WindowPadding.y = 8;
    style.WindowRounding = 3.0;
    style.PopupRounding = 3.0;
    style.WindowTitleAlign.x = 0.5;
    style.WindowTitleAlign.y = 0.5;

    style.FramePadding.x = 4;
    style.FramePadding.y = 3;
    style.ItemSpacing.x = 8;
    style.ItemSpacing.y = 5;
    style.TouchExtraPadding.x = 0;
    style.TouchExtraPadding.y = 0;
    style.IndentSpacing = 21.0;
    style.ColumnsMinSpacing = 0.0;
    style.ScrollbarSize = 6.0;
    style.ScrollbarRounding = 0.0;
    style.GrabMinSize = 5.0;
    style.GrabRounding = 3.3;
    style.ButtonTextAlign.x = 0.5;
    style.ButtonTextAlign.y = 0.5;
    style.DisplayWindowPadding.x = 22;
    style.DisplayWindowPadding.y = 22;
    style.DisplaySafeAreaPadding.x = 4;
    style.DisplaySafeAreaPadding.y = 4;
    style.AntiAliasedLines = true;
    style.AntiAliasedFill = true;
    style.CurveTessellationTol = 1;

    colors[ImGui.Col.Text] = ImVec4(1.00, 1.00, 1.00, 1.00);
    colors[ImGui.Col.TextDisabled] = ImVec4(0.30, 0.31, 0.34, 1.00);
    colors[ImGui.Col.WindowBg] = ImVec4(0.11, 0.13, 0.16, 1.00);
    colors[ImGui.Col.ChildBg] = ImVec4(0.16, 0.17, 0.20, 1.00);
    colors[ImGui.Col.PopupBg] = ImVec4(0.16, 0.17, 0.20, 1.00);
    colors[ImGui.Col.Border] = ImVec4(0.12, 0.12, 0.16, 1.00);
    colors[ImGui.Col.BorderShadow] = ImVec4(0.00, 0.00, 0.00, 0.00);
    colors[ImGui.Col.FrameBg] = ImVec4(0.09, 0.10, 0.15, 1.00);
    colors[ImGui.Col.FrameBgHovered] = ImVec4(0.12, 0.13, 0.17, 1.00);
    colors[ImGui.Col.FrameBgActive] = ImVec4(0.07, 0.08, 0.13, 1.00);
    colors[ImGui.Col.TitleBg] = ImVec4(0.14, 0.14, 0.14, 1.00);
    colors[ImGui.Col.TitleBgActive] = ImVec4(0.14, 0.14, 0.14, 1.00);
    colors[ImGui.Col.TitleBgCollapsed] = ImVec4(0.14, 0.14, 0.14, 1.00);
    colors[ImGui.Col.MenuBarBg] = ImVec4(0.14, 0.14, 0.14, 1.00);
    colors[ImGui.Col.ScrollbarBg] = ImVec4(0.17, 0.17, 0.17, 1.00);
    colors[ImGui.Col.ScrollbarGrab] = ImVec4(0.25, 0.25, 0.25, 1.00);
    colors[ImGui.Col.ScrollbarGrabHovered] = ImVec4(0.25, 0.25, 0.25, 1.00);
    colors[ImGui.Col.ScrollbarGrabActive] = ImVec4(0.25, 0.25, 0.25, 1.00);
    colors[ImGui.Col.CheckMark] = ImVec4(0.86, 0.87, 0.90, 1.00);
    colors[ImGui.Col.SliderGrab] = ImVec4(0.48, 0.49, 0.51, 1.00);
    colors[ImGui.Col.SliderGrabActive] = ImVec4(0.66, 0.67, 0.69, 1.00);
    colors[ImGui.Col.Button] = ImVec4(0.09, 0.10, 0.15, 1.00);
    colors[ImGui.Col.ButtonHovered] = ImVec4(0.12, 0.13, 0.17, 1.00);
    colors[ImGui.Col.ButtonActive] = ImVec4(0.07, 0.08, 0.13, 1.00);
    colors[ImGui.Col.Header] = ImVec4(0.29, 0.34, 0.43, 1.00);
    colors[ImGui.Col.HeaderHovered] = ImVec4(0.21, 0.24, 0.31, 1.00);
    colors[ImGui.Col.HeaderActive] = ImVec4(0.29, 0.34, 0.43, 1.00);
    colors[ImGui.Col.Separator] = ImVec4(0.43, 0.43, 0.50, 0.50);
    colors[ImGui.Col.SeparatorHovered] = ImVec4(0.43, 0.43, 0.50, 0.50);
    colors[ImGui.Col.SeparatorActive] = ImVec4(0.43, 0.43, 0.50, 0.50);
    colors[ImGui.Col.ResizeGrip] = ImVec4(0.26, 0.59, 0.98, 0.25);
    colors[ImGui.Col.ResizeGripHovered] = ImVec4(0.26, 0.59, 0.98, 0.67);
    colors[ImGui.Col.ResizeGripActive] = ImVec4(0.26, 0.59, 0.98, 0.95);
    colors[ImGui.Col.Tab] = ImVec4(0.00, 0.00, 0.00, 0.00);
    colors[ImGui.Col.TabHovered] = ImVec4(0.00, 0.00, 0.00, 0.00);
    colors[ImGui.Col.TabActive] = ImVec4(0.20, 0.22, 0.27, 1.00);
    colors[ImGui.Col.TabUnfocused] = ImVec4(0.07, 0.10, 0.15, 0.97);
    colors[ImGui.Col.TabUnfocusedActive] = ImVec4(0.14, 0.26, 0.42, 1.00);
    colors[ImGui.Col.PlotLines] = ImVec4(0.61, 0.61, 0.61, 1.00);
    colors[ImGui.Col.PlotLinesHovered] = ImVec4(1.00, 0.43, 0.35, 1.00);
    colors[ImGui.Col.PlotHistogram] = ImVec4(0.90, 0.70, 0.00, 1.00);
    colors[ImGui.Col.PlotHistogramHovered] = ImVec4(1.00, 0.60, 0.00, 1.00);
    colors[ImGui.Col.TextSelectedBg] = ImVec4(0.25, 0.25, 0.25, 0.50);
    colors[ImGui.Col.DragDropTarget] = ImVec4(1.00, 1.00, 0.00, 0.90);
    colors[ImGui.Col.NavHighlight] = ImVec4(0.26, 0.59, 0.98, 1.00);
    colors[ImGui.Col.NavWindowingHighlight] = ImVec4(1.00, 1.00, 1.00, 0.70);
    colors[ImGui.Col.NavWindowingDimBg] = ImVec4(0.80, 0.80, 0.80, 0.20);
    colors[ImGui.Col.ModalWindowDimBg] = ImVec4(0.80, 0.80, 0.80, 0.35);
}

export const ShowHelpMarker = desc => {
    ImGui.TextDisabled("(?)");
    if (ImGui.IsItemHovered()) {
        ImGui.BeginTooltip();
        ImGui.PushTextWrapPos(ImGui.GetFontSize() * 35.0);
        ImGui.TextUnformatted(desc);
        ImGui.PopTextWrapPos();
        ImGui.EndTooltip();
    }
}

export const ImVec2 = (x, y) => {
    return new ImGui.Vec2(x, y);
}

export const ImVec4 = (x, y, z, w = 1.0) => {
    return new ImGui.Vec4(x, y, z, w);
}

export const getKeysWindow = current => {
    let result  = false,
        io      = ImGui.GetIO();

    ImGui.SetNextWindowSize(ImVec2(0, 0));

    ImGui.SetNextWindowPos(ImVec2(io.DisplaySize.x * 0.5, io.DisplaySize.y * 0.5), 
        ImGui.Cond.Always, ImVec2(0.5, 0.5));

    ImGui.SetNextWindowFocus();

    ImGui.Begin('press the key', null, ImGui.WindowFlags.NoCollapse | ImGui.WindowFlags.NoResize);
    ImGui.Text(`Current bind: ${JSON.stringify(current)}`);
    ImGui.Text(`Pressed keys: ${JSON.stringify(kp.keyPresseds)}`);

    if (ImGui.Button('OK', ImVec2(ImGui.GetWindowSize().x * 0.3, 30)))
        result = JSON.parse(JSON.stringify(kp.keyPresseds));

    ImGui.SameLine();

    if (ImGui.Button('Clear', ImVec2(ImGui.GetWindowSize().x * 0.3, 30)))
        kp.keyPresseds = [];

    ImGui.SameLine();

    if (ImGui.Button('Cancel', ImVec2(ImGui.GetWindowSize().x * 0.3, 30)))
        result = true;

    ImGui.End();

    return result;
}

export const bindKey = (lable, size, bind) => {
    if (ImGui.Button(lable, size)) {
        bind.state = true;
    }

    if (bind.state) {
        let result = getKeysWindow(bind.keys);

        if (result !== false) {
            if (result !== true)
                bind.keys = result;

            bind.state = false;
        }
    }
}