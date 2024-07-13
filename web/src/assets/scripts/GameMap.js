import {AcGameObjects} from "@/assets/scripts/AcGameObjects";
import {Wall} from "@/assets/scripts/Wall";
export class GameMap extends AcGameObjects{
    constructor(ctx, parent){
        super();
        this.ctx=ctx;
        this.parent=parent;
        this.L=0;

        this.rows=13;
        this.cols=13;

        this.walls=[];
        this.innerWallsCount=80;
    }
    checkConnectivity(g, sx, sy, tx, ty){
        if(sx===tx&&sy===ty){return true;}
        g[sx][sy]=true;
        let dx=[0,0,1,-1];
        let dy=[1,-1,0,0];
        for(let i=0;i<4;i++){
            let x=sx+dx[i];
            let y=sy+dy[i];
            if(x>=0&&x<this.rows&&y>=0&&y<this.cols&&!g[x][y]){
                if(this.checkConnectivity(g,x,y,tx,ty)){
                    return true;
                }
            }
        }
        return false;

    }
    creatWall() {
        const g = [];
        for (let row = 0; row < this.rows; row++) {
            g[row] = [];
            for (let col = 0; col < this.cols; col++) {
                g[row][col] = false;
            }
        }
        //给四周添上墙
        for (let i = 0; i < this.rows; i++) {
            g[i][0] = true;
            g[i][this.cols - 1] = true;
        }
        for (let i = 0; i < this.cols; i++) {
            g[0][i] = true;
            g[this.rows - 1][i] = true;
        }

        //创建随机墙
        for (let i = 0; i < this.innerWallsCount/2; i++) {
           for(let j=0;j<1000;j++) {
               let row = parseInt(Math.random() * this.rows);
               let col = parseInt(Math.random() * this.cols);
              if(g[row][col]||g[col][row]){continue;}
               //左下角和右上角不放墙
               if ((row === 1 && col === this.cols - 2) || (row === this.rows - 2 && col === 1)) {
                  continue;
               }
               g[row][col] = true;
               g[col][row] = true;
               break;

           }

        }

        const copyG=JSON.parse(JSON.stringify(g));
        if(!this.checkConnectivity(copyG,this.rows-2,1,1,this.cols-2)){
            return false;
        }

        //g赋值给walls
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                if (g[i][j]) {
                    this.walls.push(new Wall(i, j, this));
                }
            }

        }
        return true;
    }
    start() {

        for(let i=0;i<1000;i++) {
            if(this.creatWall()) {break;}
        }

    }

    updateSize(){
        this.L=parseInt(Math.min(this.parent.clientWidth/this.cols,this.parent.clientHeight/this.rows));
        this.ctx.canvas.width=this.L*this.cols;
        this.ctx.canvas.height=this.L*this.rows;
    }
    update() {
        this.updateSize();
        this.render();
    }

    render(){
        const color_even='#AAD751';
        //浅绿色
        const color_odd='#A3D977';
        for(let i=0;i<this.rows;i++){
            for(let j=0;j<this.cols;j++){
                this.ctx.fillStyle=(i+j)%2===0?color_even:color_odd;
                this.ctx.fillRect(j*this.L,i*this.L,this.L,this.L);
            }
        }
    }
}