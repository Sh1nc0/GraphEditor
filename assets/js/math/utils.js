function getNearestPoint(points, point, threshold = Number.MAX_SAFE_INTEGER) {
    let nearestPoint = null;
    let minDistance = threshold;
    points.forEach((p) => {
        const d = distance(p, point);
        if (d < minDistance && d < threshold) {
            nearestPoint = p;
            minDistance = d;
        }
    });
    return nearestPoint;
}

function distance(p1, p2) {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}