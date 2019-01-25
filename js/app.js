const flag = ["austria", "belgium", "germany", "poland", "italy", "spain", "sweden", "portugal", "greece", "uk", "slovakia", "malta", "finland", "croatia",
              "austria", "belgium", "germany", "poland", "italy", "spain", "sweden", "portugal", "greece", "uk", "slovakia", "malta", "finland", "croatia"];
const pairs = flag.length/2;
const activeFlags = [];
const startBtn = document.querySelector(".start-btn");
const board = document.querySelector(".board");

let activeFlag = "";
let result = 0;
let moves = 0;
let time = -1;

flag.forEach(function () {
    const el = document.createElement("div");
    board.appendChild(el);
});

let divs = document.querySelectorAll('.board>div');
divs = [...divs];

const startGame = () => {

    divs.forEach(el => {
        const randomDiv = Math.floor(Math.random()* flag.length);
        el.classList.add("card");
        el.classList.add(flag[randomDiv]);
        flag.splice(randomDiv, 1);
    });

    setTimeout(function() {
        divs.forEach(el => {
            el.classList.add("cover");
            el.addEventListener("click", onClick);
        })
    }, 2000);

    const timer = setInterval(function(){
        time++;
        document.querySelector('.timer>p').innerHTML = "Time: " + time;

    }, 1000);

    const onClick = function() {

        activeFlag = this;
        if (activeFlag === activeFlags[0]) return;

        activeFlag.classList.remove("cover");

        if (activeFlags.length === 0) {
            activeFlags[0] = activeFlag;
            return;

        } else {

            divs.forEach(el => el.removeEventListener("click", onClick));
            activeFlags[1] = activeFlag;

            setTimeout(function () {

                if(activeFlags[0].className === activeFlags[1].className) {
                    activeFlags.forEach(el => el.classList.add("off"));
                    result++;
                    moves++;
                    document.querySelector('.moves>p').innerHTML = "Moves: " + moves;
                    divs = divs.filter(el => !el.classList.contains("off"));

                    if(result === pairs) {

                        clearInterval(timer);

                        const end = document.querySelector(".board>p");
                        end.innerHTML = "Your moves: " + moves + "<br/>" + " Your time: " + time + "s";

                        setTimeout(function () {
                            location.reload()
                        }, 5000);
                    }
                }
                else {
                    moves++;
                    document.querySelector('.moves>p').innerHTML = "Moves: " + moves;
                    activeFlags.forEach(el => el.classList.add("cover"));
                }

                activeFlag = "";
                activeFlags.length = [];
                divs.forEach(el => el.addEventListener("click", onClick))

            }, 400)
        }
    };
};

startBtn.addEventListener('click', startGame);

