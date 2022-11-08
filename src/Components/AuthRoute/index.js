import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'
import { getLoginUserAllPer } from '../../Common/Auth';

export default class AuthRoute extends Component {
    state = {
        authorized: false
    }
    componentDidMount() {
        // 判断当前传来的属性是谁，然后判断当前登录的用户是否拥有此路由权限
        // 如果有权限返回路由对象
        // 没有权限返回null
        // per属性是当前路由对应权限数据的id
        // this.props.per
        getLoginUserAllPer()
            .then(res => {
                let authorized = res.findIndex(per => per.id === this.props.per) >= 0
                this.setState({ authorized })
            })
    }

    // per 传入实现路由切换
    UNSAFE_componentWillReceiveProps() {
        getLoginUserAllPer()
            .then(res => {
                let authorized = res.findIndex(per => per.id === this.props.per) >= 0
                this.setState({ authorized })
            })
    }

    render() {
        return (
            <Fragment>
                {
                    this.state.authorized ?
                        <Route {...this.props}></Route>
                        :
                        <Route path={this.props.path} render={() => (<h3>没有权限</h3>)}></Route>
                }
            </Fragment>
        )
    }
}
