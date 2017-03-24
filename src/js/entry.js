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

// -----------------------------------------------------------弹窗--------------------------
/*var Mask = React.createClass({
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
)*/


//---------------------




var PRODUCTS = [
    {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
    {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
    {category: "Sporting Goods", price: "$49.99", stocked: false, name: "Football"},
    {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
    {category: "Electronics", price: "$49.99", stocked: false, name: "Football"},
    {category: "Electronics", price: "$49.99", stocked: true, name: "Football"},
    {category: "Electronics", price: "$49.99", stocked: true, name: "Football"},
    {category: "Electronics", price: "$49.99", stocked: true, name: "Football"},
];








/*var Input = React.createClass({
    getInitialState: function () {
        return {
            value: "hmc"
        }
    },
    onHandleChange: function () {
        this.setState({
            value: this.refs.inp.value
        })
    },
    render: function () {
        return (
            <div>
                <input value={this.state.value} ref="inp" type="text" onChange={this.onHandleChange}/>
                <span>{this.state.value}</span>
            </div>
        )
    }
})*/


var SearchBar = React.createClass({
    onHandleChange: function () {
        this.props.changeFilerText(this.refs.inp.value);
    },
    render: function () {
        
        return (
            <div>
                <input ref="inp" onChange={this.onHandleChange} type="text"/>
                <br/>
                <input onClick={this.props.changeOnlyShowStocked} type="checkbox"/>
                <span>onlyShowStocked</span>
            </div>
        )
    }
})

var ProductCategoryRow = React.createClass({
    render: function () {
        return (
            <tr>
                <td>{this.props.category}</td>
            </tr>
        )
    }
})

var ProductRow = React.createClass({
    render: function () {
        return (
            <tr style={this.props.stocked ? {} : {color: "#f20"}}>
                <td>{this.props.name}</td>
                <td>{this.props.price}</td>
            </tr>
        )
    }
})


var ProductTable = React.createClass({
    componentWillMount: function () {
        this.onHandleChange();
    },
    shouldComponentUpdate: function (nextProps, nextStates) {
        this.props = nextProps;
        this.onHandleChange();
        return true;
    },
    onHandleChange: function () {
        var products = this.props.products;
        var lastCategory = "";
        var rows = [];
        var _self = this;
        products.forEach(function (ele, index) {
            if(lastCategory !== ele.category) {
                rows.push(
                    <ProductCategoryRow key={index} category={ele.category}></ProductCategoryRow>
                )
            }
            lastCategory = ele.category;
            if( !_self.props.onlyShowStocked || (_self.props.onlyShowStocked && ele.stocked) ) {
                if(ele.name.indexOf(_self.props.filerText) !== -1) {
                    rows.push(
                        <ProductRow key={index + 100} name={ele.name} price={ele.price} stocked={ele.stocked}></ProductRow>
                    )
                }
                    
            }
                
        })
        this.rows = rows;
    },
    render: function () {
        return (
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                </tr>
                </thead>
                <tbody>
                    {
                        this.rows
                    }
                </tbody>

            </table>
        )
    }   
})


var App = React.createClass({
    getInitialState: function () {
        return {
            onlyShowStocked: false,
            filerText: "",
        }
    },
    changeOnlyShowStocked: function () {
        this.setState({
            onlyShowStocked: !this.state.onlyShowStocked
        })
    },
    changeFilerText: function (text) {
        this.setState({
            filerText: text
        })
    },
    render: function () {
        return (
            <div>
                <SearchBar changeFilerText={this.changeFilerText} changeOnlyShowStocked={this.changeOnlyShowStocked}></SearchBar>
                <ProductTable filerText={this.state.filerText} onlyShowStocked={this.state.onlyShowStocked} products={this.props.products}></ProductTable>
            </div>
        )
    }
})






ReactDom.render(
    <App products={PRODUCTS}/>,
    document.getElementById("demo")
)


