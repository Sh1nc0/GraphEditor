const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const p1 = new Point(100, 100);
const p2 = new Point(200, 100);
const p3 = new Point(200, 300);
const p4 = new Point(400, 400);

const e1 = new Edge(p1, p3);
const graph = new Graph([p1, p2, p3, p4], [e1]);

const viewport = new Viewport(canvas);
const graphEditor = new GraphEditor(viewport, graph);

function update() {
    //ctx.clearRect(0, 0, canvas.width, canvas.height);
    viewport.reset();
    graphEditor.display();
    requestAnimationFrame(update);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

update();