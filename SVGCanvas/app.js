(function ballGame() {
    const canvas = document.getElementById('canvasBall');
    const inputColor = document.getElementById('inputColor');
    const inputRangeSize = document.getElementById('inputRangeSize');
    const inputRangeSpeed = document.getElementById('inputRangeSpeed');
    const inputChangeFigure = document.getElementById('inputChangeFigure');
    const ctx = canvas.getContext('2d');
    const figure = {
        axisX: 60,
        axisY: 60,
        radius: 30,
        startAngle: 0,
        endAngle: Math.PI * 2,
        arcDirection: true,
        color: "blue",
        direction: "bottom",
        speed: 1
  
    };


    function init() {
        animate();

        inputColor.addEventListener('input', changeBallColor.bind(this), false);
        inputRangeSize.addEventListener('input', changeBallSize.bind(this), false);
        inputRangeSpeed.addEventListener('input', changeBallSpeed.bind(this), false);
        inputChangeFigure.addEventListener('click', changeFigure.bind(this),false);
        document.body.addEventListener('keydown', onBodyKeyClick.bind(this));
    }

    function changeBallColor(e) {
        figure.color = e.target.value;
    }

    function changeBallSize(e) {
        figure.radius = +e.target.value;
    }

    function changeBallSpeed(e) {
        figure.speed = e.target.value;
    }

    function onBodyKeyClick(e) {
        if (e.keyCode == 38) {
            figure.direction = 'top';
        } else if (e.keyCode == 39) {
            figure.direction = 'right';
        } else if (e.keyCode == 40) {
            figure.direction = 'bottom';
        } else if (e.keyCode == 37) {
            figure.direction = 'left';
        }
    }
    function getRandomSettings(min, max) {
        let rand = min + Math.random() * (max - min)
        rand = Math.round(rand);

        changeFigureSettings(rand);

    }

    function changeFigureSettings(rand) {
        figure.startAngle = rand;
        figure.arcDirection = !figure.arcDirection;
    }

    function changeFigure() {
        getRandomSettings(1, 10)

        // console.log('rand', rand)
    }

    function animate() {
        setTimeout(getStart, figure.speed);
    }

    function getStart() {
        render();
        animate();
    }

    function render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        renderFigure();
        checkBorders();
        moveFigure();
    }

    function renderFigure() {
        ctx.beginPath();
        ctx.arc(figure.axisX, figure.axisY, figure.radius, figure.startAngle, figure.endAngle, figure.arcDirection);
        ctx.fillStyle = figure.color;
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }

    function checkBorders() {
        // console.log(figure.direction, 'start');

        if (figure.radius + figure.axisX >= canvas.width) {
            figure.direction = "left";

        } else if (figure.axisX - figure.radius <= 0) {
            figure.direction = "right";

        } else if (figure.axisY + figure.radius >= canvas.height) {
            figure.direction = 'top';

        } else if (figure.axisY - figure.radius <= 0) {  //почему работает не правильно с else
            figure.direction = 'bottom';
        }

    }


    function moveFigure() {
        switch (figure.direction) {
            case 'right':
                figure.axisX++;
                break;
            case 'left':
                figure.axisX--;
                break;
            case 'bottom':
                figure.axisY++;
                break;
            case 'top':
                figure.axisY--;
                break;
        }
        // console.log(figure.direction, 'move');
    }


    init()

})();