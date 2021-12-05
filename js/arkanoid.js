var Hball = 150;
var Lball = 0;
var ball;
var d = 1;
var c = 1;
var pad;
var Lpad = 0;
var begin;
var val;
var x;
var k = 0;
var outDiv = document.getElementById("out");
var clickarr = [];
var points = 0;
var lives = 5;
var count = 0;
var ext;
var abc;

function move() {
    if (count == 0) {
        begin = setInterval(ballmove, 50);
    }
    if (k == 1) {
        abc += 10;
        document.getElementById("power").style.marginTop = abc + "px"
    }
}

function power() {
    let last = clickarr[clickarr.length - 1];
    let le = document.getElementById("block" + last).offsetLeft;
    let p = document.createElement("div")
    p.setAttribute("style", "width:70px;height:15px;background:red");
    p.setAttribute("id", "power");
    k = 1;
}

function ballmove() {
    count = 1;
    if (points == 70 || points == 120 || points == 180) {
        ext = setInterval(power, 100);

    }
    let scores = document.getElementById("score");


    scores.innerHTML = `<div style="margin-top: 40px"><span>SCORE:&nbsp</span><span id="points">${points}</span></div>`
        + `<div style="margin-top: 40px"><span>LIVES:&nbsp</span><span id="lives">${lives}</span></div>`

    ball = document.getElementById("ball");

    val = Lpad - 20;
    if (Hball <= 0) {
        d = 1;
    }
    if (Lball >= 970) {
        c = 2;
    }
    if (Lball <= 0) {
        c = 1;

    }
    if (((val - 20 <= Lball && (val + 150) >= Lball) && (Hball >= 470 && Hball <= 485))) {
        d = 2;
    }


    if (c == 1) {
        Lball += 10;
    } else if (c == 2) {
        Lball -= 10;
    }
    if (d == 1) {
        Hball += 10;
    } else if (d == 2) {
        Hball -= 10;
    }
    if (Hball >= 570) {
        Hball = 150;
        Lball = Math.round(Math.random() * 900);
        d = 1;
        c = 1;
        lives -= 1;
    }


    ball.style.top = Hball + "px";
    ball.style.left = Lball + "px";


    if (clickarr.length == 48 || lives == 0) {
        clearInterval(begin);
        if (lives == 0) {
            alert("GAME OVER");
        } else {
            alert("U won");
        }
    }

    for (i = 1; i < 49; i++) {
        let cblock = document.getElementById("block" + i);
        let ballleft = ball.offsetLeft;
        let balltop = ball.offsetTop;
        let cleft = cblock.offsetLeft;
        let ctop = cblock.offsetTop;
        if (clickarr.indexOf(i) == -1) {
            if (ballleft >= cleft - 10 && ballleft <= (90 + cleft)) {
                if (balltop + 10 >= ctop && balltop + 10 <= (10 + ctop)) {
                    clickarr.push(i);
                    points += 10;
                    cblock.style.background = "transparent"

                    if (d == 2) {
                        d = 1;
                    } else {
                        d = 2;
                    }

                }
            }
        }

    }
}

function pad1() {
    pad = document.getElementById("pad");
    console.log(event.keyCode);
    if (event.keyCode == 39 || event.keyCode == 68) {
        if (Lpad <= 880) {
            Lpad += 20
        }
    }
    if (event.keyCode == 37 || event.keyCode == 65) {
        if (Lpad >= 0) {
            Lpad -= 20
        }
    }
    if (event.keyCode == 32) {
        move();
    }

    if (Lpad >= 0 && Lpad <= 880) {
        pad.style.left = Lpad + "px";
    }
}

createBlock();

function createBlock() {
    let colors = ["red", "lime ", "magenta ",]
    for (i = 1, j = 0; i < 49; i++, j++) {
        if (j == 3) {
            j = 0;
        }

        x = document.createElement("div")
        x.setAttribute("style", "background:" + colors[j]);
        x.setAttribute("id", "block" + i);
        x.setAttribute("class", "block");
        outDiv.appendChild(x);

    }
}

function resets(a) {
    if (a == 1) {
        clickarr = [];
        let colors = ["RoyalBlue", "RebeccaPurple ", "PeachPuff ",]
        for (i = 1, j = 0; i < 49; i++, j++) {
            if (j == 3) {
                j = 0;
            }
            document.getElementById("block" + i).style.background = colors[j];

        }
        points = 0;
        lives = 5;
        Hball = 150;
        Lball = Math.round(Math.random() * 900);
    }
    if (a == 1 || a == 0) {
        count = 0;
        clearInterval(begin)
    }
}

