export function selectRandom<T>(list: Array<T>): T {
  return list[Math.floor(Math.random() * list.length)];
}

export async function sleep(ms = 2000) {
  return new Promise((res) => setTimeout(res, ms));
}
