const React = require("react");
const ReactDom = require("react-dom");

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

ReactDom.render(
    <MyPlane/>,
    document.getElementById("wrapper")
)

// //敌机,添加相应的class
// var SmallPlane = React.createClass({

// })

// var MiddlePlane = React.createClass({
    
// })

// var BigPlane = React.createClass({
    
// })

// //添加敌机，将这些模块放进去
// setInterval(function () {

// }, 1000)    //1000可以修改，改成合适的

// //添加完后，调用planeMove使飞机运动
// function planeMove() {

// }





// //子弹,要能根据n改变子弹数，color改变颜色，speed改变速度，子弹都有一个class， "bullet"
// var Bullet = React.createClass({

// })
// //将子弹添加到飞机头部,添加完后调用bulletMove使子弹运动
// requestAnimationFrame(function () {

// })
// //使子弹移动
// function bulletMove(ele) {

// }

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





// //公共的计时器,把计算出来的lastTime放到全局中
// var lastTime;
// requestAnimationFrame(function () {

// })


// //判断2个物体有没有撞到(用来判断各种碰撞，捡道具，打中飞机等)
// function isCrash(A, B) {

// }