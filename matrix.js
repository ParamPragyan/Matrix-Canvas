const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

// will create and manage individual symbols
class Symbol {
  constructor(x, y, fontSize, canvasHeight) {
    this.characters =
      "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    this.x = x;
    this.y = y;
    this.fontSize = fontSize;
    this.canvasHeight = canvasHeight;

    //the currently active symbol from         "this.characters"
    this.text = "";
  }

  // this methord will randomized the characters and dwaw in the canvas at a specific position
  draw(context) {
    this.text = this.characters.charAt(
      Math.floor(Math.random() * this.characters.length)
    );
    // context.fillStyle = '#0aff0a';
    context.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize);

    if (this.y * this.fontSize > this.canvasHeight && Math.random() > 0.95) {
      this.y = 0;
    } else {
      this.y = this.y + 1;
    }
  }
}

//will manage the entire effect( ALL THE SYMBOLS AT ONCE )
class Effect {
  constructor(canvasWidth, canvasHeight) {
    this.canvasHeight = canvasHeight;
    this.canvasWidth = canvasWidth;
    this.fontSize = 25;
    this.columns = this.canvasWidth / this.fontSize;

    //an array to contain all the symbol objects
    this.symbols = [];
    this.#initialize();
    console.log(this.symbols);
  }
  // the "#" is to make the custom methord initialize private ( privet methords can not be called directly from outside ) [oops - Abstraction]
  #initialize() {
    for (let i = 0; i < this.columns; i++) {
      this.symbols[i] = new Symbol(i, 0, this.fontSize, this.canvasHeight);
      // the new keyword will find the class of name Symbol and trigger its constructor
    }
  }
  resize(width, height) {
    this.canvasWidth = width;
    this.canvasHeight = height;
    this.columns = this.canvasWidth / this.fontSize;
    this.symbols = [];
    this.#initialize();
  }
}

const effect = new Effect(canvas.width, canvas.height);
let lastTime = 0;
const fps = 30;
const nextFrame = 1000 / fps;
let timer = 0;

// will run 60 times per second
function animate(timeStamp) {
  const deltaTime = timeStamp - lastTime;
  //assigning lastTime to new timeStamp so that it can be used in the next loop.
  lastTime = timeStamp;

  if (timer > nextFrame) {
    //Drawing a semi rectangle over the canvas for every animation frame.

    //[if you want somthing to slowly fade away onn canvas then just draw a semi transparent rectangle over it]//
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.textAlign = "center";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#0aff0a";
    ctx.fillStyle = 'yellow';

    ctx.font = effect.fontSize + "px monospace"; // monospace occupy same amount of horizontal space
    effect.symbols.forEach((symbol) => symbol.draw(ctx));
    timer = 0;
  } else {
    timer += deltaTime;
  }

  requestAnimationFrame(animate);
}
animate(0);

window.addEventListener("resize", function () {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  effect.resize(canvas.width, canvas.height);
});
