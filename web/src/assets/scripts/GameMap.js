import {AcGameObjects} from "@/assets/scripts/AcGameObjects";
import {Wall} from "@/assets/scripts/Wall";
import {Snake} from "@/assets/scripts/Snake";

export class GameMap extends AcGameObjects {
    constructor(ctx, parent,store) {
        super();
        this.ctx = ctx;
        this.parent = parent;
        this.store=store;
        this.L = 0;

        this.rows = 13;
        this.cols = 14;

        this.walls = [];
        this.innerWallsCount = 30;

        this.snakes = [
            new Snake({id: 0, color: "#FF0000", row: this.rows - 2, col: 1}, this),
            new Snake({id: 1, color: "#0000FF", row: 1, col: this.cols - 2}, this)
        ];
    }

    addListeningEvents() {
        this.ctx.canvas.focus();
        this.ctx.canvas.addEventListener("keydown", e => {
            let d=-1;
            if (e.key === "w") {
                d=0;
            } else if (e.key === "d") {
               d=1;
            } else if (e.key === "s") {
               d=2;
            } else if (e.key === "a") {
                d=3;
            }

            if(d>=0){
                this.store.state.pk.socket.send(JSON.stringify({
                    event: "move",
                    direction: d,
                }))
            }
        });
    }



    creatWall() {

        const g=this.store.state.pk.gameMap;
        //g赋值给walls
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                if (g[i][j]) {
                    this.walls.push(new Wall(i, j, this));
                }
            }

        }
    }

    checkSnakeReady() {//判断蛇是否准备好
        for (let snake of this.snakes) {
            if (snake.status !== "idle") {
                return false;
            }
            if (snake.direction === -1) {
                return false;
            }
        }
        return true;

    }

    checkValid(cell){
        for( const wall of this.walls){
            if(wall.row===cell.row&&wall.col===cell.col){
                return false;
            }
        }

        for(const snake of this.snakes){
            let k=snake.cells.length;
            for(let i=0;i<k;i++){
                if(snake.cells[i].row===cell.row&&snake.cells[i].col===cell.col){
                    return false;
                }
            }
        }
        return true;
    }

    start() {

        this.creatWall();
        this.addListeningEvents();

    }

    updateSize() {
        this.L = parseInt(Math.min(this.parent.clientWidth / this.cols, this.parent.clientHeight / this.rows));
        this.ctx.canvas.width = this.L * this.cols;
        this.ctx.canvas.height = this.L * this.rows;
    }

    update() {
        this.updateSize();
        if (this.checkSnakeReady()) {
            for (let snake of this.snakes) {
                snake.nextStep();
            }
        }
        this.render();
    }

    render() {
        const color_even = '#AAD751';
        //浅绿色
        const color_odd = '#A3D977';
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.ctx.fillStyle = (i + j) % 2 === 0 ? color_even : color_odd;
                this.ctx.fillRect(j * this.L, i * this.L, this.L, this.L);
            }
        }
    }
}