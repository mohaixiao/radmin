import React, { Component } from 'react'
import { blue } from '@ant-design/colors'
import { Row, Col, Checkbox, message } from 'antd'
import Service from '../../../Service'
import { formateDateToString } from '../../../Common/Helper'

export default class SetRolePer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            allPer: [], // 所有的权限数据
            rolePer: [], // 默认角色关联的权限中间数据
            allCheckedPer: [] // 最终用户所有选中的权限

        }
    }

    async componentDidMount() {
        let allPer = await Service
            .loadAllPer()
            .then(res => res.data);
        let rolePer = await Service
            .loadRolePer(this.props.data.id)
            .then(res => res.data);

        let allCheckedPer = [];
        rolePer.forEach(rolePer => {
            let per = allPer.find(per => per.id === rolePer.permissionId);
            if (per) allCheckedPer.push(per);
        })
        this.setState({ allPer, rolePer, allCheckedPer })
    }

    // 勾选
    handleChangechecked = (per, e) => {
        let allCheckedPer = [...this.state.allCheckedPer];
        // 勾选
        if (e.target.checked) {
            allCheckedPer.push(per);
        } else {
            // 取消选择
            allCheckedPer = allCheckedPer.filter(item => item.id !== per.id);
        }
        this.setState({ allCheckedPer })
    }

    handleSubmit = () => {
        let { rolePer, allCheckedPer } = this.state
        let promiseArr = [];
        // 添加角色关系
        allCheckedPer.forEach((item, i) => {
            let index = rolePer.findIndex(rp => item.id === rp.permissionId)
            if (index < 0) {
                promiseArr.push(Service.addRolePer(
                    {
                        id: Date.now() + i,
                        del: 0,
                        subon: formateDateToString(new Date()),
                        permissionId: item.id,
                        roleId: this.props.data.id
                    }
                ))
            }
        })
        // 删除角色关系
        rolePer.forEach((rp) => {
            let index = allCheckedPer.findIndex(item => item.id === rp.permissionId)
            if (index < 0) {
                promiseArr.push(Service.deleteRolePer(rp.id))
            }
        })
        // console.log(promiseArr, '1');
        Promise.all(promiseArr)
            .then(
                res => {
                    message.info('设置成功！')
                    this.props.close()
                }
            )
            .catch(err => {
                message.error('设置失败！')
                console.log('err', err);
            })
    }


    render() {
        let { allPer, rolePer } = this.state
        return (
            <div>
                <h3>给角色：<span style={{ color: blue[5] }}>{this.props.data.name}</span>设置权限</h3>
                <hr />
                <Row>
                    {
                        allPer.map(per => {
                            let checked = false;
                            let index = rolePer.findIndex(rolePer => rolePer.permissionId === per.id);
                            checked = index >= 0;
                            return (
                                <Col span={8} key={per.id}>
                                    <Checkbox
                                        defaultChecked={checked}
                                        onChange={e => { this.handleChangechecked(per, e) }}
                                    >
                                        {per.des}
                                    </Checkbox>
                                </Col>
                            )
                        })
                    }
                </Row>
            </div>
        )
    }
}
