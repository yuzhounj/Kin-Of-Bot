export class Cell {
    constructor(row, col) {
        this.row = row;
        this.col = col;
        this.x=col+0.5;
        this.y=row+0.5;
    }
    render() {
        const L = this.gamemap.L;
        const ctx = this.gamemap.ctx;
        ctx.fillStyle = "#000";
        ctx.fillRect(this.col * L, this.row * L, L, L);
    }
}