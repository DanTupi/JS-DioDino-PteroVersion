const ptero = document.querySelector('.ptero');
const background = document.querySelector('.background');
const dino = document.querySelector('.dino');

let isDiving= false;
let isGameOver = false;
let position = 400;

function handleKeyDown(event){
    if (event.keyCode === 32){
        if(!isDiving){
            dive();
        }
    }
}
function dive() {
    isDiving = true;

    let upInterval = setInterval(() => {
        if (position <= 20) {
            clearInterval(upInterval);

            let downInterval = setInterval(() => {
                if(position >= 320) { 
                    clearInterval(downInterval);
                    isDiving = false;
                } else {
                    position += 20;
                    ptero.style.bottom = position + 'px';
                }
            }, 20);
        } else {
            position -= 20;
            ptero.style.bottom = position + 'px';
        }
    }, 20);
}


function createCloud() { 
    const cloud = document.createElement('div');
    let cloudPosition = 1000;
    let randomTime = Math.random() * 6000;

    if (isGameOver) return;

    cloud.classList.add('cloud');
    background.appendChild(cloud);
    cloud.style.left = cloudPosition + 'px';

    let leftTimer = setInterval(() => {
        if (cloudPosition < -60) { 
            clearInterval(leftTimer);
            background.removeChild(cloud);
        } else if (cloudPosition > 0 && cloudPosition < 100 && position > 320) {
            clearInterval(leftTimer);
            isGameOver = true;
            document.body.innerHTML = '<h1 class = "game-over">Game Over</h1>';
        }else { 
            cloudPosition -= 10;
            cloud.style.left = cloudPosition + 'px';
        }
    }, 20);

    setTimeout(createCloud, randomTime);
}

function createDino() { 
    const dino = document.createElement('div');
    let dinoPosition = 1000;
    let randomTime = Math.random() * 8000;

    if (isGameOver) return;

    dino.classList.add('dino');
    background.appendChild(dino);
    dino.style.left = dinoPosition + 'px';

    let leftTimer = setInterval(() => {
        if (dinoPosition < -60) { 
            clearInterval(leftTimer);
            background.removeChild(dino);
        } else if (dinoPosition > 0 && dinoPosition < 90 && position <100) {
            clearInterval(leftTimer);
            isGameOver = true;
            document.body.innerHTML = '<h1 class = "game-over">Game Over</h1>';
        }else { 
            dinoPosition -= 10;
            dino.style.left = dinoPosition + 'px';
        }
    }, 20);

    setTimeout(createDino, randomTime);
}




createCloud();
createDino();
document.addEventListener('keydown', handleKeyDown);