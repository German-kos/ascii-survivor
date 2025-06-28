console.log("Game starting...");

const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

// Make sure the canvas isn't null
if (ctx) {
  ctx.font = "16px monospace";
  ctx.fillText("Welcome to ASCII Survivor!", 10, 30);
}
