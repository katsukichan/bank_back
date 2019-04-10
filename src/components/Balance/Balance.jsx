import React, { Component } from 'react';
import qs from 'qs';
import {
  Table, Button, Divider, Layout, Breadcrumb
} from 'antd';
import withAxios from '../../hoc/withAxios.js';

const { Content } = Layout;

class Balance extends Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.state = {
      collapsed: false,
      columns: [{
        title: 'Id',
        dataIndex: '_id',
      }, {
        title: '产品名称',
        dataIndex: 'product',
      }, {
        title: '收益系数',
        dataIndex: 'bennefit',
      }, {
        title: '百分比',
        dataIndex: 'precent',
      }, {
        title: '最低买入金额',
        dataIndex: 'startPrice',
      }, {
        title: '操作',
        render: (text, record) => (
          <span>
            <Button onClick={this.editBalance} type="primary">修改</Button>
            <Divider type="vertical" />
            <Button onClick={this.delBalance} type="danger">删除</Button>
          </span>
        )
      }],
      data: [],
    }

    this.delBalance = this.delBalance.bind(this);
    this.editBalance = this.editBalance.bind(this);
  }

  //挂载前请求数据函数
  async componentWillMount() {
      let value = sessionStorage.getItem('balance');
      if(value){
        this.setState({
            data: JSON.parse(value)
        })
      }else{
        let { axios } = this.props;
        let data = await axios.get('/item/getBalance');
        this.setState({
          data: data.data
        })
        sessionStorage.setItem('balance',JSON.stringify(data.data));
      }
  }

  //跳转到添加页函数
  toAddPage(){
    this.props.history.push('/system/balanceAdd');
  }

  //删除数据按键
  async delBalance(e){
    let { axios } = this.props;
    let curId = e.target.parentElement.parentElement.parentElement.children[0].innerText;
    console.log(curId);
    let newArr = this.state.data.filter(item=>item._id !== curId);

    this.setState({
      ...this.state,
      data: newArr
    })

    //重置sessionStorage
    sessionStorage.removeItem('balance');
    sessionStorage.setItem('balance',JSON.stringify(newArr));

    //偷偷发请求删除
    await axios.post('/item/delBalance',qs.stringify({
      id: curId
    }))
  }

  //跳转修改页
  editBalance(e){
    //获取到当前行id
    let curId = e.target.parentElement.parentElement.parentElement.children[0].innerText;
    this.props.history.push({
      pathname: '/system/balanceEdit/' + curId, 
    });
  }

  render() {
    return (
      <Layout>
        <Layout>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>主页</Breadcrumb.Item>
              <Breadcrumb.Item>理财</Breadcrumb.Item>
            </Breadcrumb>
            <Content style={{
              background: '#fff', padding: 24, margin: 0, minHeight: 490,
            }}
            >
              <Button type="primary" style={{ marginBottom: '10px' }} onClick={this.toAddPage.bind(this)}>添加</Button>
              <Table columns={this.state.columns} dataSource={this.state.data} onChange={this.onChange} />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

Balance = withAxios(Balance);
export default Balance