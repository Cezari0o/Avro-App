export default class IdCounter {
  private count: number;
  constructor(initialCount?: number) {
    this.count = initialCount || 0;
  }

  get() {
    const prev = this.count;
    return this.count++;
  }

  set(count: number) {
    this.count = count;
  }
}
