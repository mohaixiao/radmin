import React, { Component } from 'react'
import { Breadcrumb, Table, Button, message, Modal, Popconfirm, Input } from 'antd';

import store from '../../../store';
import service from '../../../Service'
import { formateDateToString } from '../../../Common/Helper'
import { LoadUserActionAsync } from '../../../Action/UserAction';

import AddRole from './AddRole'
import EditRole from './EditRole';
import SetRolePer from './SetRolePer'

export default class RoleMgr extends Component {
    constructor(props) {
        super(props);
        this.state = {
            setRolePer: null,
            editRoleRow: null,
            showAddRoleDialog: false,
            showEditRoleDialog: false,
            showSetRolePerDialog: false,
            params: {
                _page: 1,
                _limit: 6,
                q: '',
                _sort: 'id',
                _order: 'desc'
            },
            total: 0,
            roleList: [
                {
                    id: 5,
                    pId: 0,
                    name: '超级管理员',
                    des: '超级管理员',
                    subon: '2019-05-08 16:54:26',
                    status: 0,
                    del: 0
                }
            ],
            columns: [
                {
                    title: '编号',
                    dataIndex: 'id',
                    key: 'id',
                },
                {
                    title: '角色名',
                    dataIndex: 'name',
                    key: 'name',
                },
                {
                    title: '状态',
                    dataIndex: 'status',
                    key: 'status',
                    render: (status, row) => <span>{status === 0 ? '启用' : '禁用'}</span>
                },
                {
                    title: '提交时间',
                    dataIndex: 'subon',
                    key: 'subon',
                },
                {
                    title: '父角色',
                    dataIndex: 'pId',
                    key: 'pId',
                },
                {
                    title: '操作',
                    dataIndex: 'del',
                    key: 'del',
                    render: (del, row) => {
                        return (
                            <div>
                                <Button onClick={() => this.setState({ showEditRoleDialog: true, editRoleRow: row })} type='primary' size='small' style={{ margin: '5px' }} >编辑</Button>
                                <Popconfirm

                                    title="你确认要删除吗？"
                                    okText="确认"
                                    cancelText='取消'
                                    onConfirm={() => {
                                        this.deleteRole(row)
                                    }}
                                >
                                    <Button type='danger' size='small' style={{ margin: '5px' }}>删除</Button>
                                </Popconfirm>
                            </div>
                        )
                    }
                },
            ],
            selectedRowKeys: [],
        }
        this.myRef = React.createRef()
    }

    componentDidMount() {
        this.loadRoleList()
    }

    handleEdit = () => {
        if (this.state.selectedRowKeys.length !== 1) {
            message.error('请选择一条数据！')
            return
        }
        let currentId = this.state.selectedRowKeys[0];
        let seletRow = this.state.roleList.find((item) => item.id === currentId);
        this.setState({ showEditRoleDialog: true, editRoleRow: seletRow })
    }

    handleSet = () => {
        if (this.state.selectedRowKeys.length !== 1) {
            message.error('请选择一条数据！')
            return
        }
        let currentId = this.state.selectedRowKeys[0];
        let selectRow = this.state.roleList.find((item) => item.id === currentId)
        this.setState({ showSetRolePerDialog: true, setRolePer: selectRow })
    }


    // 删除角色
    deleteRole = (row) => {
        service.deleteRoles([row.id])
            .then(res => {
                store.dispatch(LoadUserActionAsync(this.state.params));
                message.info('删除成功！');
                this.setState({ selectedRowKeys: this.state.selectedRowKeys.filter(item => item.id !== row.id) })
                this.loadRoleList()
            })
            .catch(e => {
                console.log(e);
                message.error("删除失败！");
                this.loadRoleList()
            })
        console.log(this.state.selectedRowKeys);
    }

    // 删除角色
    handleDelete = () => {
        if (this.state.selectedRowKeys.length <= 0) {
            message.warn('请选择要删除的数据！')
            return;
        }
        Modal.confirm({
            title: '您确认要删除？',
            okText: '删除',
            cancelText: '取消',
            onOk: () => {
                service.deleteRoles(this.state.selectedRowKeys)
                    .then(res => {
                        store.dispatch(LoadUserActionAsync(this.state.params));
                        message.info('删除成功！');
                        this.setState({ selectedRowKeys: [] })
                        this.loadRoleList()
                    })
                    .catch(e => {
                        console.log(e);
                        message.error("删除失败！");
                        this.loadRoleList()
                    })
                console.log(this.state.selectedRowKeys);
            }
        })
    }

    // 加载角色
    loadRoleList = () => {
        service.loadRoleList(this.state.params).then(
            res => {
                this.setState({ roleList: res.data, total: parseInt(res.headers['x-total-count']) });
            }
        )
    }

    // 换页
    changePage = (page, pageSize) => {
        this.setState(preState => {
            preState.params._page = page;
            preState.params._limit = pageSize;
            return { ...preState };
        }, () => {
            this.loadRoleList();
        })
    }

    // 搜索
    handleSearch = (value) => {
        this.setState(preState => {
            preState.params.q = value;
            return { ...preState }
        }, () => {
            this.loadRoleList()
        })
    }

    hideAddRoleDialg = () => {
        this.setState({ showAddRoleDialog: false })
    }

    hideEditRoleDialg = () => {
        this.setState({ showEditRoleDialog: false })
    }

    // 修改角色
    saveRole = (role) => {
        service.saveRole(role)
            .then(res => {
                message.info('修改成功！');
                this.hideEditRoleDialg();
                this.loadRoleList();
                // 重新加载页面
            })
            .catch(err => {
                console.log(err);
                message.error('修改失败！');
            })
    }

    // 添加角色
    addRole = (role) => {
        let newRole = Object.assign({
            id: Date.now(),
            del: 0,
            subon: formateDateToString(new Date()),
            status: 0,
        }, role);
        service.addRole(newRole)
            .then(res => {
                message.info('添加成功!');
                // 重置添加对话框和关闭对话框
                this.hideAddRoleDialg()
                this.loadRoleList(); // 刷新页面
            })
            .catch((e) => {
                message.error('添加失败！请重试！');
                console.log(e);
            })
    }


    buttonStyle = {
        margin: '5px',
    }

    render() {
        let { selectedRowKeys } = this.state;

        return (
            <div className='admin-rolemgr'>
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <a href="/home">首页</a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <a href="/home/role_mgr">角色管理</a>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <hr />
                <Button size='small' type='primary' onClick={() => { this.setState({ showAddRoleDialog: true }) }} style={this.buttonStyle}>添加</Button>
                <Button size='small' type='danger' onClick={this.handleDelete} style={this.buttonStyle}>删除</Button>
                <Button size='small' type='primary' onClick={this.handleEdit} style={this.buttonStyle}>修改</Button>
                <Button size='small' type='danger' onClick={this.handleSet} style={this.buttonStyle}>设置权限</Button>
                <Input.Search
                    placeholder='搜索'
                    style={{ width: "300px", padding: "5px", float: 'right' }}
                    onSearch={this.handleSearch}
                    enterButton
                ></Input.Search>
                <Table
                    scroll={{
                        y: 300,
                    }}
                    style={{ backgroundColor: '#fefefe' }}
                    bordered={true}
                    dataSource={this.state.roleList}
                    columns={this.state.columns}
                    rowSelection={{
                        selectedRowKeys: selectedRowKeys,
                        onChange: (selectedRowKeys, selectedRows) => {
                            this.setState({ selectedRowKeys: selectedRowKeys })
                            console.log(selectedRowKeys, 'selectedRowKeys');
                        }
                    }}
                    rowKey="id"
                    pagination={{ total: this.state.total, pageSize: 6, defaultCurrent: 1, onChange: this.changePage }}
                ></Table>
                <AddRole
                    visible={this.state.showAddRoleDialog}
                    close={this.hideAddRoleDialg}
                    addRole={this.addRole}
                />
                <EditRole
                    data={this.state.editRoleRow}
                    visible={this.state.showEditRoleDialog}
                    close={this.hideEditRoleDialg}
                    saveRole={this.saveRole}
                />
                <Modal
                    destroyOnClose
                    visible={this.state.showSetRolePerDialog}
                    title="设置角色的权限"
                    cancelText='取消'
                    onCancel={() => this.setState({ showSetRolePerDialog: false })}
                    onOk={() => { this.myRef.current.handleSubmit() }}
                >
                    {
                        this.state.showSetRolePerDialog ?
                            <SetRolePer close={() => this.setState({ showSetRolePerDialog: false })} ref={this.myRef} data={this.state.setRolePer} /> : null
                    }
                </Modal>
            </div >
        )
    }
}
