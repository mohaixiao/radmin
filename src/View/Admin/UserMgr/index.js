import React, { Component } from 'react'
import { Breadcrumb, Table, Button, message, Modal, Avatar, Popconfirm, Input } from 'antd';

import store from '../../../store';
import service from '../../../Service'
import { LoadUserActionAsync } from '../../../Action/UserAction';

import EditUser from './EditUser';
import AddUser from './AddUser';
import SetRole from './SetRole';
import SetPer from './SetPer';

export default class UserMgr extends Component {
    constructor(props) {
        super(props);
        this.state = {
            setUserRole: null,
            setUserRow: null,
            setPerUser: null, // 当前权限的用户数据
            editUserRow: null,
            selectedRowKeys: [],
            showSetPerDialog: false,   //
            showSetRoleDialog: false,  // 
            showAddUserDialog: false,  // 显示要添加用户的对话框
            showEditUserDialog: false, // 显示修改的对话框
            unsubscribe: null,
            userlist: [
                {
                    id: '1',
                    name: '胡彦斌',
                    phone: '19160752432',
                },
                {
                    id: '2',
                    name: '胡彦祖',
                    phone: '19160752431',
                },
            ],
            columns: [
                {
                    title: '编号',
                    dataIndex: 'id',
                    key: 'id',
                },
                {
                    title: '名字',
                    dataIndex: 'name',
                    key: 'name',
                },
                {
                    title: '电话',
                    dataIndex: 'phone',
                    key: 'phone',
                },
                {
                    title: '头像',
                    dataIndex: 'avatar',
                    key: 'avatar',
                    render: (avatar) => (<Avatar src={avatar} />)
                },
                {
                    title: '编辑',
                    dataIndex: 'del',
                    key: 'del',
                    render: (del, row) => (
                        <div>
                            <Button type='primary' onClick={() => this.setState({ showEditUserDialog: true, editUserRow: row })} style={{ margin: '5px' }}>编辑</Button>
                            <Popconfirm

                                title="你确认要删除吗？"
                                okText="确认"
                                cancelText='取消'
                                onConfirm={() => {
                                    this.deleteUser(row.id)
                                }}
                            >
                                <Button type='danger' style={{ margin: '5px' }}>删除</Button>
                            </Popconfirm>

                        </div>
                    )
                },
            ],
            params: {
                _page: 1, _limit: 6, q: ''
            },
            total: 0
        }
    }
    componentDidMount() {
        // service.loadUserList()
        //     .then(res => {
        //         this.setState({ userlist: res.data });
        //     })
        // 发送获取用户
        store.dispatch(LoadUserActionAsync(this.state.params))
        const unsubscribe = store.subscribe(this.userListChange)
        this.setState({ unsubscribe: unsubscribe });
    }

    componentWillUnmount() {
        this.state.unsubscribe && (this.state.unsubscribe());
    }

    // 右侧删除按钮
    deleteUser = (id) => {
        service.deleteUser([id])
            .then(res => {
                store.dispatch(LoadUserActionAsync(this.state.params));
                message.info('删除成功！');
                let newSelectedRowKeys = this.state.selectedRowKeys.filter((item) => id !== item);
                this.setState({ selectedRowKeys: newSelectedRowKeys })
            })
            .catch(e => {
                console.log(e);
                message.error("删除失败！");
            })
        console.log(this.state.selectedRowKeys);
    }

    userListChange = () => {
        let Userlist = store.getState().Userlist
        this.setState({ userlist: Userlist.list, total: Userlist.total })
    }

    // 切换页数
    changePage = (page, pageSize, q = '') => {
        if (!q) {
            q = this.state.params.q;
        }
        // console.log(page, pageSize);
        this.setState(preState => {
            return { ...preState, ...{ params: { _page: page, _limit: pageSize, q } } }
        }, () => {
            store.dispatch(LoadUserActionAsync(this.state.params))
        })
    }

    reLoad = () => {
        store.dispatch(LoadUserActionAsync(this.state.params))
    }

    // 打开面板
    hideAddUserDialg = () => {
        this.setState({ showAddUserDialog: false });

    }

    // 打开面板
    hideEditUserDialg = () => {
        this.setState({ showEditUserDialog: false });
    }

    hideSetUserDialg = () => {
        this.setState({ showSetRoleDialog: false })
    }

    hideSetPerDialg = () => {
        this.setState({ showSetPerDialog: false })
    }

    handleSet = () => {
        if (this.state.selectedRowKeys.length !== 1) {
            message.error('请选择一条数据！')
            return;
        }
        let currentId = this.state.selectedRowKeys[0];
        let selectRow = store.getState().Userlist.list.find((item) => item.id === currentId)
        // 刷新页面
        this.setState({
            showSetRoleDialog: true,
            setUserRole: selectRow
        })
    }


    // 编辑修改
    handleEdit = () => {
        if (this.state.selectedRowKeys.length !== 1) {
            message.error('请选择一条数据！')
            return;
        }
        let currentId = this.state.selectedRowKeys[0];
        let selectRow = store.getState().Userlist.list.find((item) => item.id === currentId)

        // console.log(selectRow, '1');

        // 刷新页面
        this.setState({
            showEditUserDialog: true,
            editUserRow: selectRow
        })

    }

    // 删除数据
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
                service.deleteUser(this.state.selectedRowKeys)
                    .then(res => {
                        store.dispatch(LoadUserActionAsync(this.state.params));
                        message.info('删除成功！');
                        this.setState({ selectedRowKeys: [] })
                    })
                    .catch(e => {
                        console.log(e);
                        message.error("删除失败！");
                    })
                console.log(this.state.selectedRowKeys);
            }
        })
    }

    handleSetPer = () => {
        if (this.state.selectedRowKeys.length !== 1) {
            message.error('请选择一条数据！')
            return
        }
        let currentId = this.state.selectedRowKeys[0];
        let selectRow = this.state.userlist.find((item) => item.id === currentId)
        this.setState({ showSetPerDialog: true })
        this.setState({ showSetPerDialog: true, setUserRole: selectRow })
    }

    buttonStyle = {
        margin: '5px',
    }

    render() {
        let { selectedRowKeys } = this.state;
        let userRowSelection = {
            selectedRowKeys: selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({ selectedRowKeys: selectedRowKeys })
                // console.log(selectedRowKeys, selectedRows);
            }
        }

        return (
            <div className='admin-usermgr'>
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <a href="/home">首页</a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <a href="/home/user_mgr">用户</a>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <hr />
                <Button type='primary' onClick={() => { this.setState({ showAddUserDialog: true }) }} style={this.buttonStyle}>添加</Button>
                <Button type='danger' onClick={this.handleDelete} style={this.buttonStyle}>删除</Button>
                <Button type='primary' onClick={this.handleEdit} style={this.buttonStyle}>修改</Button>
                <Button type='danger' onClick={this.handleSet} style={this.buttonStyle}>设置角色</Button>
                <Button type='primary' onClick={this.handleSetPer} style={this.buttonStyle}>设置权限</Button>
                <Input.Search
                    placeholder='搜索'
                    style={{ width: "300px", padding: "5px", float: 'right' }}
                    onSearch={(value) => {
                        this.setState(preState => {
                            preState.params.q = value;
                            return { ...preState }
                        }, () => {
                            this.changePage(1, 6, value)
                        })
                    }}
                    enterButton
                ></Input.Search>
                <Table
                    scroll={{
                        y: 300,
                    }}
                    style={{ backgroundColor: '#fefefe' }}
                    bordered={true}
                    dataSource={this.state.userlist}
                    columns={this.state.columns}
                    rowSelection={userRowSelection}
                    rowKey="id"
                    pagination={{ total: this.state.total, pageSize: 6, defaultCurrent: 1, onChange: this.changePage }}
                ></Table>
                <AddUser
                    reLoad={this.reLoad}
                    visible={this.state.showAddUserDialog}
                    close={this.hideAddUserDialg}
                />
                <EditUser
                    reLoad={this.reLoad}
                    data={this.state.editUserRow}
                    visible={this.state.showEditUserDialog}
                    close={this.hideEditUserDialg}
                />
                {
                    this.state.showSetRoleDialog ? <SetRole
                        data={this.state.setUserRole}
                        visible={this.state.showSetRoleDialog}
                        close={this.hideSetUserDialg}
                    /> : null
                }
                {
                    this.state.showSetPerDialog ? <SetPer
                        data={this.state.setUserRole}
                        visible={this.state.showSetPerDialog}
                        close={this.hideSetPerDialg}
                    /> : null
                }
            </div >
        )
    }
}
