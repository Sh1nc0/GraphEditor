class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    draw(ctx, { color = "black", size = 12, fill = false, fillColor="white"} = {}) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, size/2, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();

        if (fill) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, size/4, 0, Math.PI * 2);
            ctx.fillStyle = fillColor;
            ctx.fill();
        }
    }

    equals(point) {
        return this.x === point.x && this.y === point.y;
    }
}