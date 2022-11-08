import React, { Component, Fragment } from 'react'
import { Switch, Route } from 'react-router';
import axios from 'axios';

import { GetLogoinToken } from '../../Common/Auth';

import AuthRoute from '../../Components/AuthRoute';
import Top from '../../Components/Top/index';
import MenuBar from '../../Components/MenuBar';
import UserMgr from '../../View/Admin/UserMgr'
import RoleMgr from '../../View/Admin/RoleMgr'
import PerMgr from '../../View/Admin/PerMgr'
import GoodsMgr from '../../View/GoodsMgr'

import { Layout } from 'antd'
const { Header, Footer, Sider, Content } = Layout;



export default class Home extends Component {

  constructor(props) {
    super(props)
    axios.defaults.headers['Authorization'] = GetLogoinToken();
    // 当页面之后刷新，将权限移除
    sessionStorage.removeItem('LOGIN_USER_PER');
  }


  render() {
    const { match } = this.props
    return (
      <Fragment>
        <Layout style={{ height: '100vh' }}>
          <Header style={{ color: '#fff', padding: "0 15px" }}>
            <Top history={this.props.history} />
          </Header>
          <Layout>
            <Sider style={{ backgroundColor: '#fff' }}>
              <MenuBar history={this.props.history} />
            </Sider>
            <Content style={{ padding: "5px 15px" }}>
              <Switch>
                {/* 用户管理 */}
                <AuthRoute per={1570872984243} path={`${match.path}/user_mgr`} component={UserMgr}></AuthRoute>
                {/* 角色 */}
                <AuthRoute per={1570873025381} path={`${match.path}/role_mgr`} component={RoleMgr}></AuthRoute>
                {/* 权限 */}
                <AuthRoute per={1570873044424} path={`${match.path}/per_mgr`} component={PerMgr}></AuthRoute>
                <Route path={`${match.path}/goods_mgr`} component={GoodsMgr}></Route>
              </Switch>
            </Content>
          </Layout >
          <Footer style={{ backgroundColor: 'silver', height: '20px', padding: '0' }}>底部</Footer>
        </Layout >
      </Fragment >
    )
  }
}

