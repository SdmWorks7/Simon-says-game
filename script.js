let game = [];
let user = [];

let box = ["one", "two", "three", "four"];

let started = false;
let reverse = false;
let level = 0;
let max = 0;

let h2 = document.querySelector('h2');

maxScore();

document.addEventListener("keydown", function(event){
    if(event.code==="Space"){
        if(!started){
        started = true;
        levelUp();
    }
    }
})

document.querySelector(".Reverse").addEventListener("click", function(){
    reverse = true;
    document.querySelector(".Reverse").classList.add("Reverse-clicked");

})

function btnFlash(btn){
    btn.classList.add("blank");
    setTimeout(function(){
        btn.classList.remove("blank");
    }, 50)
}

function levelUp(){
    user=[];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = box[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    game.push(randColor);
    btnFlash(randBtn);
    maxScore();
}

function checkAns(idx){
    if(game[idx]===user[idx]&& !(reverse)){
       if(game.length == user.length)
        setTimeout(levelUp, 800);
    }
    else if(reverse && game[game.length - idx - 1]===user[idx]){
        if(game.length == user.length)
        setTimeout(levelUp, 800);
    }
    else{
        h2.innerText = `Game Over! YOUR SCORE: ${level}
         Press Space to restart!`;
        document.querySelector("body").classList.add("wrong");
        setTimeout(()=>document.querySelector("body").classList.remove("wrong"),300)
        reset();
        if(reverse){
            document.querySelector(".Reverse").classList.remove("Reverse-clicked");
            reverse = false;
        }
    }
        
    
}

function btnPress(){
    let btn = this;
    btnFlash(btn);

    let userClr = btn.getAttribute("id");
    user.push(userClr);

    checkAns(user.length-1);

}

function resetBtn(){
    started = false;
    level = 0;
    user = [];
    game = [];
    h2.innerText = `Press Space to Start the Game Again`;
}

function reset(){
    started = false;
    level = 0;
    user = [];
    game = [];
}

function maxScore(){
    if(max<level){
        max = level;
    }
    document.querySelector(".maxScore").innerText=`HIGHEST SCORE: ${max}`;
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click", btnPress);
}
