class GraphEditor {
    constructor(viewport, graph = new Graph()) {
        this.viewport = viewport;
        this.canvas = viewport.canvas;

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
        if (this.hover && !this.selected){
            this.selected = this.hover;
            this.mousePressed = true;
        }
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
            const node = new Point(e.offsetX  * this.viewport.zoom, e.offsetY * this.viewport.zoom);
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
        this.mouse = new Point(e.offsetX * this.viewport.zoom, e.offsetY * this.viewport.zoom);
        this.hover = getNearestPoint(this.graph.nodes, this.mouse, 10);

        if (this.mousePressed) {

            const x = Math.round((this.mouse.x) / 20) * 20;
            const y = Math.round(this.mouse.y / 20) * 20;

            this.selected.x = x;
            this.selected.y = y;
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