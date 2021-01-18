

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
const NUM = 10;
canvas.width = 1000;
canvas.height = 600;
canvas.style.border = "3px solid black";

let pause = document.getElementById("pause");
let flag = false


pause.onclick = function(){
    flag = !flag;
    if(flag == false){
        pause.innerHTML = "pause";
        requestAnimationFrame(update); /* resumes animation if pause flag is set to false */
    }
    else{
        pause.innerHTML = "play";
    }
}



let ballArray = [];


/* initializing NUM number of ball */
for (var i = 0 ; i < NUM ; i++){
    circ = randomCircle();

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




/* function to update ball position in each frame */
/* optimized for stress test by checking only those in the same quadrant*/

function update(){

ctx.clearRect(0,0,canvas.width,canvas.height);

ballArray.forEach(function(ball){
    let quadList = [];
    draw(ball.x,ball.y,ball.r);

    ball.x = ball.x + ball.dx;
    ball.y = ball.y + ball.dy;


    /* boundary wall detection and collision */
    if (ball.x>= (canvas.width - ball.r) || ball.x <= ball.r){
        ball.dx= -1 * ball.dx; 
    }
    if(ball.y >= (canvas.height -ball.r) || ball.y<=ball.r){
        ball.dy = -1*ball.dy;
    }

    /* quadrant checking and testing only nearer balls for collision */
    quad = checkQuadrant(ball.x,ball.y);

    ballArray.forEach(function(bq){
        if(checkQuadrant(bq.x,bq.y) == quad){
        quadList.push(bq);}
        
    })



    quadList.forEach(function(newBall){
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
requestAnimationFrame(update); /*if pause flag is set to false , animation resumes */
}
}




/* function to draw a circle */
/* parameters x: x-coordinate, y: y-coordinate ,r:radius */

function draw(x,y,r){
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.arc(x,y,r,0,2 * Math.PI);
    ctx.fill();

}

/* function to randomize */
/* radius , (x,y) coordinate , and speed of balls */

function randomCircle(){
    let r = Math.ceil((Math.random()*10)+5);
    return{
        
        x:Math.floor((Math.random()*(canvas.width-2*r)+r)),
        y:Math.floor((Math.random()*(canvas.height-2*r)+r)),
        dx:Math.ceil((Math.random()*10)-5),
        dy:Math.ceil((Math.random()*10)-5),
        r:Math.ceil((Math.random()*10)+5)
       
    }
}

/* function to calculate distance between two points in cartesian plane */

function calculateDistance(x1,y1,x2,y2){
    return(Math.sqrt((x2-x1) ** 2 + (y2-y1) ** 2));
}


/* For the stress test , checking the quadrant of the ball */
function checkQuadrant(x,y){
    if(x<500){
        if(y<300){
            return 2;
        }
        else{
            return 3;
        }
    
    }
    else{
        if(y>300){
            return 1;
        }
        else{

            return 4;
        }
    }
}