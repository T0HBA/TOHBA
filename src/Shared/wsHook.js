/* wsHook.js
 * https://github.com/skepticfx/wshook
 * Reference: http://www.w3.org/TR/2011/WD-websockets-20110419/#websocket
 */

let wsHook  = {},
    _WS     = unsafeWindow.WebSocket;

class MutableMessageEvent {
    constructor(o) {
        this.bubbles = o.bubbles || false;
        this.cancelBubble = o.cancelBubble || false;
        this.cancelable = o.cancelable || false;
        this.currentTarget = o.currentTarget || null;
        this.data = o.data || null;
        this.defaultPrevented = o.defaultPrevented || false;
        this.eventPhase = o.eventPhase || 0;
        this.lastEventId = o.lastEventId || '';
        this.origin = o.origin || '';
        this.path = o.path || new Array(0);
        this.ports = o.parts || new Array(0);
        this.returnValue = o.returnValue || true;
        this.source = o.source || null;
        this.srcElement = o.srcElement || null;
        this.target = o.target || null;
        this.timeStamp = o.timeStamp || null;
        this.type = o.type || 'message';
        this.__proto__ = o.__proto__ || MessageEvent.__proto__;
    }
}

unsafeWindow.WebSocket = function (url, protocols) {
    let WSObject;
    this.url = url;
    this.protocols = protocols;

    this.protocols ? WSObject = new _WS(url, protocols) :  WSObject = new _WS(url);

    var _send = WSObject.send
    WSObject.send = function (data) {
      arguments[0] = wsHook.before(data, WSObject.url, WSObject) || data
      _send.apply(this, arguments)
    }

    WSObject._addEventListener = WSObject.addEventListener;
    WSObject.addEventListener = function () {
        let eventThis = this;
        if (arguments[0] === 'message') {
            arguments[1] = (function (userFunc) {
                return function instrumentAddEventListener () {
                    arguments[0] = wsHook.after(new MutableMessageEvent(arguments[0]), WSObject.url, WSObject);
                    if (arguments[0] === null) return;
                    userFunc.apply(eventThis, arguments);
                }
            })(arguments[1]);
        }
        return WSObject._addEventListener.apply(this, arguments);
    }

    Object.defineProperty(WSObject, 'onmessage', {
        'set': function () {
            let eventThis = this;
            let userFunc = arguments[0];
            let onMessageHandler = function () {
                arguments[0] = wsHook.after(new MutableMessageEvent(arguments[0]), WSObject.url, WSObject);
                if (arguments[0] === null) return;
                userFunc.apply(eventThis, arguments);
            }
            WSObject._addEventListener.apply(this, ['message', onMessageHandler, false]);
        }
    })

    return WSObject;
};

export default wsHook;