import {AcGameObjects} from "@/assets/scripts/AcGameObjects";
import {Cell} from "@/assets/scripts/Cell";

export class Snake extends AcGameObjects {
    constructor(info, gamemap) {
        super();

        this.id = info.id;
        this.color = info.color;
        this.gamemap = gamemap;

        this.cells = [new Cell(info.row, info.col)];//snake的身体

        this.speed = 5;
        this.direction = -1;//-1没有指令 0 1 2 3 上右下左
        this.status = "idle";//idle表示空闲状态，move表示移动状态， die表示死亡状态
        this.nextCell = null;//下一个destination

        this.dr = [-1, 0, 1, 0];
        this.dc = [0, 1, 0, -1];

        this.step = 0;//表示回合数
        this.epsilon = 1e-2;
    }

    start() {

    }

    checkTailIncrease() {
        return this.step % 3 === 1;

    }

    nextStep() {//将蛇的状态变为走下一步
        const d = this.direction;
        this.nextCell = new Cell(this.cells[0].row + this.dr[d], this.cells[0].col + this.dc[d]);
        this.direction = -1;
        this.status = "move";
        this.step++;

        const len = this.cells.length;
        for (let i = len; i > 0; i--) {
            this.cells[i] = JSON.parse(JSON.stringify(this.cells[i - 1]));
        }

        if(!this.gamemap.checkValid(this.nextCell)){
            this.status="die";
        }
    }

    setDirection(d) {
        this.direction = d;
    }

    updateMove() {
        const dx = this.nextCell.x - this.cells[0].x;
        const dy = this.nextCell.y - this.cells[0].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < this.epsilon) {
            this.cells[0] = this.nextCell;
            this.nextCell = null;
            this.status = "idle";
            if (!this.checkTailIncrease()) {
                this.cells.pop();
            }
        } else {
            const moveDistance = this.speed * this.timeDelta / 1000;
            this.cells[0].x += dx / distance * moveDistance;
            this.cells[0].y += dy / distance * moveDistance;
            if (!this.checkTailIncrease()) {
                const k = this.cells.length;
                const tail = this.cells[k - 1], targetTail = this.cells[k - 2];
                const dx = targetTail.x - tail.x;
                const dy = targetTail.y - tail.y;
                tail.x += moveDistance * dx / distance;
                tail.y += moveDistance * dy / distance;
            }
        }


    }

    update() {
        if (this.status === "move") {
            this.updateMove();
        }
        this.render();
    }

    render() {
        const L = this.gamemap.L;
        const ctx = this.gamemap.ctx;
        ctx.fillStyle = this.color;
        if(this.status==="die"){
            ctx.fillStyle="white";
        }
        //画圆
        for (let i = 0; i < this.cells.length; i++) {
            ctx.beginPath();
            ctx.arc(this.cells[i].x * L, this.cells[i].y * L, L / 2, 0, 2 * Math.PI);
            ctx.fill();
        }
    }
}