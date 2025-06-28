console.log("Game starting...");
console.log("Welcome to ASCII Survivor!");

const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

// Player object:
const player = {
  sprite: "@",
  x: 0,
  y: 0,
  chunk: null,
  health: 100,
  maxHealth: 100,
  stamina: 100,
  maxStamina: 100,
  inventory: [],
};

// Player movement:
function handlePlayerMovement(event: KeyboardEvent) {
  switch (event.key) {
    case "ArrowUp":
      player.y -= 10;
      break;
    case "ArrowDown":
      player.y += 10;
      break;
    case "ArrowLeft":
      player.x -= 10;
      break;
    case "ArrowRight":
      player.x += 10;
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
  ctx.fillText("Welcome to ASCII Survivor!", 10, 30);
  ctx.fillText(player.sprite, player.x, player.y);
}

// Make sure the canvas isn't null
if (ctx) {
  ctx.font = "16px monospace";
  ctx.fillText("Welcome to ASCII Survivor!", 10, 30);
  ctx.fillText(player.sprite, player.x, player.y);
  addEventListener("keydown", handlePlayerMovement);
}
