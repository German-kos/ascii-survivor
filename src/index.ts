console.log("Game starting...");
console.log("Welcome to ASCII Survivor!");

const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

// Game constants:
const GRID_WIDTH = 128; // Width of the grid in characters
const GRID_HEIGHT = 40; // Height of the grid in characters
const CELL_WIDTH = 10; // Width of each cell in pixels
const CELL_HEIGHT = 18; // Height of each cell in pixels

// Player object:
const player = {
  sprite: "@",
  initialRow: 0,
  initialCol: 0,
  currentRow: 0,
  currentCol: 0,
  standingOn: "X", // Default ground type
  facing: "down", // Default facing direction
  chunk: null,
  health: 100,
  maxHealth: 100,
  stamina: 100,
  maxStamina: 100,
  inventory: [],
  level: 1,
};

// Chunk grid, initialized with empty arrays:
const currentChunk: string[][] = [];
for (let y = 0; y < GRID_HEIGHT; y++) {
  if (y === 5) {
    currentChunk[y] = new Array(GRID_WIDTH).fill("O"); // Fill row 5 with "O" for testing "player.standingOn"
  } else {
    currentChunk[y] = new Array(GRID_WIDTH).fill("X");
  }
}

// Print the chunk:
function printChunk(chunk: string[][]) {
  // Check for null context before drawing
  if (!ctx) {
    console.error("Canvas context is null");
    return;
  }

  chunk.forEach((row, y) => {
    row.forEach((cell, x) => {
      // Draw each cell in the grid
      ctx.fillText(cell, x * CELL_WIDTH, y * CELL_HEIGHT + 50);
    });
  });
}

// Player movement:
function handlePlayerMovement(event: KeyboardEvent) {
  console.log(`Previous facing direction: ${player.facing}`);
  switch (event.key) {
    case "ArrowUp":
      currentChunk[player.currentRow][player.currentCol] = player.standingOn; // Clear previous position
      player.currentRow -= 1;
      player.standingOn = currentChunk[player.currentRow][player.currentCol]; // Update standing type
      player.facing = "up"; // Update facing direction
      currentChunk[player.currentRow][player.currentCol] = player.sprite; // Clear previous position
      // testing facing position:
      console.log(`Facing direction after move: ${player.facing}`);
      break;
    case "ArrowDown":
      currentChunk[player.currentRow][player.currentCol] = player.standingOn; // Clear previous position
      player.currentRow += 1;
      player.standingOn = currentChunk[player.currentRow][player.currentCol]; // Update standing
      player.facing = "down"; // Update facing direction
      currentChunk[player.currentRow][player.currentCol] = "@"; // Clear previous position
      // testing facing position:
      console.log(`Facing direction after move: ${player.facing}`);
      break;
    case "ArrowLeft":
      currentChunk[player.currentRow][player.currentCol] = player.standingOn; // Clear previous position
      player.currentCol -= 1;
      player.standingOn = currentChunk[player.currentRow][player.currentCol]; // Update standing type
      player.facing = "left"; // Update facing direction
      currentChunk[player.currentRow][player.currentCol] = "@"; // Clear previous position
      // testing facing position:
      console.log(`Facing direction after move: ${player.facing}`);
      break;
    case "ArrowRight":
      currentChunk[player.currentRow][player.currentCol] = player.standingOn; // Clear previous position
      player.currentCol += 1;
      player.standingOn = currentChunk[player.currentRow][player.currentCol]; // Update standing type
      player.facing = "right"; // Update facing direction
      currentChunk[player.currentRow][player.currentCol] = "@"; // Clear previous position
      // testing facing position:
      console.log(`Facing direction after move: ${player.facing}`);
      break;
    default:
      console.log(`Key pressed: ${event.key}`);
  }

  // Check for null context before drawing
  if (!ctx) {
    console.error("Canvas context is null");
    return;
  }

  // Clear the canvas and redraw the player
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  printChunk(currentChunk);
}

// Make sure the canvas isn't null
if (ctx) {
  ctx.font = "16px monospace";
  ctx.fillText("Welcome to ASCII Survivor!", 10, 30);

  currentChunk.forEach((row, y) => {
    row.forEach((cell, x) => {
      // Draw each cell in the grid
      ctx.fillText(cell, x * CELL_WIDTH, y * CELL_HEIGHT + 50);
    });
  });

  addEventListener("keydown", handlePlayerMovement);
}
