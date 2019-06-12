
(function ballGame() {
  const ws = new WebSocket('wss://fep-app.herokuapp.com/');
  const canvas = document.getElementById('canvasBall');
  const inputColor = document.getElementById('inputColor');
  const inputRangeSize = document.getElementById('inputRangeSize');
  const inputStop = document.getElementById('inputStop');
  const ctx = canvas.getContext('2d');

  let objBall = {
    speed: 1000,
    startAngle: 0,
    endAngle: Math.PI * 2,
    arcDirection: true,
    direction: 'bottom',
    defAxisX: 73,
    defAxisY: 73,
    defRadius: 30,
    defColor: 'pink',
    toogler: false
  }

  let balls = [];


  document.body.addEventListener('keydown', (e) => onDocumentKeyDown(e))
  inputColor.addEventListener('change', (e) => onInputColorClick(e))
  inputRangeSize.addEventListener('change', (e) => onInputRangeSizeClick(e))
  inputStop.addEventListener('click', (e) => onInputStop(e))


  function onInputColorClick() {
    objBall.defColor = inputColor.value;
    sendSetState(objBall.defRadius, objBall.defColor)
  }
  function onInputRangeSizeClick() {
    objBall.defRadius = +inputRangeSize.value;
    sendSetState(objBall.defRadius, objBall.defColor)
  }
  function onInputStop() {
    objBall.toogler = !objBall.toogler ;
  }

  function onDocumentKeyDown(e) {
    if (e.keyCode == 37
      || e.keyCode == 38
      || e.keyCode == 39
      || e.keyCode == 40)

      ballMove(e);

  }

  function ballMove(e) {
    if (e.keyCode == 38) {
      objBall.direction = 'top';
    } else if (e.keyCode == 39) {
      objBall.direction = 'right';
    } else if (e.keyCode == 40) {
      objBall.direction = 'bottom';
    } else if (e.keyCode == 37) {
      objBall.direction = 'left';
    }

    console.log(objBall.defAxisY, objBall.defAxisX, 'click')

  }


  function sendSetState(radius, color) {
    const data = {
      action: 'setState',
      payload: { radius, color }
    };
    ws.send(JSON.stringify(data));
  }

  function sendMovedBall(x, y) {
    const data = {
      action: 'move',
      payload: { x, y }
    }
    ws.send(JSON.stringify(data));
  }

  ws.onopen = function (e) {
    console.log('connection opened', e);
    sendSetState(objBall.defRadius, objBall.defColor);
    sendMovedBall(objBall.defAxisX, objBall.defAxisY);

    // функция передачи обьекта о том что пользователь подключен 


  }
  ws.onclose = function (e) {
    console.log('connection closed', e);
  }
  ws.onerror = function (e) {
    console.log('connection failed', e);
  }
  ws.onmessage = function (e) {
    const message = JSON.parse(e.data);
    const ball = balls.find((item) => item.ballId == message.ballId);


    if (!objBall.toogler)
    checkActionAndRenderData(message, ball);
    render();
  }

  function checkActionAndRenderData(data, ball) {
    switch (data.action) {
      case 'add': console.log('add');
        pushBall(data);
        break;
      case 'remove': console.log('remove');
        deleteBall(data);
        break;
      case 'setState': console.log('setState');
        ball.payload.color = data.payload.color;
        ball.payload.radius = data.payload.radius;; 
        break;
      case 'move': console.log('move');
        ball.payload.x = data.payload.x;
        ball.payload.y = data.payload.y;; 
        break;
    }

  }

  function pushBall({ ballId, payload }) {
    balls.push({ ballId, payload });
    console.log(balls, 'array add')
  }
  function deleteBall(data) {
    // balls.pop(data);
    balls = balls.filter((el) => el.ballId != data.ballId);
    console.log(balls, 'array del')
  }

  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    balls.forEach((user) => renderFigures(user.payload));

    switch (objBall.direction) {
      case 'right':
        objBall.defAxisX++;
        break;
      case 'bottom':
        objBall.defAxisY++;
        break;
      case 'left':
        objBall.defAxisX--;
        break;
      case 'top':
        objBall.defAxisY--;
        break;
    }
    sendMovedBall(objBall.defAxisX, objBall.defAxisY)
    console.log('tick', objBall.direction)


  }

  function renderFigures(payload) {
    ctx.beginPath();
    ctx.arc(payload.x, payload.y, payload.radius, objBall.startAngle, objBall.endAngle, objBall.arcDirection);
    ctx.fillStyle = payload.color;
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  }


})();







  // function moveBall(message, ball) { //отправка пакетов и после рендер
  //   changePositions(message, ball);
  //   console.log(message, 'moove')
  // }
  // function changeBall(message, ball) { //отправка пакетов и после рендер
  //   changeColorAndRadius(message, ball);
  //   console.log(message, 'moove')
  // }

  // function changePositions(data, ball) {   // заменить отправкой пакетов и после рендера
  //   ball.payload.x = data.payload.x;
  //   ball.payload.y = data.payload.y;
  // }
  // function changeColorAndRadius(data, ball) {   // заменить отправкой пакетов и после рендера
  //   ball.payload.color = data.payload.color;
  //   ball.payload.radius = data.payload.radius;
  // }
