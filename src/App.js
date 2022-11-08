import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import { AuthLogin } from './Common/Auth';

import Home from './View/Home';
import Login from './View/Login';
import Empty from './View/Empty';
import About from './View/About';

import './App.scss';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/'
          exact
          render={(props) => {
            return <Redirect to='/home' {...props}></Redirect>
          }}>
        </Route>
        <Route
          path='/home'
          render={(props) => {
            // 效验当前用户是否已经登录，如果没有登录，跳转到登录页面
            if (!AuthLogin()) {
              // 跳转到登录页面，记录当前用户请求的页面，登录成功之后会跳转到用户之前要请求的页面
              return <Redirect to={`/login?preurl=${props.match.path}`}></Redirect>
            }
            return <Home {...props}></Home>
          }}>
        </Route>
        <Route
          path='/about'
          render={(props) => {
            // 效验当前用户是否已经登录，如果没有登录，跳转到登录页面
            if (!AuthLogin()) {
              // 跳转到登录页面，记录当前用户请求的页面，登录成功之后会跳转到用户之前要请求的页面
              return <Redirect to={`/login?preurl=${props.match.path}`}></Redirect>
            }
            return <About {...props}></About>
          }}>
        </Route>
        <Route path='/login' component={Login}></Route>
        <Route component={Empty}></Route>
      </Switch>
    </Router>
  );
}


export default App;
