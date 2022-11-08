import React, { Component } from 'react'
import { message, Modal } from 'antd'

import AddRoleForm from './AddRoleForm';

export default class AddRole extends Component {

    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }

    // 关闭框
    handleCloseModal = () => {
        this.props.close()
    }

    // 提交修改
    handleSubmit = () => {
        this.myRef.current.validateFields()
            .then(data => {
                console.log('2', data);
                this.props.addRole(data);
            })
            .catch(errorInfo => {
                console.log('3', errorInfo);
            });
    }

    render() {
        return (
            <Modal
                title="添加角色信息"
                okText="确定"
                cancelText="取消"
                visible={this.props.visible}
                onCancel={
                    this.handleCloseModal
                }
                onOk={this.handleSubmit}
            >
                <AddRoleForm ref={this.myRef} />
            </Modal>
        )
    }
}
