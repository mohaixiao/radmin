import React, { Component } from 'react'
import { LockOutlined, UserOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';

import { GetLogoinToken } from '../../../Common/Auth'

class EditUserForm extends Component {

    constructor(props) {
        super(props);
    }


    componentDidMount() {
        console.log(this.props.forwardedRef.current, '1');
        this.props.forwardedRef.current.setFieldsValue({
            name: this.props.data.name,
            username: this.props.data.username,
            mail: this.props.data.mail,
            phone: this.props.data.phone,
            password: this.props.data.password
        })
    }



    render() {
        return (
            <Form
                ref={this.props.forwardedRef}
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
            >
                <Form.Item
                    name="username"
                    rules={[
                        {
                            pattern: /\w{6,20}/gi,
                            required: true,
                            message: '请输入6-20个字符！',
                        },
                    ]}
                    label='用户名'
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入用户名" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            pattern: /\w{6,20}/gi,
                            message: '请输入6-20个字符！',
                        },
                    ]}
                    label='密码'
                >

                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="请输入密码！"
                    />
                </Form.Item>
                <Form.Item
                    name='mail'
                    label="Email"
                    rules={[
                        {
                            type: 'email',
                        },
                        {
                            required: true,
                            message: '请输入邮箱'
                        }
                    ]}
                >
                    <Input
                        prefix={<MailOutlined className="site-form-item-icon" />}
                        type="mail"
                        placeholder="请输入邮箱！"
                    />
                </Form.Item>
                <Form.Item
                    name="name"
                    rules={[
                        {
                            min: 2,
                            required: true,
                            message: '请输入大于2个字符！',
                        },
                    ]}
                    label='姓名'
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入姓名" />
                </Form.Item>
                <Form.Item
                    name="phone"
                    label="电话"
                    rules={[
                        {
                            pattern: /\d{11}/gi,
                            required: true,
                            message: '请输入11位号码',
                        },
                    ]}
                >
                    <Input
                        prefix={<PhoneOutlined className="site-form-item-icon" />}
                        style={{
                            width: '100%',
                        }}
                        placeholder="请输入电话号码！"
                    />
                </Form.Item>
            </Form>
        )
    }
}

const wrapper = function (InnerComponent) {
    return React.forwardRef((props, ref) => {
        return (
            <InnerComponent forwardedRef={ref} {...props} />
        )
    })
}

export default wrapper(EditUserForm)


