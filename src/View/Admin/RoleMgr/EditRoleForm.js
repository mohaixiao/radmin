import React, { Component } from 'react'
import { UserOutlined, ContactsOutlined, UserAddOutlined, } from '@ant-design/icons';
import { Form, Input } from 'antd';

class EditRoleForm extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log(this.props.forwardedRef.current, '1');
        this.props.forwardedRef.current.setFieldsValue({
            name: this.props.data.name,
            des: this.props.data.des,
            pId: this.props.data.pId,
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
                    name="name"
                    rules={[
                        {
                            min: 2,
                            required: true,
                            message: '请输入大于2个字符！',
                        },
                    ]}
                    label='角色名'
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入姓名" />
                </Form.Item>
                <Form.Item
                    name="des"
                    label="角色描述"
                    rules={[
                        {

                            required: true,
                            message: '请输入详细描述',
                        },
                    ]}
                >
                    <Input
                        prefix={<ContactsOutlined className="site-form-item-icon" />}
                        style={{
                            width: '100%',
                        }}
                        placeholder="请输入角色描述！"
                    />
                </Form.Item>
                <Form.Item
                    name="pId"
                    label="父角色"
                    rules={[
                        {
                            max: 1,
                            required: true,
                            message: '请输入1位号码',
                        },
                    ]}
                >
                    <Input
                        prefix={<UserAddOutlined className="site-form-item-icon" />}
                        style={{
                            width: '100%',
                        }}
                        placeholder="请输入父角色！"
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

export default wrapper(EditRoleForm)