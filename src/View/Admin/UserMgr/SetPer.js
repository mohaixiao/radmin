import React, { Component } from 'react'
import { Modal, message, Row, Col, Checkbox } from 'antd'
import { red } from '@ant-design/colors'

import Service from '../../../Service';
import { formateDateToString } from '../../../Common/Helper'

export default class SetPer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            allPer: [],
            allCheckedPer: [],
            userPer: []
        }
    }

    async componentDidMount() {
        let allPer = await Service.loadAllPer().then(res => res.data)
        let userPer = await Service.loadUserPer(this.props.data.id).then(res => res.data)
        let allCheckedPer = [];
        userPer.forEach(up => {
            let perObj = allPer.find(item => item.id === up.permissionId)
            if (perObj) {
                allCheckedPer.push(perObj);
            }
        })
        this.setState({ allPer, allCheckedPer, userPer })
    }

    handleCloseModal = () => {
        this.props.close()
    }

    handleSubmit = () => {
        let { userPer, allCheckedPer } = this.state;
        let promiseArr = [];
        allCheckedPer.forEach((per, index) => {
            if (userPer.findIndex(up => up.permissionId == per.id) < 0) {
                promiseArr.push(Service.addUserPer({
                    id: Date.now() + index,
                    del: 0,
                    subon: this.props.data.id,
                    permissionId: per.id
                }));
            }
        })
        // 删除
        userPer.forEach(up => {
            if (allCheckedPer.findIndex(per => per.id === up.permissionId) < 0) {
                // 删除此权限
                promiseArr.push(Service.deleteUserPer(up.id))
            }
        })
        Promise.all(promiseArr)
            .then(res => {
                message.info("设置成功！")
                this.props.close();
            })
            .catch(err => {
                console.log('err:', err);
                message.error('设置失败！')
            })
    }

    handeleChangeBox = (per, e) => {
        let checkBoxArr = [...this.state.allCheckedPer];
        if (e.target.checked) {
            checkBoxArr.push(per);
        } else {
            checkBoxArr = checkBoxArr.filter(item => item.id !== per.id)
        }
        this.setState({ allCheckedPer: checkBoxArr })
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
                <h3>用户：<span style={{ color: red[5] }}>{this.props.data.name}</span> 设置权限</h3>
                <hr />
                <Row>
                    {
                        this.state.allPer.map(per => {
                            let checked = false;
                            if (this.state.userPer.find(userPer => userPer.permissionId === per.id)) {
                                checked = true
                            }
                            return (
                                <Col span={8} key={per.id}>
                                    <Checkbox
                                        onChange={(e) => { this.handeleChangeBox(per, e) }}
                                        defaultChecked={checked}
                                    >
                                        {per.des}
                                    </Checkbox>
                                </Col>
                            )
                        })
                    }
                </Row>
            </Modal>
        )
    }
}
