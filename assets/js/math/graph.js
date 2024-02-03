class Graph {
    constructor(nodes = [], edges = []) {
        this.nodes = nodes;
        this.edges = edges;
    }

    containsNode(node) {
        return this.nodes.some(n => n.equals(node));
    }

    containsEdge(edge) {
        return this.edges.some(e => e.equals(edge));
    }

    addNode(node) {
        if (this.containsNode(node)) return false;
        this.nodes.push(node);
        return true;
    }

    addEdge(edge) {
        if (this.containsEdge(edge) || edge.start.equals(edge.end)) return false;
        this.edges.push(edge);
        return true;
    }

    removeNode(node) {
        this.nodes = this.nodes.filter(n => !n.equals(node));
        this.edges = this.edges.filter(e => !e.includes(node));
    }

    removeEdge(edge) {
        this.edges = this.edges.filter(e => !e.equals(edge));
    }

    draw(ctx) {
        this.nodes.forEach(node => node.draw(ctx));
        this.edges.forEach(edge => edge.draw(ctx));
    }

    dispose() {
        this.nodes = [];
        this.edges = [];
    }
}