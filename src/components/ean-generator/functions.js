export function generate(n) {
  if (typeof (n) !== 'number') {
    n = parseInt(n);
  }
  let s = 0;
  let f = 3;
  let o = n;
  for (let i = 0; i < 12; i++) {
    const r = o % 10;
    s += f * r;
    o = Math.floor(o / 10);
    if (0 === o) {
      break;
    }
    f = 3 == f ? 1 : 3;
  }
  const d = (10 - (s % 10)) % 10;
  n = n * 10 + d;
  return n.toString().padStart(13, '0');
}

export function check(n) {
  if (typeof (n) !== 'number') {
    n = parseInt(n);
  }
  const x = n % 10;
  const o = Math.floor(n / 10);
  const d = generate(o) % 10;
  return x === d;
}