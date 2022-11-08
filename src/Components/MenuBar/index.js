import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import React, { Component } from 'react';
import { getLoginUserAllPer } from '../../Common/Auth';

const { SubMenu } = Menu;

export default class MenuBar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            current: '',
            perMenu: [], // 所有当前用户拥有的菜单类型的权限
        }
    }

    componentDidMount() {
        getLoginUserAllPer()
            .then(res => {
                this.setState({ perMenu: res.filter(m => m.type === 'menu') });
            })
    }

    // setState是异步的
    handleClick = (e) => {
        this.setState(() => {
            return {
                current: e.key
            }
        }, () => {
            // 查找url
            let url = this.state.perMenu.find(item => item.id == e.key).url;
            const { history } = this.props;
            history.push(url)
        })

    }
    render() {
        let rootMenu = this.state.perMenu.filter(m => m.pId == 0)
        return (
            <div className='aside-menu-bar'>
                <Menu
                    onClick={this.handleClick}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                >
                    {
                        rootMenu.map(rootM => {
                            let childMenus = this.state.perMenu.filter(m => m.pId == rootM.id);
                            childMenus.sort((a, b) => a.order - b.order);
                            return (
                                <SubMenu
                                    key={rootM.id}
                                    icon={<AppstoreOutlined />}
                                    title={rootM.des}
                                >
                                    {
                                        childMenus.map(childM => {
                                            return (
                                                <Menu.Item
                                                    key={childM.id}
                                                >
                                                    {childM.des}
                                                </Menu.Item>
                                            )
                                        })
                                    }
                                </SubMenu>
                            )
                        })
                    }
                </Menu>
            </div>
        )
    }
}
