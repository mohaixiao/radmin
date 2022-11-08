import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Breadcrumb, Table, Button, message, Modal, Avatar, Popconfirm, Input } from 'antd';

import { AddPerActionAsync, LoadPerActionAsync, EditPerActionAsync, DeletePerActionAsync } from '../../../Action/PerAction';

import AddPer from './AddPer';
import EditPer from './EditPer';

export class PerMgr extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editPerRow: null,
            showAddPerDialog: false,
            showEditPerDialog: false,
            params: {
                _limit: 6,
                _page: 1,
                q: '',
                _sort: 'id',
                _order: 'desc'
            },
            selectedRowKeys: [],
            columns: [
                {
                    key: 'id',
                    dataIndex: 'id',
                    title: '编号'
                },
                {
                    key: "type",
                    dataIndex: "type",
                    title: '权限类型'
                },
                {
                    key: "des",
                    dataIndex: 'des',
                    title: '权限描述'
                },
                {
                    key: 'status',
                    dataIndex: "status",
                    title: '权限状态'
                },
                {
                    key: 'subon',
                    dataIndex: "subon",
                    title: '创建时间'
                },
                {
                    key: 'code',
                    dataIndex: "code",
                    title: '权限码'
                },
                {
                    key: 'url',
                    dataIndex: "url",
                    title: '地址'
                },
                {
                    key: 'pId',
                    dataIndex: "pId",
                    title: '父权限'
                },
                {
                    key: 'order',
                    dataIndex: "order",
                    title: '排序'
                },
                {
                    key: 'del',
                    dataIndex: 'del',
                    render: (del, row) => {
                        return (
                            <div>
                                <Button size='small' onClick={() => { this.setState({ showEditPerDialog: true, editPerRow: row }) }} style={{ marginBottom: '5px' }} type='primary'>编辑</Button>
                                <Popconfirm
                                    title="你确认要删除吗？"
                                    okText="确认"
                                    cancelText='取消'
                                    onConfirm={() => {
                                        this.props.deletePer([row.id]).then(
                                            res => {
                                                message.info('删除成功！');
                                                let arr = this.state.selectedRowKeys;
                                                let index = arr.filter(item => item.id !== row.id);
                                                if (index >= 0) {
                                                    this.setState({ selectedRowKeys: arr.splice(index, 1) })
                                                }
                                                this.loadPerList();
                                            }
                                        ).catch(e => {
                                            message.error('删除失败！')
                                        })
                                    }}
                                >
                                    <Button size='small' type='danger'>删除</Button>
                                </Popconfirm>
                            </div>
                        )
                    }
                }

            ],

        }
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
                this.props.deletePer(this.state.selectedRowKeys).then(
                    res => {
                        message.info('删除成功！');
                        this.setState({ selectedRowKeys: [] })
                        this.loadPerList()
                    }
                ).catch(e => {
                    message.error('删除失败！')
                    this.loadPerList()
                })
            }
        })
    }

    buttonStyle = {
        margin: '5px',
    }

    handleEdit = () => {
        if (this.state.selectedRowKeys.length !== 1) {
            message.error("请选择一条数据！")
            return
        }
        let currentId = this.state.selectedRowKeys[0];
        let selectRow = this.props.perlist.find((item) => item.id === currentId);
        console.log(selectRow);
        this.setState({ showEditPerDialog: true, editPerRow: selectRow })
    }

    hideAddPerDialg = () => {
        this.setState({ showAddPerDialog: false })
    }

    hideEditPerDialg = () => {
        this.setState({ showEditPerDialog: false });
    }

    handleSearch = (value) => {
        this.setState(preState => {
            let newState = { ...preState };
            newState.params.q = value
            return newState;
        }, () => {
            this.loadPerList();
        })
    }

    changePage = (page, pageSize) => {
        this.setState(preState => {
            let params = { ...preState.params }
            params._page = page;
            params._limit = pageSize;
            return Object.assign({}, preState, { params })
        }, () => {
            this.loadPerList()
        });
    }

    loadPerList = () => {
        this.props.loadDataAsync(this.state.params);
    }

    componentDidMount() {
        this.loadPerList()
    }
    render() {
        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <a href="/home">首页</a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <a href="/home/per_mgr">权限管理</a>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <hr />
                <Button size='small' type='primary' onClick={() => { this.setState({ showAddPerDialog: true }) }} style={this.buttonStyle}>添加</Button>
                <Button size='small' type='danger' onClick={this.handleDelete} style={this.buttonStyle}>删除</Button>
                <Button size='small' type='primary' onClick={this.handleEdit} style={this.buttonStyle}>修改</Button>
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
                    dataSource={this.props.perlist}
                    columns={this.state.columns}
                    rowSelection={{
                        selectedRowKeys: this.state.selectedRowKeys,
                        onChange: (selectedRowKeys, selectedRows) => {
                            this.setState({ selectedRowKeys: selectedRowKeys })
                            console.log(selectedRowKeys, 'selectedRowKeys');
                        }
                    }}
                    rowKey="id"
                    pagination={{ total: this.props.total, pageSize: 6, defaultCurrent: 1, onChange: this.changePage }}
                >
                </Table>
                <AddPer
                    visible={this.state.showAddPerDialog}
                    close={this.hideAddPerDialg}
                    addPer={this.props.addPer}
                    loadPerList={this.loadPerList}
                />
                <EditPer
                    visible={this.state.showEditPerDialog}
                    close={this.hideEditPerDialg}
                    data={this.state.editPerRow}
                    editPer={this.props.editPer}
                    loadPerList={this.loadPerList}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    total: state.Perlist.total,
    perlist: state.Perlist.list
})

const mapDispatchToProps = (dispatch) => {
    return {
        loadDataAsync: (parmas) => {
            dispatch(LoadPerActionAsync(parmas));
        },
        addPer: (per) => {
            return dispatch(AddPerActionAsync(per))
        },
        editPer: (per) => {
            return dispatch(EditPerActionAsync(per))
        },
        deletePer: (ids) => {
            return dispatch(DeletePerActionAsync(ids))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PerMgr)

