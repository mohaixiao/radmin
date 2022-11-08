import React, { Component } from 'react'
import { UserOutlined, CodeSandboxOutlined, RightCircleOutlined, UserAddOutlined, LineChartOutlined } from '@ant-design/icons';
import { Form, Input, Button, Select } from 'antd';

class EditPerForm extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log(this.props.forwardedRef.current, '1');
        this.props.forwardedRef.current.setFieldsValue({
            des: this.props.data.des,
            pId: this.props.data.pId,
            type: this.props.data.type,
            code: this.props.data.code,
            url: this.props.data.url,
            order: this.props.data.order
        })
    }

    render() {
        const { Option } = Select

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
                    name="des"
                    rules={[
                        {
                            min: 2,
                            max: 20,
                            message: '请输入2-20个字符！',
                        },
                        {
                            required: true,
                            message: '请输入权限名！',
                        },
                    ]}
                    label='权限名'
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入权限名" />
                </Form.Item>
                <Form.Item
                    name="type"
                    rules={[
                        {
                            required: true,
                            message: '请选择权限类型！',
                        },
                    ]}
                    label='权限类型'
                >
                    <Select>
                        <Option value="menu">菜单权限</Option>
                        <Option value="action">请求权限</Option>
                        <Option value="router">路有权限</Option>
                        <Option value="resource">资源权限</Option>
                        <Option value="component">组件权限</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="code"
                    label="权限码"
                >
                    <Input
                        prefix={<CodeSandboxOutlined className="site-form-item-icon" />}
                        style={{
                            width: '100%',
                        }}
                        placeholder="请输入权限码！"
                    />
                </Form.Item>
                <Form.Item
                    name="pId"
                    label="父权限"
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
                        placeholder="请输入父权限！"
                    />
                </Form.Item>
                <Form.Item
                    name="url"
                    label="地址"
                >
                    <Input
                        prefix={<RightCircleOutlined className="site-form-item-icon" />}
                        style={{
                            width: '100%',
                        }}
                        placeholder="请输入地址！"
                    />
                </Form.Item>
                <Form.Item
                    name="order"
                    label="排序"
                >
                    <Input
                        prefix={<LineChartOutlined className="site-form-item-icon" />}
                        style={{
                            width: '100%',
                        }}
                        placeholder="请输入排序！"
                    />
                </Form.Item>
            </Form >
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

export default wrapper(EditPerForm)