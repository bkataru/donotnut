interface AnimState {
  cA: number;
  sA: number;
  cB: number;
  sB: number;
  content: string;
}

class Interval {
  private intervalId: number | null = null;

  constructor(
    private readonly callback: () => void,
    private readonly duration: number
  ) {}

  start(): void {
    if (this.intervalId === null) {
      this.intervalId = window.setInterval(this.callback, this.duration);
    }
  }

  stop(): void {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}

const charset = '.,-~:;=!*#$@';
// .,-~:;=!*#$@

function rotate(tanangle: number, x: number, y: number): [number, number] {
  let tmp = x;

  x -= tanangle * y;
  y += tanangle * tmp;
  tmp = (3 - x * x - y * y) / 2; // renormalize w/ Newton step
  x *= tmp;
  y *= tmp;

  return [x, y];
}

function renderFrame(state: AnimState): void {
  let b: string[] = [];
  let z: number[] = [];

  [state.cA, state.sA] = rotate(0.04, state.cA, state.sA);
  [state.cB, state.sB] = rotate(0.02, state.cB, state.sB);

  for (let k = 0; k < 1760; k++) {
    b[k] = k % 80 === 79 ? '\n' : ' ';
    z[k] = 0;
  }
  let sj = 0,
    cj = 1;
  for (var j = 0; j < 90; j++) {
    let si = 0,
      ci = 1;
    for (let i = 0; i < 314; i++) {
      const h = cj + 2,
        D = 1 / (si * h * state.sA + sj * state.cA + 5),
        t = si * h * state.cA - sj * state.sA;

      const x = 0 | (40 + 30 * D * (ci * h * state.cB - t * state.sB)),
        y = 0 | (12 + 15 * D * (ci * h * state.sB + t * state.cB)),
        o = x + 80 * y,
        N =
          0 |
          (8 *
            ((sj * state.sA - si * cj * state.cA) * state.cB -
              si * cj * state.sA -
              sj * state.cA -
              ci * cj * state.sB));

      if (y < 22 && y >= 0 && x >= 0 && x < 79 && D > z[o]) {
        z[o] = D;
        b[o] = charset[N > 0 ? N : 0];
      }
      [ci, si] = rotate(0.02, ci, si);
    }
    [cj, sj] = rotate(0.07, cj, sj);
  }

  state.content = b.join('');
}

function _onload() {
  const outputTag: HTMLPreElement = document.getElementById(
    'output'
  ) as HTMLPreElement;

  const state: AnimState = {
    cA: 1,
    sA: 0,
    cB: 0,
    sB: 1,
    content: '',
  };

  const interval = new Interval(() => {
    renderFrame(state);
    outputTag.innerHTML = state.content;
  }, 20);

  interval.start();
}

_onload();
