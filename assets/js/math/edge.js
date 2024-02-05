class Edge {
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }

    draw(ctx, { color = "black", width = 2, dash = []} = {}) {
        ctx.setLineDash(dash);
        ctx.beginPath();
        ctx.moveTo(this.start.x, this.start.y);
        ctx.lineTo(this.end.x, this.end.y);
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.stroke();
    }

    includes(point){
        return this.start.equals(point) || this.end.equals(point);
    }

    equals(edge) {
        return this.includes(edge.start) && this.includes(edge.end);
    }

}