const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;




// will create and manage individual symbols
class Symbol {
    constructor(x, y, fontSize, canvasHeight) {
        this.characters = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        this.x = x;
        this.y = y;
        this.fontSize = fontSize;
        this.canvasHeight = canvasHeight;

        //the currently active symbol from         "this.characters"
        this.text = '';



    }

    // this methord will randomized the characters and dwaw in the canvas at a specific position
    draw(context) {
        this.text = this.characters.charAt(Math.floor(Math.random()*this.characters.length));
        context.fillStyle = '#0aff0a';
        context.fillText(this.text, this.x*this.fontSize, this.y*this.fontSize);

        if(this.y*this.fontSize > this.canvasHeight){
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
        this.columns = this.canvasWidth/this.fontSize;

        //an array to contain all the symbol objects
        this.symbols = []
        this.#initialize();
        console.log(this.symbols)

    }
    // the "#" is to make the custom methord initialize private ( privet methords can not be called directly from outside ) [oops - Abstraction]
    #initialize() {
        for(let i = 0; i < this.columns; i++) {
            this.symbols[i] = new Symbol(i, 0, this.fontSize, this.canvasHeight);
            // the new keyword will find the class of name Symbol and trigger its constructor 
        }
    }
}

const effect = new Effect(canvas.width, canvas.height);

// will run 60 times per second
function animate(){
   ctx.font = effect.fontSize + 'px monospace';// monospace occupy same amount of horizontal space
   effect.symbols.forEach(symbol => symbol.draw(ctx));
   requestAnimationFrame(animate);
}
animate();