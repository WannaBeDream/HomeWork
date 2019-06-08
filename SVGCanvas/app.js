(function ballGame() {
    const canvasBall = document.getElementById('canvasBall');
    const inputColor = document.getElementById('inputColor');
    const inputRange = document.getElementById('inputRange');
    const ctx = canvasBall.getContext('2d');
    const ball = {
        color: "blue",
        radius: 30,
        axisX: 30,
        axisY: 30,
        direction: "bottom"
    };


    document.body.addEventListener('keydown', onBodyKeyDown.bind(this))


    function onBodyKeyDown(e) {
        if (e.keyCode == 38) {
            ball.direction = 'top';
        } else if (e.keyCode == 39) {
            ball.direction = 'right';
        } else if (e.keyCode == 40) {
            ball.direction = 'bottom';
        } else if (e.keyCode == 37) {
            ball.direction = 'left';
        }
    }

    function init() {
        animate();
    }

    function animate() {
        setTimeout(getStart, 1);
    }
    function render() {
        ctx.clearRect(0, 0, canvasBall.width, canvasBall.height);
        renderBall();
        checkBorders();
        moveBall();
    }

    function renderBall() {
        ctx.beginPath();
        ctx.arc(ball.axisX, ball.axisY, ball.radius, 0, Math.PI * 2, true);
        ctx.fillStyle = ball.color;
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }

    function checkBorders() {
        console.log(ball.direction, 'start');

        if (ball.radius + ball.axisX >= canvasBall.width) {
            ball.direction = "left";

        } else if (ball.axisX - ball.radius <= 0) {
            ball.direction = "right";

        } else if (ball.axisY + ball.radius >= canvasBall.height) {
            ball.direction = 'top';

        } else if (ball.axisY - ball.radius <= 0) {  //почему работает не правильно с else
            ball.direction = 'bottom';
        }

    }

    function getStart() {
        render();
        animate();
    }

    function moveBall() {
        switch (ball.direction) {
            case 'right':
                ball.axisX++;
                break;
            case 'left':
                ball.axisX--;
                break;
            case 'bottom':
                ball.axisY++;
                break;
            case 'top':
                ball.axisY--;
                break;
        }
        console.log(ball.direction, 'move');
    }

    init()
})();