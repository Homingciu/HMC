const React = require("react");
const ReactDom = require("react-dom");

/*var data = [
    "messi",
    "asdas",
    "abc",
    "hmc"
]
var App = React.createClass({
    getDefaultProps: function () {
        console.log("getDefaultProps")
        return {
            name: "hmc"
        }
    },
    getInitialState: function () {
        console.log("getInitialState")
        return {
            open: true
        }
    },
    componentWillMount: function () {
        console.log("componentWillMount")
    },
    componentDidMount: function () {
        console.log("componentDidMount")
    },
    shouldComponentUpdate: function (nextProps, nextStates) {
        
        console.log("shouldComponentUpdate")
        return true
    },
    componentDidUpdate: function () {
        console.log("componentDidUpdate")
    },
    onChangeColor: function () {
        this.setState({
            open: !this.state.open
        })
    },
    render: function () {
        console.log("render")
        var fontStyle = {
            color: "red"
        }
        if(!this.state.open) {
            fontStyle.color = "green";
        }
        var data = this.props.stars;
        return (          
            <div className="hmc" id="hhhh" style={fontStyle}>
                <h1 onClick={this.onChangeColor}>people</h1>
                <ul>
                    {
                        data.map(function (ele, index) {
                            return <li key={index + 100}>{ele}</li>;
                        })
                    }
                </ul>
            </div>
        )
    }
})

ReactDom.render(
    <App stars={data}/>,
    document.getElementById("demo")
)*/


var Mask = React.createClass({
    getDefaultProps: function () {
        return {
            style: {
                background: "#000",
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                right: 0,
                opacity: 0.5,
                display: "none"
            }
        }
    },
    render: function () {
        var style = Object.assign({}, this.props.style)
        if(this.props.openFlag) {
            style.display = "block";
        }
        return (
            <div style={style}>
                {this.props.children}
            </div>
        )
    }
})

var Info = React.createClass({
    getDefaultProps: function () {
        return {
            message: "HMC",
            style: {
                margin: "100px auto",
                textAlign: "center",
                height: "150px",
                lineHeight: "150px",
                color: "#f20",
                background: "orange"
            }
        } 
    },
    render: function () {
        return (
            <div onClick={this.props.onHandleClick} style={this.props.style}>{this.props.message}</div>
        )
    }
})


var ButtonDialog = React.createClass({
    getInitialState: function () {
        return {
            show: false
        }
    },
    onChangeState: function () {
        this.setState({
            show: !this.state.show
        })
    },
    render: function () {
        return (
            <div>
                <button onClick={this.onChangeState}>Dialog</button>
                <Mask openFlag={this.state.show}> 
                    <Info onHandleClick={this.onChangeState}></Info>
                </Mask>
            </div>   
        )    
    }
})

ReactDom.render(
    <ButtonDialog/>,
    document.getElementById("demo")
)
