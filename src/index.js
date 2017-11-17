import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import {createStore,applyMiddleware} from 'redux';
//npm install redux-thunk -save  
import thunk from 'redux-thunk' //applyMiddleware中间件，redux-thunk处理异步获取
//import './redux.js'
//import {counter,addGun,removeGun,addGunAnsyc} from './index.redux.js'
//引入了react-redux 可以简写
//import {counter} from './index.redux.js'

import combineReducers from './reducer'

import {Provider} from 'react-redux'
import registerServiceWorker from './registerServiceWorker';


//路由
import {BrowserRouter,Route,Redirect,Switch} from 'react-router-dom'
//分为登录页和主页  做权限校验
import Auth from './Auth.js'
import Dashbord from './Dashbord'

//如果不处理异步 直接const store = createStore(counter)就可以了
//这里用了combineReducer  合并了auth.redux.js index.redux.js里两个reducer
const store = createStore(combineReducers,applyMiddleware(thunk))
//用render函数包裹一下  为了store订阅的时候 重新执行render函数
// function render(){
//     ReactDOM.render(
//         <App store={store} addGun={addGun} addGunAnsyc={addGunAnsyc} removeGun={removeGun}/>, 
//         document.getElementById('root')
//     );
//     registerServiceWorker();
// }
// render()
// store.subscribe(render)


console.log(store.getState())
 ReactDOM.render(

//使用react-redux 方便了很多 Provider只在入口页面写一次 负责传入store 也不需要subscribe订阅了

        (<Provider store={store}>
            <BrowserRouter>
              <div>
                  <Switch>
                      {/*只命中匹配上的第一个route*/}
                      <Route exact path='/Auth' component={Auth}></Route>
                      <Route path='/Dashbord' component={Dashbord}></Route>                   
                      <Redirect to='/Dashbord'></Redirect>
                  </Switch>
              </div>
            </BrowserRouter>
         </Provider>),        
        document.getElementById('root')
)
 registerServiceWorker();



