# Lunar Tides

Lunar Tides is a unique JavaScript-based puzzle game where players align wave nodes to balance lunar currents. Match node states (ebb, flow, crest) in adjacent grid cells to form current chains, earning points and advancing through lunar cycles. Built with Node.js and the `canvas` library, this game is designed for developers seeking a modular, extensible project.

## Features
- **Tidal Alignment Gameplay**: Connect nodes with matching tidal states (ebb, flow, crest) horizontally or vertically to balance lunar currents.
- **Lunar Cycles**: Progress through cycles as you score, increasing node counts and balance levels.
- **Modular JavaScript**: Clean, object-oriented code for seamless integration and extension.
- **Canvas Rendering**: Server-side rendering with the `canvas` library, suitable for desktop or web applications.

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/lunar-tides.git
   ```
2. Navigate to the project directory:
   ```bash
   cd lunar-tides
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the game:
   ```bash
   npm start
   ```

## How to Play
- **Objective**: Connect adjacent nodes with the same tidal state (ebb: red, flow: blue, crest: teal) horizontally or vertically by cycling their states.
- **Scoring**: Each current chain earns 105 points multiplied by the current cycle.
- **Cycle Progression**: Reach 1050 points per cycle to advance, increasing node count and balance levels.
- **Interaction**: Use `game.handleClick(x, y)` to cycle node states (requires UI integration).
- **Reset**: Call `game.reset()` to restart the game.

## Development
- **Tech Stack**: Node.js, JavaScript, `canvas`
- **Dependencies**: `canvas` for rendering
- **Code Structure**:
  - `index.js`: Main game logic and canvas rendering.
  - `node.js`: WaveNode class for tidal entities.
  - `package.json`: Project metadata and dependencies.
- **Extending**: Integrate with a UI framework (e.g., Electron for desktop or a web server) to handle input and display the canvas.

## Notes
- The current implementation outputs a PNG snapshot (`output.png`) for testing. For interactive play, integrate with a UI framework to handle mouse clicks and real-time rendering.
- Example integration: Use Electron for a desktop app or a WebSocket server for web-based play.

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request with your changes. For major updates, open an issue first to discuss your ideas.

## Support
If you enjoy Lunar Tides and want to support its development, consider sponsoring me on [GitHub Sponsors](https://github.com/sponsors/your-username). Your support helps keep this project alive and growing!

## License
MIT License. See [LICENSE](LICENSE) for details.