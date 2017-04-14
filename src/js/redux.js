import {createStore} from 'redux';
import React, {Component} from 'react';
import ReactDom from 'react-dom';



// //纯函数。
// //不影响外界的结果
// function addArr(arr, ele) {
//     let newArr = [...arr];
//     newArr.push(ele);
//     return newArr;
// }
// var arr = [1, 2, 3];
// var newArr = addArr(arr, 20);
// console.log(arr, newArr);



//自己写createStore函数
// const createStore = (reducer) => {
//     var state;
//     var list = [];
//     const getState = () => {
//         return state;
//     }
//     const dispatch = (action) => {
//         state = reducer(state, action);
//         list.forEach ( (fnc) => {
//             fnc();
//         })
//     }
//     const subscribe = (fnc) => {
//         list.push(fnc);
//         return (filterFnc) => {
//             list = list.filter( (fnc) => {
//                 if(fnc == filterFnc) {
//                     return false;
//                 }else {
//                     return true;
//                 }
//             } )
//         }
//     }

//     return {
//         getState,
//         dispatch,
//         subscribe
//     }
// } 













// const reducer = (state = 0, action) => {
//     switch(action.type) {
//         case "Decrease":
//             return state - 1;
//         break;
//         default: 
//             return state;
//         break;    
//     }
// }


// let action = {
//     type: "Decrease"
// }

// let store = createStore(reducer);

// store.dispatch({
//     type: "Init"
// })

// const render = () => {
//     document.body.innerHTML = store.getState();
// }


// let filter = store.subscribe( render );
// document.onclick = function () {
//     store.dispatch({
//         type: "Decrease"
//     })

//     filter( render )  //使用一次之后，取消这个函数；    
// }

// render();




//---------------------实践-------------------------------------

var createAction = ( text ) => {
    if(text == "-") {
        return {
            type: 'Decrease'
        }
    }else if(text == '+') {
        return {
            type: 'Increase'
        }
    }else{
        return {
            type: "Init"
        }
    }
}



const reducer = (state = 0, action) => {
    switch( action.type ) {
        case 'Decrease':
            return state - 1;
        case 'Increase':
            return state + 1;
        default:
            return state;        
    }
}
var store = createStore(reducer);

class App extends Component {
    render() {
        return (
            <div>
                <h1>{store.getState()}</h1>
                <button onClick={() => {
                    let action = createAction('-');
                    store.dispatch( action );        
                }}>-</button>
                <button onClick={() => {
                    let action = createAction('+');
                    store.dispatch( action );
                }}>+</button>
            </div>
        )
    }
}

const render = () => {
    ReactDom.render(
        <App/>,
        document.getElementById("wrapper")
    )
}

render();

store.subscribe( render );