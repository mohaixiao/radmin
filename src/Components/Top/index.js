import React, { Component, Fragment } from 'react'
import { MoneyCollectOutlined, UserOutlined, LogoutOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd'
import { GetLoginUserInfo, Logout } from '../../Common/Auth'

import './top.scss'

export default class Top extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user: GetLoginUserInfo()
        }
    }

    // 退出登录
    goBack() {
        Modal.confirm({
            title: '提示',
            icon: <ExclamationCircleOutlined />,
            content: '您确认要退出吗？',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                const { history } = this.props;
                history.push('/login')
            }
        });

    }

    render() {
        return (
            <Fragment>
                <div className='wrapper-top'>
                    <div className="left">
                        <a className="logo" href='/login'>
                            <h1 style={{ color: '#fff', fontSize: '30px' }}><MoneyCollectOutlined /> 安心付后台管理系统</h1>
                        </a>
                    </div>
                    <div className="right">
                        <span className="user">
                            <UserOutlined /> {this.state.user.username}
                        </span>
                        <span className="out" onClick={() => { this.goBack() }}>
                            <LogoutOutlined /> 退出
                        </span>
                    </div>
                </div>
            </Fragment>
        )
    }
}
