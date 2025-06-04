class WaveNode {
  constructor(x, y, state) {
    this.x = x;
    this.y = y;
    this.state = state; // 0: ebb, 1: flow, 2: crest
    this.balance = Math.random() * 50 + 50;
  }

  draw(ctx) {
    ctx.fillStyle = this.state === 0 ? '#ffa8a8' : this.state === 1 ? '#a8a8ff' : '#a8ffe8';
    ctx.beginPath();
    ctx.arc(this.x + 20, this.y + 20, this.balance / 5, 0, Math.PI * 2);
    ctx.fill();
  }

  update() {
    this.balance -= 0.95;
    return this.balance <= 0;
  }
}

module.exports = WaveNode;
