import wsHook from '../../Shared/wsHook.js';
import { packetControl } from '../../index.js';

export default class PacketControl {
    serverState = true;
    packetCounter = 0;
}

setInterval(() => {
    const output = document.getElementsByClassName('sc-bwzfXH iCDncT')[0];

    if (!output || output.childElementCount < 2)
        return;

    if (output.childElementCount === 2) {
        const pps = document.createElement('div');
        pps.innerHTML = '<div class="sc-bwzfXH cmInNa" data-style="BattleHudFpsComponentStyle-row"><span class="sc-bxivhb fPSAir" data-style="BattleHudFpsComponentStyle-label">PPS: </span><span class="sc-bxivhb bcGHtx" data-style="BattleHudFpsComponentStyle-value" id="pps">0</span></div>';
        output.appendChild(pps);
    }

    const pps = document.getElementById('pps'),
        counter = packetControl.packetCounter;

    counter >= 30 && counter <= 70 && (pps.style.color = 'rgb(255, 188, 9)');
    counter < 30 && (pps.style.color = 'rgb(116, 186, 61)');
    counter > 70 && (pps.style.color = 'rgb(255, 82, 9)');

    pps.textContent = counter.toString();
    packetControl.packetCounter = 0;
}, 1000);

wsHook.before = function() {
    packetControl.packetCounter++;
}

let timeout = undefined;

wsHook.after = function (e, url, wsObject) {
    packetControl.serverState = true;

    clearTimeout(timeout);
    timeout = setTimeout(() => packetControl.serverState = false, 30);

    return e;
}