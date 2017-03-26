const React = require("react");
const ReactDom = require("react-dom");






//自己的飞机
var MyPlane = React.createClass({
    getDefaultProps: function () {
        return {
            style: {
                height: "80px",
                width: "50px",
                backgroundColor: "green",
                position: "absolute",
                bottom: "0px",
                left: "50%",
                marginLeft: "-25px"
            }
        }
    },
    render: function () {
        return (
            <div ref="myPlane" style={this.props.style} id="myPlane" onTouchStart={this.props.drag}></div>
        )
    }
})



















// //道具的样子
// //1.加强子弹
// var BulletBuff = React.createClass({

// })

// //2.炸弹
// var AddBomb = React.createClass({

// })

// //随机把这2种道具添加到游戏中
// setInterval(function () {

// }, 1000)





// //系统
// //计分板
// var Score = React.createClass({

// })

// //炸弹计数器
// var Bomb = React.createClass({

// })

// //暂停按钮
// var Pause = React.createClass({

// })

// //暂停后的弹窗
// var Info = React.createClass({

// })












// //判断2个物体有没有撞到(用来判断各种碰撞，捡道具，打中飞机等)
// function isCrash(A, B) {

// }

    

var App = React.createClass({
    getInitialState: function () {
        return {
            move: false,
        }
    },
    //飞机的拖拽方法
    drag: function (event) {
        var _selft = this;
        // console.log(_selft);
        var event = event || window.event;
        var plane = document.getElementById("myPlane");
        var disX = event.touches[0].clientX - plane.offsetLeft - 25,
            disY = event.touches[0].clientY - plane.offsetTop;
        
        plane.addEventListener("touchmove", move);
        plane.addEventListener("touchend", clear);


        //触发点不对，不应该由touchStart来触发
        function updataBullet() {
            _selft.setState({
                 move: true
            })
            requestAnimationFrame(updataBullet);
        }
        requestAnimationFrame(updataBullet);

        function clear() {
            plane.removeEventListener("touchmove", move);
            plane.removeEventListener("touchend", clear);
        }

        function move(event) {
            plane.style.left = event.touches[0].clientX - disX + "px";
            plane.style.top = event.touches[0].clientY - disY + "px";
            event.preventDefault(); //防止屏幕滑动
        }
    },
    render: function () {
        return (
            <div>
                <MyPlane drag={this.drag}></MyPlane>
            </div>
        )
    }
})

ReactDom.render(
    <App/>,
    document.getElementById("wrapper")
)




//-------------------------------------------------动态操作----------------------

//公共的计时器,把计算出来的lastTime放到全局中
var startKey = true;
var pauseKey = false;
var startTime;
var lastTime;

function add() {
    if(startKey) {
        startTime = Date.now();
        startKey = false;
    }else{
        var endTime = Date.now();
        lastTime = endTime - startTime;
        // console.log(lastTime);
    }
    if(!pauseKey) {
        requestAnimationFrame(add);
    }
    
}
requestAnimationFrame(add);


//-------------------------------------敌机----------------------
// 移动
function planeMove(ele) {
    var speed = 2;
    function move() {
        ele.style.top = ele.offsetTop + speed + "px";
        if(ele.offsetTop <= window.innerHeight) {
            requestAnimationFrame(move);
        }
        
    }
    requestAnimationFrame(move);
}

//添加敌机
var enemy = document.getElementById("enemy");
var planeNumber = 1;
setInterval(function () {
    var planeArry = document.getElementsByClassName("plane");
    if(planeNumber < 5) {
        planeNumber = Math.floor(lastTime / 1000);
    }
    if(planeArry.length < planeNumber) {
        var kind = Math.ceil(Math.random() * 6);  //1~6
        if(kind <= 2) {
            $("<div>").addClass("smallPlane plane").css({left: Math.floor(Math.random() * (window.innerWidth - 40)) +"px"}).appendTo(enemy);
        }else if(kind > 2 && kind <= 4) {
            if(document.getElementsByClassName("middlePlane").length < 2) {
                $("<div>").addClass("middlePlane plane").css({left: Math.floor(Math.random() * (window.innerWidth - 50)) +"px"}).appendTo(enemy);
            }else{
                $("<div>").addClass("smallPlane plane").css({left: Math.floor(Math.random() * (window.innerWidth - 40)) +"px"}).appendTo(enemy);
            }
        }else{
            if(document.getElementsByClassName("bigPlane").length < 1) {
                $("<div>").addClass("bigPlane plane").css({left: Math.floor(Math.random() * (window.innerWidth - 60)) +"px"}).appendTo(enemy);
            }else{
                 $("<div>").addClass("smallPlane plane").css({left: Math.floor(Math.random() * (window.innerWidth - 40)) +"px"}).appendTo(enemy);
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
function bulletMove(ele) {
    var speed = 18;
    function move() {
        ele.style.top = ele.offsetTop - speed + "px";
        requestAnimationFrame(move);
    }
    requestAnimationFrame(move);
}

//添加子弹
var myPlane = $("#myPlane")[0];
function addBullet() {
    $("<div>")
            .addClass("bullet")
            .css({left: myPlane.offsetLeft + myPlane.offsetWidth / 2 - 5, top: myPlane.offsetTop - 20})
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

setInterval(addBullet, 200)

//------------------------------------------道具-------------------------

// setInterval(function () {
//     console.log(lastTime);
// }, 200) 

function itemMove(ele) {
    var speed = 4;
    function move() {
        ele.style.top = ele.offsetTop + speed + "px";
        if(ele.offsetTop <= window.innerHeight) {
            requestAnimationFrame(move);
        }
    }
    requestAnimationFrame(move);
}

function addItem() {
    var item  = document.getElementsByClassName("item");
    if(item) {
        if(item.length < 1) {
            $("<div>")
                    .addClass("item")
                    .css({left: Math.floor(Math.random() * (window.innerWidth - 30)) +"px"})
                    .appendTo($("#itemBox"))
            
            itemMove(item[item.length - 1]); 
        }
    }
    

    if(item[0].offsetTop > window.innerHeight) {
        $(item[0]).remove();
    }
       
}
setInterval(addItem, 1000)
