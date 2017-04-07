const React = require("react");
const ReactDom = require("react-dom");






//自己的飞机
var MyPlane = React.createClass({
    getDefaultProps: function () {
        return {
            style: {
                position: "absolute",
                bottom: "0px",
                left: "50%",
            }
        }
    },
    render: function () {
        return (
            <div ref="myPlane" style={this.props.style} id="myPlane" className="myPlane" onTouchStart={this.props.drag}></div>
        )
    }
})


var Score = React.createClass({
    getDefaultProps: function () {
        return {
            style: {
                position: "absolute",
                top: "25px",
                left: "50%",
                height: "30px",
                width: "250px",
                marginLeft: "-100px",
                // backgroundColor: "#999",
                fontSize: "30px",
                textAlign: "center",
                letterSpacing: '4px'
            }
        }
    },   
    render: function () {
        return (
            <div id="score" style={this.props.style}></div>
        )
    }
})

// //炸弹计数器
var Bomb = React.createClass({
    getDefaultProps: function () {
        return {
            style: {
                position: "absolute",
                bottom: "5px",
                left: "5px",
                height: "57px",
                width: "63px",
                backgroundImage: "url('./src/img/bomb.png')",
            },
            style1: {
                position: "absolute",
                bottom: "10px",
                left: "80px",
                height: "30px",
                width: "70px",
                // backgroundColor: "#999",
                fontSize: "30px",
                textAlign:'center',
                letterSpacing: '12px'
            }
        }
    },   
    render: function () {
        return (
            <div>
                <div id="bomb1" style={this.props.style}></div>
                <div id="bomb2" style={this.props.style1}></div>
            </div>
        )
    }
})

// //暂停按钮
var Pause = React.createClass({
    getInitialState: function () {
        return {
            pause: false
        }
    },
    getDefaultProps: function () {
        return {
            style: {
                height: "45px",
                width: "60px",
                backgroundImage: "url('./src/img/game_pause_nor.png')",
                position: "absolute",
                top: "20px",
                left: "20px",
                zIndex: 5
            }
        }
    },
    onPauseChange: function () {
        this.props.onPause();
        this.setState({
            pause: !this.state.pause
        })
        itemMoveSpeed = 0;
        planeMoveSpeed = 0;
        bulletMoveSpeed = 0;
        clearInterval(bgTimer);
        bullet_music.pause();
        pauseKey = true;
        clearInterval(myPlaneTimer);
        clearInterval(bigPlaneTimer);
    },
    changePause: function () {
        this.props.onPause();
        this.setState({
            pause: !this.state.pause
        })
    },
    render: function () {
        return (
            <div>
                <div id="pause" style={this.props.style} onClick={this.onPauseChange}></div>
                <Score></Score>
                <Info pauseFlag={this.state.pause} changePause={this.changePause}></Info>
                <Bomb></Bomb>
            </div>
        )
    }
});

// //暂停后的弹窗
var Info = React.createClass({
    getDefaultProps: function () {
        return {
            style: {
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translateX(-50%) translateY(-50%)',
                display: 'block',
                width: '150px',
                height: '150px',
                display: 'none',
                zIndex: 5
            },
            style1: {
                width: '150px',
                borderRadius: '35px',
                height: '30px',
                background: '#ddd',
                border:'3px solid #777',
                marginBottom: '3px',
                color: '#777',
                textAlign: 'center',
                lineHeight: '30px',
                fontWeight: 'bolder',
                fontFamily: 'arial',
                zIndex: 5
            }
        }
    },
    continue: function () {
        itemMoveSpeed = 4;
        planeMoveSpeed = 2;
        bulletMoveSpeed = 10;
        bg();
        bullet_music.play();
        this.props.changePause();
        pauseKey = false;
        requestAnimationFrame(addTime);
        myPlaneTimer = setInterval(myPlaneAnimation, 100);
        bigPlaneTimer = setInterval(bigPlaneAnimation, 100);
    },
    reStart: function () {
        window.location.reload();
    },
    render: function() {
        var style = Object.assign({}, this.props.style);
        if(this.props.pauseFlag) {
            style.display = "block";
        }else {
            style.display = "none";
        }
        return (
            <div ref="info" style={style}>
                <div style={this.props.style1} onClick={this.continue}>继续</div>
                <div style={this.props.style1} onClick={this.reStart}>重新开始</div>
                <div style={this.props.style1}>提交分数</div>
            </div>
        )
    }
})




    

var App = React.createClass({
    getInitialState: function () {
        return {
            move: false,
            pause: false
        }
    },
    //飞机的拖拽方法
    drag: function (event) {
        var _selft = this;
        var event = event || window.event;
        var plane = document.getElementById("myPlane");
        var disX = event.touches[0].clientX - plane.offsetLeft - 25,
            disY = event.touches[0].clientY - plane.offsetTop;
        
        plane.addEventListener("touchmove", move);
        plane.addEventListener("touchend", clear);
        $(plane).css({marginLeft: 0});


        function clear() {
            plane.removeEventListener("touchmove", move);
            plane.removeEventListener("touchend", clear);
        }

        function move(event) {
            plane.style.left = event.touches[0].clientX - disX + "px";
            plane.style.top = event.touches[0].clientY - disY + "px";
            if(plane.offsetLeft >= window.innerWidth - plane.offsetWidth) {
                plane.style.left = window.innerWidth - plane.offsetWidth + "px";
            }else if(plane.offsetLeft <= 0) {
                plane.style.left = 0 + "px";
            }
            
            if(plane.offsetTop >= window.innerHeight - plane.offsetHeight) {
                plane.style.top = window.innerHeight - plane.offsetHeight + "px";
            }else if(plane.offsetTop <= 0) {
                plane.style.top = 0;
            }

            event.preventDefault(); //防止屏幕滑动
        }
    },
    onPause: function () {
        this.setState({
            pause: !this.state.pause
        })
        // console.log(this.state.pause);
    },
    render: function () {
        return (
            <div>
                <Pause onPause={this.onPause}></Pause>
                <MyPlane drag={!this.state.pause ? this.drag : ""}></MyPlane>
            </div>
        )
    }
})

ReactDom.render(
    <App/>,
    document.getElementById("wrapper")
)

var scoreNum = "000000000000";
score.innerHTML = scoreNum;
var bomb2Num = "X00";
bomb2.innerHTML = bomb2Num;

//-------------------------------------------------动态操作----------------------
//预加载图片
function preloadImages(arr) {
    var newImages = [],
        loadedImages = 0;
    var postaction = function () {};    //用来给用户添加回调函数
    var arr = (typeof arr != "object") ? [arr] : arr;  //确保arr是数组；
    function imageloadpost() {
        loadedImages ++;
        if(loadedImages == arr.length) {
            postaction(newImages);
        }
    }
    var i,
        len = arr.length;
    for(i = 0; i < len; i++) {
        newImages[i] = new Image();
        newImages[i].src = arr[i];
        newImages[i].onload = function () {
            imageloadpost();
        }
        newImages[i].onerror = function () {
            imageloadpost();
        }
    }

    return {
        done: function (f) {
            postaction = f || postaction;
        }
    }
}


preloadImages([
    "./src/img/background.png",
    "./src/img/hero1.png",
    "./src/img/enemy3_n1.png",
    "./src/img/enemy2.png",
    "./src/img/enemy1.png",
    "./src/img/bullet1.png",
    "./src/img/bullet2.png",
    "./src/img/ufo1.png",
    "./src/img/ufo2.png",
    './src/img/enemy3_hit.png',
    './src/img/enemy3_down1.png',
    './src/img/enemy3_down2.png',
    './src/img/enemy3_down3.png',
    './src/img/enemy3_down4.png',
    './src/img/enemy3_down5.png',
    './src/img/enemy3_down6.png',
    './src/img/enemy2_down1.png',
    './src/img/enemy2_down2.png',
    './src/img/enemy2_down3.png',
    './src/img/enemy2_down4.png',
    './src/img/enemy1_down1.png',
    './src/img/enemy1_down2.png',
    './src/img/enemy1_down3.png',
    './src/img/enemy1_down4.png',
    './src/img/hero_blowup_n1.png',
    './src/img/hero_blowup_n2.png',
    './src/img/hero_blowup_n3.png',
    './src/img/hero_blowup_n4.png',
    './src/img/enemy3_n2.png',
    './src/img/hero2.png'
])





$("body").unbind();   //禁止微信上的事件


// 公共的计时器,把计算出来的lastTime放到全局中
var startKey = true;
var pauseKey = false;
var startTime;
var lastTime;
var count = 1;
function addTime() {
    if(startKey) {
        startTime = Date.now();
        startKey = false;
    }else{
        var endTime = Date.now();
        lastTime = endTime - startTime;
        // console.log(lastTime);
    }
    if(lastTime - (25000 * count) > 0) {
        count++;
        addItem();
    }

    if(!pauseKey) {
        // console.log(lastTime);
        requestAnimationFrame(addTime);
    }
}
requestAnimationFrame(addTime);






//-------------------------------------敌机----------------------
// 移动
var planeMoveSpeed = 2;
function planeMove(ele) {
    function move() {
        //判断有没有中子弹
        if(!(ele.num >= 0)) {
            ele.num = 0;
        }
        var $Bullet = document.getElementsByClassName("bullet"),
            len = $Bullet.length,
            i;
        var myPlane = document.getElementById("myPlane");    
        for(i = 0; i < len; i ++) {
            isCrash(ele, $Bullet[i]);
        }
        isCrash(ele, myPlane);

        //---------------------------移动------------------------------
        ele.style.top = ele.offsetTop + planeMoveSpeed + "px";
        if(ele.offsetTop <= window.innerHeight) {
            requestAnimationFrame(move);
        }
        
    }
    
    requestAnimationFrame(move);
}

//添加敌机
var smallWidth = 57, 
    middleWidth = 69,
    bigWidth = 169;
var smallHeight = 43,
    middleHeight = 99,
    bigHeight= 258;    
var enemy = document.getElementById("enemy");
var planeNumber = 1;
setInterval(function () {
    var planeArry = document.getElementsByClassName("plane");
    if(planeNumber < 5) {
        planeNumber = Math.floor(lastTime / 10000) || 1;
    }
    if(planeArry.length < planeNumber) {
        var kind = Math.ceil(Math.random() * 6);  //1~6
        if(kind <= 2) {
            $("<div>").addClass("smallPlane plane").css({left: Math.floor(Math.random() * (window.innerWidth - smallWidth)) +"px", top: -smallHeight + "px"}).appendTo(enemy);
        }else if(kind > 2 && kind <= 4) {
            if(document.getElementsByClassName("middlePlane").length < 2) {
                $("<div>").addClass("middlePlane plane").css({left: Math.floor(Math.random() * (window.innerWidth - middleWidth)) +"px", top: -middleHeight + "px"}).appendTo(enemy);
            }else{
                $("<div>").addClass("smallPlane plane").css({left: Math.floor(Math.random() * (window.innerWidth - smallWidth)) +"px", top: -smallHeight + "px"}).appendTo(enemy);
            }
        }else{
            if(document.getElementsByClassName("bigPlane").length < 1) {
                $("<div>").addClass("bigPlane plane").css({left: Math.floor(Math.random() * (window.innerWidth - bigWidth)) +"px", top: -bigHeight + "px"}).appendTo(enemy);
            }else{
                 $("<div>").addClass("smallPlane plane").css({left: Math.floor(Math.random() * (window.innerWidth - smallWidth)) +"px", top: -smallHeight + "px"}).appendTo(enemy);
            }
            
        }
        planeMove(planeArry[planeArry.length - 1])
    }

    if(planeArry[0]) {
        if(planeArry[0].offsetTop > window.innerHeight) {
            $(planeArry[0]).remove();
        }
    }
}, 1000)    //1000可以修改，改成合适的


//----------------子弹----------------------------

//使子弹移动
var bulletMoveSpeed = 10;
function bulletMove(ele) {
    // var speed = 10;
    function move() {
        ele.style.top = ele.offsetTop - bulletMoveSpeed+ "px";
        requestAnimationFrame(move);
    }
    requestAnimationFrame(move);
}

//添加子弹
var bulletHeight = 11,
    bulletWidth = 5;
var myPlane = $("#myPlane")[0];
function addBullet() {
    $("<div>")
            .addClass("bullet")
            .css({left: myPlane.offsetLeft + myPlane.offsetWidth / 2 - bulletWidth / 2, top: myPlane.offsetTop - bulletHeight})
            .appendTo($("#bulletBox"))
    var bulletArry = document.getElementsByClassName("bullet");
    bulletMove(bulletArry[bulletArry.length - 1]);     
    var i,
        len = bulletArry.length;
    for(i = 0; i < len; i++) {
        if(bulletArry[i]) {
            if(bulletArry[i].offsetTop < 0) {
                bulletArry[i].remove();
            }
        }
    }
}

var bulletTimer = setInterval(addBullet, 120);

//------------------------------------------道具-------------------------

// setInterval(function () {
//     console.log(lastTime);
// }, 200) 
var itemMoveSpeed = 4;
function itemMove(ele) {
    function move() {
        ele.style.top = ele.offsetTop + itemMoveSpeed + "px";
        if(ele.offsetTop <= window.innerHeight) {
            isCrash(ele, myPlane);
            requestAnimationFrame(move);
        }
    }
    requestAnimationFrame(move);
}



var ufo1Width = 58,
    ufo1Height = 88,
    ufo2Width = 60,
    ufo2Height = 107;
function addItem() {
    var item  = document.getElementsByClassName("item");
    if(item) {
        if(item.length < 1) {
            var div = $("<div>");
            div
                .addClass("item")
                .appendTo($("#itemBox"))

            //随机出现2种不同的道具    
            if(Math.random() * 10 > 5) {
                div
                    .addClass("buffBullet")
                    .css({left: Math.floor(Math.random() * (window.innerWidth - ufo1Width)) +"px", top: -ufo1Height + "px"});
            }else{
                div
                    .addClass("boom")
                    .css({left: Math.floor(Math.random() * (window.innerWidth - ufo2Width)) +"px", top: -ufo2Height + "px"})
            }        
            
            itemMove(item[item.length - 1]); 
        }
    }
    

    if(item[0].offsetTop > window.innerHeight) {
        $(item[0]).remove();
    }
       
}
// setInterval(addItem, 25000)




//吃道具之后触发一个函数。
//1.使子弹变成2个
var doubleBulletTimer;
function doubleBullet() {
    //左边子弹
    $("<div>")
            .addClass("bullet doubleBullet")
            .css({left: myPlane.offsetLeft + myPlane.offsetWidth / 2 - 15, top: myPlane.offsetTop})
            .appendTo($("#bulletBox"))
    //右边子弹        
    $("<div>")
            .addClass("bullet doubleBullet")
            .css({left: myPlane.offsetLeft + myPlane.offsetWidth / 2 + 15, top: myPlane.offsetTop})
            .appendTo($("#bulletBox"))        
    var bulletArry = document.getElementsByClassName("bullet");
    bulletMove(bulletArry[bulletArry.length - 2]); 
    bulletMove(bulletArry[bulletArry.length - 1]);     
    var i,
        len = bulletArry.length;
    for(i = 0; i < len; i++) {
        if(bulletArry[i]) {
            if(bulletArry[i].offsetTop < 0) {
                bulletArry[i].remove();
            }
        }
    }
    
}
function eatBuffBullet() {
    clearInterval(bulletTimer);
    doubleBulletTimer = setInterval(doubleBullet, 120);
    setTimeout(function ()  {
        clearInterval(doubleBulletTimer);
        bulletTimer = setInterval(addBullet, 120);
    }, 19000) 
}


//假如吃到了道具就触发eatBuffBullet函数；
// eatBuffBullet();

// $("<div>").appendTo($("#test"))
// $("<div>").appendTo($("#test"))


//2.增加炸弹数量
function addBoom() {
    var arr1 = bomb2Num.split("");
    arr1[2] = parseInt(arr1[2]) + 1;
        if (parseInt(arr1[2]) == 10) {
            arr1[1] = parseInt(arr1[1]) + 1;
            arr1[2] = 0;
        }
    bomb2Num = arr1.join('');
    bomb2.innerHTML = bomb2Num;
}


//用来触发炸弹
var bomb = function (e) {
    // e.stopPropagation(); //阻止冒泡
    //如果炸弹数＞1，就触发
    var arr2 = bomb2Num.split("")
    if (parseInt(arr2[2]) > 0 || parseInt(arr2[1]) > 0) {
       
        var smallPlane = document.getElementsByClassName("smallPlane");
        var middlePlane = document.getElementsByClassName("middlePlane");
        var bigPlane = document.getElementsByClassName("bigPlane");
        var i;
        for(i = 0; i < smallPlane.length; i++) {
            smallPlaneBomb(smallPlane[i]);
        }
        for(i = 0; i < middlePlane.length; i++) {
            middlePlaneBomb(middlePlane[i]);
        }
        for(i = 0; i < bigPlane.length; i++) {
            bigPlaneBomb(bigPlane[i]);
        }
        if (parseInt(arr2[2]) == 0) {
            arr2[1] = parseInt(arr2[1]) - 1;
            arr2[2] = 9;
        }
        arr2[2] = parseInt(arr2[2]) - 1;

        bomb2Num = arr2.join('');
        bomb2.innerHTML = bomb2Num;
    }
}
$("body").on("touchstart", bomb);







// //判断2个物体有没有撞到(用来判断各种碰撞，捡道具，打中飞机等)
function isCrash(oDiv, oDiv2) {
    if(oDiv && oDiv2) {
        var t1 = oDiv.offsetTop;  
        var l1 = oDiv.offsetLeft;  
        var r1 = oDiv.offsetLeft + oDiv.offsetWidth;  
        var b1 = oDiv.offsetTop + oDiv.offsetHeight;  

        var t2 = oDiv2.offsetTop;  
        var l2 = oDiv2.offsetLeft;  
        var r2 = oDiv2.offsetLeft + oDiv2.offsetWidth;  
        var b2 = oDiv2.offsetTop + oDiv2.offsetHeight;  
        if(b1<t2 || l1>r2 || t1>b2 || r1<l2){// 表示没碰上  

        }else{  
            
            
            oDiv.num ++;
            switch(oDiv.className) {
                case "smallPlane plane": 
                    if(oDiv.num >= 1) {
                        // $(oDiv).remove();
                        smallPlaneBomb(oDiv);
                    }
                    break;
                case "middlePlane plane": 
                    if(oDiv.num >= 10) {
                        middlePlaneBomb(oDiv);
                    }
                    break;
                case "bigPlane plane": 
                    if(oDiv.num == 9) {
                        $(oDiv).css({background: "url('./src/img/enemy3_hit.png')"});
                    }
                    if(oDiv.num >= 15) {
                        bigPlaneBomb(oDiv);
                    }
                    break;                  
            }
            if(oDiv2.className == "bullet" || oDiv2.className == "bullet doubleBullet") {
                $(oDiv2).remove();
            }else if($(oDiv).hasClass("plane") && !($(oDiv).hasClass("died")) && oDiv2.className == "myPlane") {
                var num = 0;
                function die() {
                    switch (num) {
                        case 0:
                            $(oDiv2).css({background: "url('./src/img/hero_blowup_n1.png')"});
                            num ++;
                            var user_music = document.getElementById("user_music");
                                user_music.play();
                            break;
                        case 1:
                            $(oDiv2).css({background: "url('./src/img/hero_blowup_n2.png')"});
                            num ++;
                            break;
                        case 2:
                            $(oDiv2).css({background: "url('./src/img/hero_blowup_n3.png')"});
                            num ++;
                            break;
                        case 3:
                            $(oDiv2).css({background: "url('./src/img/hero_blowup_n4.png')"});
                            num ++;
                            break;     
                        case 4:
                            $(oDiv2).remove();
                            clearInterval(dieTimer);
                            // alert("game over");
                            window.location.reload();
                            // alert(0);
                            break;            
                    }
                }
                var dieTimer = setInterval(die, 100); 





            }else if($(oDiv).hasClass("item") && oDiv2.className == "myPlane") {
                // console.log(1);
                if($(oDiv).hasClass("buffBullet")) {
                    var double_music = document.getElementById("double_music");
                    double_music.play();
                    eatBuffBullet();
                }else {
                    var bomb_music = document.getElementById("bomb_music");
                    bomb_music.play();
                    addBoom();
                }
                $(oDiv).remove();
            }
        } 
    }
}


//背景----轮播图
var bgTimer;
function bg () {
    var $bg1 = document.getElementsByClassName('bg1')[0];
    var $bg2 = document.getElementsByClassName('bg2')[0];
    var bg1 = 0;
    var bg2 = 100;

    // $bg1.style.background = 'url(./1.png)';
    // $bg2.style.background = 'url(./2.png)';

    bgTimer = setInterval(function(){
        bg1 += -0.5;
        bg2 += -0.5;

        bg1 > -100 ? $bg1.style.top = bg1 + '%' : bg1 = 100;
        bg2 > -100 ? $bg2.style.top = bg2 + '%' : bg2 = 100;

    },10);
}

bg();




var bullet_music = document.getElementById("bullet_music");
bullet_music.play();           



// document.addEventListener("touchmove",function(e){
//     e.preventDefault();
//     e.stopPropagation();
// },false);








//------------------敌机爆炸------------------------
function bigPlaneBomb(oDiv) {
    $(oDiv).addClass("died");
    var arr = scoreNum.split("");
    arr[arr.length - 3] = parseInt(arr[arr.length - 3]) + 1;
    arr[arr.length - 2] = parseInt(arr[arr.length - 2]) + 5;
    for (var i = arr.length; i > 0; i--) {
        if (parseInt(arr[i]) >= 10) {
            arr[i - 1] = parseInt(arr[i - 1]) + 1;
            arr[i] = parseInt(arr[i]) - 10;
        }
    }
    scoreNum = arr.join('');
    score.innerHTML = scoreNum;
    var num = 0;
    function die() {
        
        switch (num) {
            case 0:
                $(oDiv).css({background: "url('./src/img/enemy3_down1.png')"});
                num ++;
                var enemy3_music = document.getElementById("enemy3_music");
                enemy3_music.play();    
                break;
            case 1:
                $(oDiv).css({background: "url('./src/img/enemy3_down2.png')"});
                num ++;
                break;
            case 2:
                $(oDiv).css({background: "url('./src/img/enemy3_down3.png')"});
                num ++;
                break;
            case 3:
                $(oDiv).css({background: "url('./src/img/enemy3_down4.png')"});
                num ++;
                break;
            case 4:
                $(oDiv).css({background: "url('./src/img/enemy3_down5.png')"});
                num ++;
                break;
            case 5:
                $(oDiv).css({background: "url('./src/img/enemy3_down6.png')"});
                num ++;
                break;               
            case 6:
                $(oDiv).remove();
                clearInterval(dieTimer);
                break;            
        }
    }
    var dieTimer = setInterval(die, 150);
}

function middlePlaneBomb(oDiv) {
    $(oDiv).addClass("died");
    var arr = scoreNum.split("");
    arr[arr.length - 2] = parseInt(arr[arr.length - 2]) + 8;
    for (var i = arr.length; i > 0; i--) {
        if (parseInt(arr[i]) >= 10) {
            arr[i - 1] = parseInt(arr[i - 1]) + 1;
            arr[i] = parseInt(arr[i]) - 10;
        }
    }
    scoreNum = arr.join('');
    score.innerHTML = scoreNum;
    var num = 0;
    function die() {
        
        switch (num) {
            case 0:
                $(oDiv).css({background: "url('./src/img/enemy2_down1.png')"});
                num ++;
                var enemy2_music = document.getElementById("enemy2_music");
                enemy2_music.play();
                break;
            case 1:
                $(oDiv).css({background: "url('./src/img/enemy2_down2.png')"});
                num ++;
                break;
            case 2:
                $(oDiv).css({background: "url('./src/img/enemy2_down3.png')"});
                num ++;
                break;
            case 3:
                $(oDiv).css({background: "url('./src/img/enemy2_down4.png')"});
                num ++;
                break;     
            case 4:
                $(oDiv).remove();
                clearInterval(dieTimer);
                break;            
        }
    }
    var dieTimer = setInterval(die, 100);
}



function smallPlaneBomb(oDiv) {
    $(oDiv).addClass("died");
    var arr = scoreNum.split("");
    arr[arr.length - 2] = parseInt(arr[arr.length - 2]) + 1;
    for (var i = arr.length; i > 0; i--) {
        if (parseInt(arr[i]) >= 10) {
            arr[i - 1] = parseInt(arr[i - 1]) + 1;
            arr[i] = parseInt(arr[i]) - 10;
        }
    }
    scoreNum = arr.join('');
    score.innerHTML = scoreNum;
    var num = 0;
    function die() {
        
        switch (num) {
            case 0:
                $(oDiv).css({background: "url('./src/img/enemy1_down1.png')"});
                num ++;
                var enemy1_music = document.getElementById("enemy1_music");
                enemy1_music.play();
                break;
            case 1:
                $(oDiv).css({background: "url('./src/img/enemy1_down2.png')"});
                num ++;
                break;
            case 2:
                $(oDiv).css({background: "url('./src/img/enemy1_down3.png')"});
                num ++;
                break;
            case 3:
                $(oDiv).css({background: "url('./src/img/enemy1_down4.png')"});
                num ++;
                break;     
            case 4:
                $(oDiv).remove();
                clearInterval(dieTimer);
                break;            
        }
    }
    var dieTimer = setInterval(die, 100);
}









//myPlane 和 bigPlane的动画
var myPlane_1 = $("#myPlane").css("backgroundImage");
function myPlaneAnimation() {
    // console.log($("#myPlane").css("backgroundImage")  == 'url("file:///C:/Users/Administrator/Desktop/web/react/src/img/hero1.png")')
    if($("#myPlane").css("backgroundImage")  == 'url("https://homingciu.github.io/HMC/src/img/hero1.png")') {
        $("#myPlane")
                .css({background: 'url("https://homingciu.github.io/HMC/src/img/hero2.png")'})
    }else {
        $("#myPlane")
                .css({background: 'url("https://homingciu.github.io/HMC/src/img/hero1.png")'})
    }
}

var myPlaneTimer = setInterval(myPlaneAnimation, 100);




function bigPlaneAnimation() {
    if($(".bigPlane")) {
        if($(".bigPlane").css("backgroundImage")  != 'url("https://homingciu.github.io/HMC/src/img/enemy3_hit.png")' && !($(".bigPlane").hasClass("died")) ){
            if($(".bigPlane").css("backgroundImage")  == 'url("https://homingciu.github.io/HMC/src/img/enemy3_n1.png")') {
                $(".bigPlane")
                        .css({background: 'url("https://homingciu.github.io/HMC/src/img/enemy3_n2.png")'})
            }else {
                $(".bigPlane")
                        .css({background: 'url("https://homingciu.github.io/HMC/src/img/enemy3_n1.png")'})
            }
        }
        // var bigPlane_1 = $(".bigPlane").css("backgroundImage");
        // console.log(bigPlane_1);
    }
    
}

var bigPlaneTimer = setInterval(bigPlaneAnimation, 100);



// console.log(1);
// console.log($("#myPlane").css("backgroundImage"));