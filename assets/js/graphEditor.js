class GraphEditor {
    constructor(canvas, graph = new Graph()) {
        this.canvas = canvas;
        this.graph = graph;

        this.ctx = canvas.getContext('2d');

        this.actions = [];
        this.hover = null;
        this.selected = null;
        this.mouse = null;
        this.mousePressed = false;

        this.init();
    }

    init() {
        this.canvas.addEventListener('mousedown', this.#handleMouseDown.bind(this));
        this.canvas.addEventListener('mouseup', this.#handleMouseUp.bind(this));
        this.canvas.addEventListener('click', this.#handleClick.bind(this));
        this.canvas.addEventListener('mousemove', this.#handleMove.bind(this));
        this.canvas.parentNode.addEventListener('keydown', this.#handleKey.bind(this));
    }

    #handleMouseDown() {
        this.mousePressed = this.hover ? true : false;
    }

    #handleMouseUp() {
        this.mousePressed = false;
    }

    #handleClick(e) {
        if (e.button === 0) {
            if (this.hover) {
                this.#select(this.hover);
                return;
            }
            const node = new Point(e.offsetX, e.offsetY);
            this.graph.addNode(node);
            this.#select(node);
            this.hover = null;
        }
    }

    #select(point){
        if (this.selected) {
            this.graph.addEdge(new Edge(this.selected, point));
        }
        this.selected = point;
    }

    #handleMove(e) {
        this.mouse = new Point(e.offsetX, e.offsetY);
        this.hover = getNearestPoint(this.graph.nodes, this.mouse, 10);

        if (this.mousePressed && this.selected) {
            this.selected.x = this.mouse.x;
            this.selected.y = this.mouse.y;
        }

    }

    #handleKey(e) {
        if ((e.key === "Backspace" || e.key === "Delete") && this.selected) {
            this.graph.removeNode(this.selected);
            this.hover = null;
            this.selected = null;
        }

        if (e.key === "Escape" && this.selected) {
            this.selected = null;
        }
    }

    display() {
        this.graph.draw(this.ctx);

        if (this.selected) {
            this.selected.draw(this.ctx, { fill: true, fillColor: "red"});

            if (this.mouse && !this.mousePressed) {
                const end = this.hover || this.mouse;
                new Edge(this.selected, end).draw(this.ctx, {color: "red", dash: [5, 5] });
            }
        }

        if (this.hover) {
            this.hover.draw(this.ctx, { fill: true});
        }
    }
}