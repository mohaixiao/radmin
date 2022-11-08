import React, { Component } from 'react'
import { message, Modal } from 'antd'

import AddPerForm from './AddPerForm';
import { formateDateToString } from '../../../Common/Helper';
import { GetLoginUserInfo } from '../../../Common/Auth';

export default class AddPer extends Component {
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
                let newPer = Object.assign({
                    id: Date.now(),
                    del: 0,
                    status: 0,
                    subon: formateDateToString(new Date()),
                    subby: GetLoginUserInfo().id
                }, data)
                this.props.addPer(newPer)
                    .then(
                        res => {
                            message.info('添加成功！')
                            this.props.close();
                            this.props.loadPerList()
                        }
                    )
                    .catch(e => {
                        message.error("添加失败！");
                        console.log(e);
                    })
            })
            .catch(errorInfo => {
                console.log('3', errorInfo);
            });
    }

    render() {
        return (
            <Modal
                destroyOnClose
                title="添加权限信息"
                okText="确定"
                cancelText="取消"
                visible={this.props.visible}
                onCancel={
                    this.handleCloseModal
                }
                onOk={this.handleSubmit}
            >
                <AddPerForm ref={this.myRef} />
            </Modal>
        )
    }
}
