import React, { Component } from 'react'
import { Modal, message, Row, Col, Checkbox } from 'antd'

import Service from '../../../Service';
import { formateDateToString } from '../../../Common/Helper'

export default class SetRole extends Component {

    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {
            reload: false,
            allRoles: [], // 所有的角色信息的数组
            userRoles: [],// 当前用户已经管理的所有角色的中间表数据
            allCheckedRole: [] // 当前选中的所有角色
        }
    }

    async componentDidMount() {
        let userRoles = await Service.loadUserRoles(this.props.data.id);
        let allRoles = await Service.loadAllRoles();
        let allCheckedRoleArr = [];
        // 给已经默认设置了管理的角色添加到allCheckRole数组中去
        userRoles.data.forEach(userRoles => {
            let roleInfo = allRoles.data.find(role => role.id == userRoles.roleId);
            if (roleInfo) {
                allCheckedRoleArr.push(roleInfo)
            }
        })
        this.setState({ userRoles: userRoles.data, allRoles: allRoles.data, allCheckedRole: allCheckedRoleArr })
    }


    // 关闭model
    handleCloseModal = () => {
        this.props.close()
    }
    // 
    handleChangeBox = (role, e) => {
        console.log('role:', role);
        let checkedRoleArr = [...this.state.allCheckedRole]
        if (e.target.checked) {
            // 点击勾选
            checkedRoleArr.push(role);
        } else {
            // 取消勾选
            checkedRoleArr = checkedRoleArr.filter(item => item.id !== role.id);
        }
        this.setState({ allCheckedRole: checkedRoleArr })
    }

    handleSubmit = () => {
        // console.log(this.state.allCheckedRole);
        let { allCheckedRole, userRoles } = this.state;
        let promiseArr = [];
        // 判断要添加的
        // 最终的选中的role集合中不在原来的关联表中存在，就是添加的新关联
        allCheckedRole.forEach((role, index) => {
            let addRoleIndex = userRoles.findIndex(userRole => userRole.id === role.id);
            if (addRoleIndex < 0) {
                let p1 = Service.addUserRole({
                    id: Date.now() + index,
                    del: 0,
                    subon: formateDateToString(new Date()),
                    roleId: role.id,
                    userId: this.props.data.id
                })
                promiseArr.push(p1);
            }
        })
        // 判断要删除的 
        userRoles.forEach((userRole, index) => {
            let searchRoleIndex = allCheckedRole.findIndex(checkedRole => checkedRole.id === userRole.id);
            if (searchRoleIndex < 0) {
                let p2 = Service.deleteUserRole(userRole.id);
                promiseArr.push(p2);
            }
        })
        Promise.all(promiseArr).then(res => {
            message.info("设置成功！")
            this.props.close()
        }).catch(err => {
            message.error('设置失败！')
            console.log(err);
        })
    }

    render() {
        return (
            <Modal
                // 关闭时销毁 Modal 里的子元素
                destroyOnClose
                title="编辑用户信息"
                okText="确定"
                cancelText="取消"
                visible={this.props.visible}
                onCancel={
                    this.handleCloseModal
                }
                onOk={this.handleSubmit}
            >
                <h3>给用户：{this.props.data ? this.props.data.name : null} 设置权限</h3>
                <hr />
                <Row>
                    {
                        this.state.allRoles.map(role => {
                            let check = false;
                            if (this.state.userRoles.find(userRole => userRole.roleId === role.id)) {
                                check = true
                            }
                            return (
                                <Col span={8} key={role.id}>
                                    <Checkbox onChange={(e) => this.handleChangeBox(role, e)} defaultChecked={check}>{role.name}</Checkbox>
                                </Col>
                            )
                        })
                    }
                </Row>
            </Modal>

        )
    }
}
