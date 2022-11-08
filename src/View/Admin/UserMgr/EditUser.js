import React, { Component } from 'react'
import { Modal, message } from 'antd'

import store from '../../../store'

import EditUserForm from './EditUserForm';
import { EditUserActionAsync } from '../../../Action/UserAction';

export default class EditUser extends Component {

    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }

    handleCloseModal = () => {
        this.props.close()
    }

    handleEditUser = () => {
        this.myRef.current.validateFields()
            .then(data => {
                console.log('2', data);
                let newData = { ...this.props.data, ...data }

                console.log(data, 'data');
                store.dispatch(EditUserActionAsync(newData))
                    .then(res => {
                        message.info('修改成功!');
                        this.props.reLoad()
                        // 重置添加对话框和关闭对话框
                        this.handleCloseModal()
                    })
                    .catch(() => {
                        message.error('修改失败！请重试！');
                    })

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
                title="编辑用户信息"
                okText="确定"
                cancelText="取消"
                visible={this.props.visible}
                onCancel={
                    this.handleCloseModal
                }
                onOk={this.handleEditUser}
            >
                <EditUserForm data={this.props.data} ref={this.myRef} />
            </Modal>

        )
    }
}
