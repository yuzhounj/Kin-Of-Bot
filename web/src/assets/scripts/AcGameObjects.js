const AC_GAME_OBJECTS=[];

export class AcGameObjects{
    constructor() {
        AC_GAME_OBJECTS.push(this);
        this.timeDelta = 0;
        this.hasCalledStart = false;
    }
    start() {

    }
    update() {
        console.log("update");
    }
    onDestroy() {//删除之前执行

    }
    destroy(){
        this.onDestroy();
        for(let i in AC_GAME_OBJECTS){
            if(AC_GAME_OBJECTS[i] === this){
                AC_GAME_OBJECTS.splice(i);
            }
        }
    }


}

let lastTimeStamp;//上一次时间戳
const step = timeStamp => {
    for(let i of AC_GAME_OBJECTS){
          if(!i.hasCalledStart){
                i.start();
                i.hasCalledStart = true;
          }
          else{
                i.timeDelta = timeStamp - lastTimeStamp;
                i.update();
          }

    }
    lastTimeStamp = timeStamp;
    requestAnimationFrame(step);
}
requestAnimationFrame(step);