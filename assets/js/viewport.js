class Viewport {
    constructor(canvas){
        this.canvas = canvas;
        this.context = canvas.getContext("2d");

        this.zoom = 1;
        this.#addEventListeners();
    }

    reset(){
        this.context.restore();
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.save();
        this.context.scale(1/this.zoom, 1/this.zoom);

        this.context.beginPath();
        this.context.strokeStyle = "#ccc";
        this.context.lineWidth = 0.5;
        this.context.setLineDash([]);

        const gridSize = 20;

        for (let x = 0; x <= this.canvas.width * this.zoom; x += gridSize) {
            this.context.moveTo(x, 0);
            this.context.lineTo(x, this.canvas.height * this.zoom);
        }

        for (let y = 0; y <= this.canvas.height * this.zoom; y += gridSize) {
            this.context.moveTo(0, y);
            this.context.lineTo(this.canvas.width * this.zoom, y);
        }

        this.context.stroke();

    }

    #addEventListeners(){
        this.canvas.addEventListener("wheel", this.#handleWheel.bind(this));
    }

    #handleWheel(e){
        e.preventDefault();
        const delta = e.deltaY / 1000;
        const sign = Math.sign(delta);
        this.zoom += delta;
    }
}