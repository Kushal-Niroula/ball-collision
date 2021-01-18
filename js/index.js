

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
const NUM = 10;
canvas.width = 1000;
canvas.height = 600;
canvas.style.border ="3px solid black";
let reset = document.getElementById("reset");
let pause = document.getElementById("pause");
let flag =false

pause.onclick= function(){
    flag = !flag;
    if(flag == false){
        pause.innerHTML = "pause";
        requestAnimationFrame(update);
    }
    else{
        pause.innerHTML = "play";
    }
}



let ballArray = []

for (var i = 0 ; i < NUM ; i++){
    circ= randomCircle();

    circ.dx = circ.dx == 0 ? 1: circ.dx;
    circ.dy = circ.dy == 0 ? 1: circ.dy;
    ballArray.push({
        x:circ.x,
        y:circ.y,
        r:circ.r,
        dx:circ.dx,
        dy:circ.dy

    });
}

update();

function update(){

ctx.clearRect(0,0,canvas.width,canvas.height);

ballArray.forEach(function(ball){
    draw(ball.x,ball.y,ball.r);

    ball.x = ball.x+ball.dx;
    ball.y= ball.y+ball.dy;

    if (ball.x>=(canvas.width-ball.r) || ball.x<=ball.r){
        ball.dx= -1 * ball.dx; 
    }
    if(ball.y >= (canvas.height -ball.r) || ball.y<=ball.r){
        ball.dy = -1*ball.dy;
    }

    ballArray.forEach(function(newBall){
        let d = calculateDistance(ball.x,ball.y,newBall.x,newBall.y);
        if(d<=(ball.r + newBall.r) && d != 0 ){
            ball.dx= -ball.dx;
            ball.dy = -ball.dy;
            newBall.dx = -newBall.dx;
            newBall.dy = -newBall.dy;
        }
    })



});
if(flag == false){
requestAnimationFrame(update);
}
}




function draw(x,y,r){
    ctx.fillStyle="blue";
    ctx.beginPath();
    ctx.arc(x,y,r,0,2*Math.PI);
    ctx.fill();

}
function randomCircle(){
    let r= Math.ceil((Math.random()*10)+5);
    return{
        
        x:Math.floor((Math.random()*(canvas.width-2*r)+r)),
        y:Math.floor((Math.random()*(canvas.height-2*r)+r)),
        dx:Math.ceil((Math.random()*10)-5),
        dy:Math.ceil((Math.random()*10)-5),
        r:Math.ceil((Math.random()*10)+5)
       
    }
}

function calculateDistance(x1,y1,x2,y2){
    return(Math.sqrt((x2-x1) ** 2 + (y2-y1) ** 2));
}
