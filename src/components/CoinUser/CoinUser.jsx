import React, { Component } from 'react';

import { Table, Button } from 'antd';
import {
    Layout, Breadcrumb
} from 'antd';
import withAxios from '../../hoc/withAxios.js';

const { Content } = Layout;

class CoinUser extends Component {
    constructor(props) {
        super(props);
        this.props = props;

        this.state = {
            collapsed: false,
            columns: [{
                title: 'Id',
                dataIndex: '_id',
            }, {
                title: '用户账号',
                dataIndex: 'username',
            }, {
                title: '纪念币名',
                dataIndex: 'title',
            }, {
                title: '面值',
                dataIndex: 'value',
            }, {
                title: '兑换时间',
                dataIndex: 'changeDate',
            }, {
                title: '数量',
                dataIndex: 'num',
            }, {
                title: '操作',
                render: (text, record) => (
                    <span>
                        <Button type="danger">删除</Button>
                    </span>
                )
            }],
            data: [],
        };
    }

    async componentWillMount() {
        let value = sessionStorage.getItem('coinUser');
        if(value){
            this.setState({
                data: JSON.parse(value)
            })
        }else{
            let { axios } = this.props;
            let data = await axios.get('/item/coinuser');
            this.setState({
                data: data.data
            })
            sessionStorage.setItem('coinUser',JSON.stringify(data.data));
        }
    }

    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    }

    render() {
        return (
            <Layout>
                <Layout>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>主页</Breadcrumb.Item>
                            <Breadcrumb.Item>纪念币（用户）</Breadcrumb.Item>
                        </Breadcrumb>
                        <Content style={{
                            background: '#fff', padding: 24, margin: 0, minHeight: 490,
                        }}
                        >
                            <Table columns={this.state.columns} dataSource={this.state.data} onChange={this.onChange} />
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}

CoinUser = withAxios(CoinUser);
export default CoinUser