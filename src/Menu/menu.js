import { utils, config, cImGui } from '../index.js';

export default class Menu {
    #animationCounter = 0;
    #isAnimated = false;
    #req;

    isOpen = false;
    currentTab = 0;
    tabs = [];

    constructor() {
        (async () => {
            await ImGui.default();

            ImGui.CHECKVERSION();
            ImGui.CreateContext();
            const io = ImGui.GetIO();
            cImGui.style();
            io.Fonts.AddFontDefault();

            const output = document.getElementById('output') || document.body;
            const canvas = unsafeWindow.canvas = document.createElement('canvas');
            output.appendChild(canvas);
            canvas.id = 'canvas__imgui';
            canvas.tabIndex = 0;
            canvas.style.opacity = '0';
            canvas.style.position = 'absolute';
            canvas.style.left = '0px';
            canvas.style.right = '0px';
            canvas.style.top = '0px';
            canvas.style.bottom = '0px';
            canvas.style.width = '100%';
            canvas.style.height = '100%';
            canvas.style.visibility = 'hidden';
            canvas.style.zIndex = '1000';

            canvas.getContext('webgl2', { alpha: true }) || canvas.getContext('webgl', { alpha: true });
        })();

        document.addEventListener('keyup', (e) => {
            if (utils.isChatOpen()) return;
        
            switch (e.code) {
                case 'Insert':
                case 'Numpad0':
                case 'Slash':
                    this.onMenuKeyPressed();
                    break;
            }
        });
    }

    openingAnimation = () => {
        this.#animationCounter !== 40 ? this.#animationCounter += 4 : this.#isAnimated = false;
    }

    closingAnimation = () => {
        this.#animationCounter !== 0 ? this.#animationCounter -= 4 : this.#isAnimated = false;

        if (!this.#isAnimated) this.hideMenu();
    }

    applyFilter = (value) => {
        canvas.style.opacity = value / 40 * 1;
        root.style.filter = `blur(${value * 0.1}px) brightness(${1 - value / 100})`;
    }

    animationTask = () => {
        this.#isAnimated && requestAnimationFrame(this.animationTask);
        this.isOpen ? this.openingAnimation() : this.closingAnimation();
        this.applyFilter(this.#animationCounter);
    }

    showMenu = () => {
        ImGui_Impl.Init(canvas), canvas.style.visibility = '', document.exitPointerLock();
        this.#req = requestAnimationFrame(this.process);
    }

    hideMenu = () => {
        cancelAnimationFrame(this.#req);
        config.saveStates();
        ImGui_Impl.Shutdown(), canvas.style.visibility = 'hidden';
    }

    onMenuKeyPressed = () => {
        if (this.isOpen = !this.isOpen)
            this.showMenu()

        this.#isAnimated = true;
        requestAnimationFrame(this.animationTask);
    }

    createTabButton = (label, index) => {
        if (cImGui.createActiveButton(label, (this.currentTab === index), 
            cImGui.ImVec2(100, (ImGui.GetWindowSize().y / this.tabs.length) - 7))) 
                this.currentTab = index;
    }

    process = time => {
        this.#req = requestAnimationFrame(this.process);

        ImGui_Impl.NewFrame(time);
        ImGui.NewFrame();
        ImGui.SetNextWindowSize(cImGui.ImVec2(1158, 653));

        ImGui.Begin('shizoval', null, ImGui.WindowFlags.NoCollapse | ImGui.WindowFlags.NoResize);

        cImGui.createChild('##ut2f', cImGui.ImVec2(116, 0), () => {
            for (const element of this.tabs) {
                this.createTabButton(element.label, this.tabs.indexOf(element));
            }
        });

        ImGui.SameLine();

        cImGui.createChild('##wqaa', cImGui.ImVec2(0, 0), () => {
            this.tabs[this.currentTab].process();
        });

        ImGui.End();

        ImGui.EndFrame();
        ImGui.Render();
        ImGui_Impl.RenderDrawData(ImGui.GetDrawData());
    }
}