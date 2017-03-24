const React = require("react");
const ReactDom = require("react-dom");

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




//自己的飞机
var MyPlane = React.createClass({
    getDefaultProps: function () {
        return {
            style: {
                height: "80px",
                width: "50px",
                backgroundColor: "red",
                position: "absolute",
                bottom: "0px",
                left: "50%",
                marginLeft: "-25px"
            }
        }
    },
    //飞机的拖拽方法
    drag: function (event) {
        var event = event || window.event;
        var plane = document.getElementById("myPlane");
        var disX = event.touches[0].clientX - plane.offsetLeft - 25,
            disY = event.touches[0].clientY - plane.offsetTop;
        
        plane.addEventListener("touchmove", move)
        plane.addEventListener("touchend", clear)

        function clear() {
            plane.removeEventListener("touchmove", move);
            plane.removeEventListener("touchend", clear);
        }

        function move(event) {
            plane.style.left = event.touches[0].clientX - disX + "px";
            plane.style.top = event.touches[0].clientY - disY + "px";
        }
    },
    render: function () {
        return (
            <div style={this.props.style} id="myPlane" onTouchStart={this.drag}></div>
        )
    }
})


//敌机,添加相应的class
var SmallPlane = React.createClass({
    getDefaultProps: function () {
        return {
            style: {
                height: "60px",
                width: "50px",
                backgroundColor: "orange",
                zIndex: 3,
                position: "absolute"
            }
        }
    },
    render: function () {
        return (
            <div style={this.props.style} className="small plane"></div>
        )
    }
})


var MiddlePlane = React.createClass({
    getDefaultProps: function () {
        return {
            style: {
                height: "80px",
                width: "60px",
                backgroundColor: "blue",
                zIndex: 2,
                position: "absolute"
            }
        }
    },
    render: function () {
        return (
            <div style={this.props.style} className="middle plane"></div>
        )
    }
})

var BigPlane = React.createClass({
    getDefaultProps: function () {
        return {
            style: {
                height: "100px",
                width: "70px",
                backgroundColor: "yellow",
                zIndex: 1,
                position: "absolute"
            }
        }
    },
    render: function () {
        return (
            <div style={this.props.style} className="Big plane"></div>
        )
    }
})

//添加敌机，将这些模块放进去,（将模块放进一个数组中）
var planeArry = [];
var planeNumber = 1;
var small = <SmallPlane></SmallPlane>,
    middle = <MiddlePlane></MiddlePlane>,
    big = <BigPlane></BigPlane>;
setInterval(function () {
    if(planeNumber < 10) {
        planeNumber = Math.floor(lastTime / 1000);
    }
    if(planeArry.length < planeNumber) {
        var kind = Math.ceil(Math.random() * 6);  //1~6
        if(kind <= 2) {
            planeArry.push(small);
            console.log("small")
        }else if(kind > 2 && kind <= 4) {
            planeArry.push(middle);
            console.log("midlle")
        }else{
            planeArry.push(big);
            console.log("big")
        }

        
        // console.log(planeArry);
    }
}, 1000)    //1000可以修改，改成合适的




//测试，后将data 改为planeArry
var data = [
    small,
    middle,
    big
]
var Enemy = React.createClass({
    render: function () {
        return (
            <div>
                {
                    data
                }
            </div>
        )
    }
})
ReactDom.render(
    <Enemy></Enemy>,
    document.getElementById("enemy")
)









// //添加完后，调用planeMove使飞机运动
// function planeMove() {

// }





//子弹,要能根据n改变子弹数，color改变颜色，speed改变速度，子弹都有一个class， "bullet"
var Bullet = React.createClass({
    getDefaultProps: function () {
        return {
            style: {
                backgroundColor: "green",
                height: "30px",
                width: "20px",
                position: "absolute"
            }
        }
    },
    render: function () {
        return (
            <div style={this.props.style} className="bullet"></div>
        )
    }
})
// //将子弹添加到飞机头部,添加完后调用bulletMove使子弹运动
// requestAnimationFrame(function () {

// })
//使子弹移动
function bulletMove(ele) {

}

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





ReactDom.render(
    <MyPlane/>,
    document.getElementById("wrapper")
)