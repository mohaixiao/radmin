import React, { Component } from 'react'
import { message, Modal } from 'antd'

import EditRoleForm from './EditRoleForm'

export default class EditRole extends Component {

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
        console.log(this.myRef.current);
        this.myRef.current.validateFields()
            .then(data => {
                console.log('2', data);
                let newData = Object.assign({}, this.props.data, data);
                this.props.saveRole(newData);
            })
            .catch(errorInfo => {
                console.log('3', errorInfo);
            });
    }

    render() {
        return (
            <Modal
                // 关闭时销毁 Modal 里的子元素
                destroyOnClose
                title="编辑角色信息"
                okText="确定"
                cancelText="取消"
                visible={this.props.visible}
                onCancel={
                    this.handleCloseModal
                }
                onOk={this.handleSubmit}
            >
                <EditRoleForm data={this.props.data} ref={this.myRef} />
            </Modal>
        )
    }
}
