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
        $(plane).css({marginLeft: 0});

        // //触发点不对，不应该由touchStart来触发
        // function updataBullet() {
        //     _selft.setState({
        //          move: true
        //     })
        //     requestAnimationFrame(updataBullet);
        // }
        // requestAnimationFrame(updataBullet);

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
        ele.style.top = ele.offsetTop + speed + "px";
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
            $("<div>").addClass("smallPlane plane").css({left: Math.floor(Math.random() * (window.innerWidth - smallWidth)) +"px"}).appendTo(enemy);
        }else if(kind > 2 && kind <= 4) {
            if(document.getElementsByClassName("middlePlane").length < 2) {
                $("<div>").addClass("middlePlane plane").css({left: Math.floor(Math.random() * (window.innerWidth - middleWidth)) +"px"}).appendTo(enemy);
            }else{
                $("<div>").addClass("smallPlane plane").css({left: Math.floor(Math.random() * (window.innerWidth - smallWidth)) +"px"}).appendTo(enemy);
            }
        }else{
            if(document.getElementsByClassName("bigPlane").length < 1) {
                $("<div>").addClass("bigPlane plane").css({left: Math.floor(Math.random() * (window.innerWidth - bigWidth)) +"px"}).appendTo(enemy);
            }else{
                 $("<div>").addClass("smallPlane plane").css({left: Math.floor(Math.random() * (window.innerWidth - smallWidth)) +"px"}).appendTo(enemy);
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
    var speed = 10;
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
            .css({left: myPlane.offsetLeft + myPlane.offsetWidth / 2 - 5, top: myPlane.offsetTop})
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

var bulletTimer = setInterval(addBullet, 200);

//------------------------------------------道具-------------------------

// setInterval(function () {
//     console.log(lastTime);
// }, 200) 

function itemMove(ele) {
    var speed = 4;
    function move() {
        ele.style.top = ele.offsetTop + speed + "px";
        if(ele.offsetTop <= window.innerHeight) {
            isCrash(ele, myPlane);
            requestAnimationFrame(move);
        }
    }
    requestAnimationFrame(move);
}



var ufo1Width = 58,
    ufo2Width = 60;
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
                    .css({left: Math.floor(Math.random() * (window.innerWidth - ufo1Width)) +"px"});
            }else{
                div
                    .addClass("boom")
                    .css({left: Math.floor(Math.random() * (window.innerWidth - ufo2Width)) +"px"})
            }        
            
            itemMove(item[item.length - 1]); 
        }
    }
    

    if(item[0].offsetTop > window.innerHeight) {
        $(item[0]).remove();
    }
       
}
setInterval(addItem, 1000)




//吃道具之后触发一个函数。
//1.使子弹变成2个
var doubleBulletTimer;
function doubleBullet() {
    //左边子弹
    $("<div>")
            .addClass("bullet doubleBullet")
            .css({left: myPlane.offsetLeft + myPlane.offsetWidth / 2 - 20, top: myPlane.offsetTop})
            .appendTo($("#bulletBox"))
    //右边子弹        
    $("<div>")
            .addClass("bullet doubleBullet")
            .css({left: myPlane.offsetLeft + myPlane.offsetWidth / 2 + 10, top: myPlane.offsetTop})
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
    doubleBulletTimer = setInterval(doubleBullet, 200);
    setTimeout(function ()  {
        clearInterval(doubleBulletTimer);
        bulletTimer = setInterval(addBullet, 200);
    }, 2000) 
}


//假如吃到了道具就触发eatBuffBullet函数；
// eatBuffBullet();

// $("<div>").appendTo($("#test"))
// $("<div>").appendTo($("#test"))


//2.增加炸弹数量
function addBoom() {
    console.log(1);
}


//用来触发炸弹
document.onclick = function () {
    //如果炸弹数＞1，就触发
    $("#enemy").empty();
}


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
                    if(oDiv.num > 1) {
                        $(oDiv).remove();
                    }
                    break;
                case "middlePlane plane": 
                    if(oDiv.num > 6) {
                        $(oDiv).remove();
                    }
                    break;
                case "bigPlane plane": 
                    if(oDiv.num > 10) {
                        $(oDiv).remove();
                    }
                    break;  
                case "item": 
                    console.log(1);
                break;                      
            }
            if(oDiv2.className == "bullet" || oDiv2.className == "bullet doubleBullet") {
                $(oDiv2).remove();
            }else if($(oDiv).hasClass("plane")  && oDiv2.className == "myPlane") {
                window.location.reload();
                // alert("game over");
            }else if($(oDiv).hasClass("item") && oDiv2.className == "myPlane") {
                // console.log(1);
                if($(oDiv).hasClass("buffBullet")) {
                    eatBuffBullet();
                }else {
                    addBoom();
                }
                $(oDiv).remove();
            }
        } 
    }
}


//背景----轮播图
function bg () {
    var $bg1 = document.getElementsByClassName('bg1')[0];
    var $bg2 = document.getElementsByClassName('bg2')[0];
    var bg1 = 0;
    var bg2 = 100;

    // $bg1.style.background = 'url(./1.png)';
    // $bg2.style.background = 'url(./2.png)';

    var time1 = setInterval(function(){
        bg1 += -0.5;
        bg2 += -0.5;

        bg1 > -100 ? $bg1.style.top = bg1 + '%' : bg1 = 100;
        bg2 > -100 ? $bg2.style.top = bg2 + '%' : bg2 = 100;

    },10);
}

bg();



            