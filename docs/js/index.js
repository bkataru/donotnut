var Interval = (function () {
    function Interval(callback, duration) {
        this.callback = callback;
        this.duration = duration;
        this.intervalId = null;
    }
    Interval.prototype.start = function () {
        if (this.intervalId === null) {
            this.intervalId = window.setInterval(this.callback, this.duration);
        }
    };
    Interval.prototype.stop = function () {
        if (this.intervalId !== null) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    };
    return Interval;
}());
var charset = '.,-~:;=!*#$@';
function rotate(tanangle, x, y) {
    var tmp = x;
    x -= tanangle * y;
    y += tanangle * tmp;
    tmp = (3 - x * x - y * y) / 2;
    x *= tmp;
    y *= tmp;
    return [x, y];
}
function renderFrame(state) {
    var _a, _b, _c, _d;
    var b = [];
    var z = [];
    _a = rotate(0.04, state.cA, state.sA), state.cA = _a[0], state.sA = _a[1];
    _b = rotate(0.02, state.cB, state.sB), state.cB = _b[0], state.sB = _b[1];
    for (var k = 0; k < 1760; k++) {
        b[k] = k % 80 === 79 ? '\n' : ' ';
        z[k] = 0;
    }
    var sj = 0, cj = 1;
    for (var j = 0; j < 90; j++) {
        var si = 0, ci = 1;
        for (var i = 0; i < 314; i++) {
            var h = cj + 2, D = 1 / (si * h * state.sA + sj * state.cA + 5), t = si * h * state.cA - sj * state.sA;
            var x = 0 | (40 + 30 * D * (ci * h * state.cB - t * state.sB)), y = 0 | (12 + 15 * D * (ci * h * state.sB + t * state.cB)), o = x + 80 * y, N = 0 |
                (8 *
                    ((sj * state.sA - si * cj * state.cA) * state.cB -
                        si * cj * state.sA -
                        sj * state.cA -
                        ci * cj * state.sB));
            if (y < 22 && y >= 0 && x >= 0 && x < 79 && D > z[o]) {
                z[o] = D;
                b[o] = charset[N > 0 ? N : 0];
            }
            _c = rotate(0.02, ci, si), ci = _c[0], si = _c[1];
        }
        _d = rotate(0.07, cj, sj), cj = _d[0], sj = _d[1];
    }
    state.content = b.join('');
}
function _onload() {
    var outputTag = document.getElementById('output');
    var state = {
        cA: 1,
        sA: 0,
        cB: 0,
        sB: 1,
        content: '',
    };
    var interval = new Interval(function () {
        renderFrame(state);
        outputTag.innerHTML = state.content;
    }, 20);
    interval.start();
}
_onload();
