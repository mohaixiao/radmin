import React, { Component } from 'react'
import { message, Modal } from 'antd'

import store from '../../../store'
import { AddUserActionAsync } from '../../../Action/UserAction';

import AddUserForm from './AddUserForm';

export default class AddUser extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }

    // 提交添加
    handleSubmit = () => {
        this.myRef.current.validateFields()
            .then(data => {
                console.log('2', data);
                data.del = 0;
                data.id = Date.now();
                data.isTeacher = false;
                data.avatar = process.env.REACT_APP_BASEURL + data.avatar.file.response.img;

                store.dispatch(AddUserActionAsync(data))
                    .then(res => {
                        message.info('添加成功!');
                        this.props.reLoad()
                        // 重置添加对话框和关闭对话框
                        this.handleCloseModal()
                    })
                    .catch(() => {
                        message.error('添加失败！请重试！');
                    })
            })
            .catch(errorInfo => {
                console.log('3', errorInfo);
            });
    }
    // 关闭页面
    handleCloseModal = () => {
        this.myRef.current.resetFields();
        this.props.close()
    }
    render() {
        return (
            <Modal
                title="添加用户信息"
                okText="确定"
                cancelText="取消"
                visible={this.props.visible}
                onCancel={
                    this.handleCloseModal
                }
                onOk={this.handleSubmit}
            >
                <AddUserForm ref={this.myRef} />
            </Modal>
        )
    }
}
