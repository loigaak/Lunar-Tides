const { createCanvas } = require('canvas');
const WaveNode = require('./node.js');

class LunarTides {
  constructor() {
    this.canvas = createCanvas(480, 720);
    this.ctx = this.canvas.getContext('2d');
    this.gridSize = 40;
    this.cols = 12;
    this.rows = 18;
    this.nodes = [];
    this.score = 0;
    this.cycle = 1;
    this.maxNodes = 5;
    this.spawnNode();
  }

  spawnNode() {
    if (this.nodes.length >= this.maxNodes) return;
    const col = Math.floor(Math.random() * this.cols);
    const row = Math.floor(Math.random() * (this.rows - 2)) + 2; // Avoid top rows for UI
    const state = Math.floor(Math.random() * 3); // 0: ebb, 1: flow, 2: crest
    this.nodes.push(new WaveNode(col * this.gridSize, row * this.gridSize, state));
  }

  drawGrid() {
    this.ctx.strokeStyle = '#3e3e3e';
    this.ctx.lineWidth = 1;
    for (let x = 0; x <= this.canvas.width; x += this.gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.canvas.height);
      this.ctx.stroke();
    }
    for (let y = 0; y <= this.canvas.height; y += this.gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.canvas.width, y);
      this.ctx.stroke();
    }
  }

  update() {
    this.ctx.fillStyle = '#1a1a1e';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawGrid();

    for (let i = this.nodes.length - 1; i >= 0; i--) {
      this.nodes[i].draw(this.ctx);
      if (this.nodes[i].update()) {
        this.nodes.splice(i, 1);
        this.spawnNode();
      }
    }

    this.checkCurrents();
    this.drawUI();
  }

  checkCurrents() {
    const toRemove = [];
    for (let i = 0; i < this.nodes.length; i++) {
      for (let j = i + 1; j < this.nodes.length; j++) {
        const n1 = this.nodes[i];
        const n2 = this.nodes[j];
        if (
          n1.state === n2.state &&
          (
            (Math.abs(n1.x - n2.x) <= this.gridSize && n1.y === n2.y) || // Horizontal
            (Math.abs(n1.y - n2.y) <= this.gridSize && n1.x === n2.x)    // Vertical
          )
        ) {
          this.ctx.strokeStyle = n1.state === 0 ? '#ffa8a8' : n1.state === 1 ? '#a8a8ff' : '#a8ffe8';
          this.ctx.lineWidth = 4;
          this.ctx.beginPath();
          this.ctx.moveTo(n1.x + this.gridSize / 2, n1.y + this.gridSize / 2);
          this.ctx.lineTo(n2.x + this.gridSize / 2, n2.y + this.gridSize / 2);
          this.ctx.stroke();
          toRemove.push(i, j);
          this.score += 105 * this.cycle;
        }
      }
    }

    toRemove.sort((a, b) => b - a);
    toRemove.forEach(i => this.nodes.splice(i, 1));
    if (toRemove.length > 0) {
      this.spawnNode();
      if (this.score >= this.cycle * 1050) this.advanceCycle();
    }
  }

  advanceCycle() {
    this.cycle++;
    this.maxNodes = Math.min(this.maxNodes + 1, 12);
    this.nodes.forEach(n => (n.balance = Math.min(n.balance + 10, 100)));
    this.spawnNode();
  }

  drawUI() {
    this.ctx.fillStyle = '#00ffcc';
    this.ctx.font = '18px Arial';
    this.ctx.fillText(`Score: ${this.score}`, 10, 20);
    this.ctx.fillText(`Cycle: ${this.cycle}`, 10, 45);
  }

  handleClick(x, y) {
    for (const node of this.nodes) {
      const d = Math.sqrt(
        Math.pow(x - (node.x + this.gridSize / 2), 2) +
        Math.pow(y - (node.y + this.gridSize / 2), 2)
      );
      if (d < this.gridSize / 2) {
        node.state = (node.state + 1) % 3;
        break;
      }
    }
  }

  reset() {
    this.nodes = [];
    this.score = 0;
    this.cycle = 1;
    this.maxNodes = 5;
    this.spawnNode();
  }
}

// Example usage (for testing in Node.js)
const game = new LunarTides();
game.update();
console.log('Lunar Tides game initialized. Use a UI framework or save canvas to render.');
const fs = require('fs');
const out = fs.createWriteStream('output.png');
const stream = game.canvas.createPNGStream();
stream.pipe(out);
