window.addEventListener('load', function(){
    // 변수를 선언합니다.
    
    let width = 1;
    let isDown = false;
    let newPoint, oldPoint;

    // 소켓을 연결합니다.
    const socket = io.connect();

    // 캔버스를 추출합니다.
    const canvas = document.querySelector('#canvas');
    const pen = document.querySelector('#pen');
    const eraser = document.querySelector('#eraser');
    const wid = document.querySelector('#wid');
    const context = canvas.getContext('2d');
    // color 
    const colors = document.querySelector('#colors');
    let color = 'black';
    // 리셋버튼 
    const reset = document.querySelector('#reset');

    

    // 마우스 이벤트를 연결합니다.
    canvas.addEventListener('mousedown', function (event) {
        isDown = true;
        const rect = canvas.getBoundingClientRect();
        oldPoint = {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    });

    canvas.addEventListener('mousemove', function(event) {
        if (!isDown) { return; }
        const rect = canvas.getBoundingClientRect();
        newPoint = {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
        socket.emit('line', {
            x1: oldPoint.x,
            y1: oldPoint.y,
            x2: newPoint.x,
            y2: newPoint.y,
            color: color,
            width: width
        });
        oldPoint = newPoint;
    });

    canvas.addEventListener('mouseup', function(event) {
        isDown = false;
        const rect = canvas.getBoundingClientRect();
        oldPoint = {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    });

    // 입력 양식 이벤트를 연결합니다.
    pen.addEventListener('click', function(event) {
        width = 1;
        color = 'black';
        wid.value=width;
    });

    eraser.addEventListener('click', function(event) {
        width = 10;
        color = 'white';
        wid.value=width;
    });

    wid.addEventListener('change', function(event){
        width=wid.value;
    })

    colors.addEventListener('change', function(event) {
        color = colors.value;
        console.log(color);
    });



    reset.addEventListener('click', function(event) {
        socket.emit('reset_canvas');
      });
      
    socket.on('reset_canvas', function() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.beginpath()
    });


    // 소켓 이벤트를 연결합니다.
    socket.on('line', function (data) {
        context.beginPath();
        context.lineWidth = data.width;
        context.strokeStyle = data.color;
        context.moveTo(data.x1, data.y1);
        context.lineTo(data.x2, data.y2);
        context.stroke();
    });


    //웹채팅 


    const user_id = document.querySelector('#massage-user')
    const input_message = this.document.querySelector('#message-input')
    const chatForm = document.querySelector('#input-box');
    const chatMessages = document.querySelector('#chat-messages');
    

    // 초기 카운트 값을 받는 이벤트 핸들러
    // socket.on('count', (count) => {
    //     console.log('Received count:', count);
    // // 이후에 count 값을 사용할 수 있음
    // });

    // 채팅 메시지 전송 이벤트 핸들러
    chatForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const message = input_message.value;
        socket.emit('chat', {
            user_id: user_id.value,
            message: message
        });
        input_message.value = '';
    });

    // 채팅 메시지와 카운트 값을 받는 이벤트 핸들러
    socket.on('chat', (data) => {
        console.log(data);
        const count = data.count;
        chatMessages.value += `[#${count}](${data.message.user_id}) ${data.message.message}\n`;
    });

});
