import React, { Component } from 'react';
import qs from 'qs';
import {
    Layout, Breadcrumb, Button, Input
} from 'antd';
import withAxios from '../../hoc/withAxios.js';

const { Content } = Layout;

class BalanceAdd extends Component {
    constructor(props) {
        super(props);
        this.props = props;

        this.state = {
            product: '',
            bennefit: '',
            precent: '',
            startPrice: ''
        };

        this.handleProduct = this.handleProduct.bind(this);
        this.handleBennefit = this.handleBennefit.bind(this);
        this.handlePrecent = this.handlePrecent.bind(this);
        this.handleStartPrice = this.handleStartPrice.bind(this);
        this.toBalance = this.toBalance.bind(this);
        this.addBalance = this.addBalance.bind(this);
    }
    //input输入框赋值函数
    handleProduct(event){
        this.setState({
            ...this.state,
            product: event.target.value
        })
    }

    handleBennefit(event){
        this.setState({
            ...this.state,
            bennefit: event.target.value
        })
    }

    handlePrecent(event){
        this.setState({
            ...this.state,
            precent: event.target.value
        })
    }

    handleStartPrice(event){
        this.setState({
            ...this.state,
            startPrice: event.target.value
        })
    }

    //路由跳转函数
    toBalance(){
        this.props.history.push('/system/balance');
    }

    //添加函数
    async addBalance(){
        if(this.state.product.trim() === '' || this.state.bennefit.trim() === '' || this.state.precent.trim() === '' || this.state.startPrice.trim() === ''){
            alert('输入框不能含有空内容');
        }else{
            let {axios} = this.props;
            let result = await axios.post('/item/addBalance',qs.stringify({
                sproduct: this.state.product.trim(),
                sbennefit: this.state.bennefit.trim(),
                sprecent: this.state.precent.trim(),
                sstartPrice: this.state.startPrice.trim()
            }))
            if(result.data === 'add balance success'){
                alert('添加成功');
                sessionStorage.removeItem('balance');
                this.toBalance();
            }
        }
    }

    render() {
        return (
            <Layout>
                <Layout>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>主页</Breadcrumb.Item>
                            <Breadcrumb.Item>理财（添加）</Breadcrumb.Item>
                        </Breadcrumb>
                        <Content style={{
                            background: '#fff', padding: 24, margin: 0, minHeight: 490,
                        }}
                        >
                           <Input style={{marginBottom: '20px'}} onChange={this.handleProduct} placeholder="产品名称"/>
                           <Input style={{marginBottom: '20px'}} onChange={this.handleBennefit} placeholder="收益系数" />
                           <Input style={{marginBottom: '20px'}} onChange={this.handlePrecent} placeholder="百分比" />
                           <Input style={{marginBottom: '20px'}} onChange={this.handleStartPrice} placeholder="最低买入金额" />
                           <Button style={{marginRight: '20px'}} onClick={this.addBalance} type="primary">添加</Button>
                           <Button type="default" onClick={this.toBalance}>取消</Button>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}

BalanceAdd = withAxios(BalanceAdd);
export default BalanceAdd