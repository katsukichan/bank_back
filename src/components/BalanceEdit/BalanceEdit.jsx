import React, { Component } from 'react';
import qs from 'qs';
import {
    Layout, Breadcrumb, Button, Input
} from 'antd';
import withAxios from '../../hoc/withAxios.js';

const { Content } = Layout;

class BalanceEdit extends Component {
    constructor(props) {
        super(props);
        this.props = props;

        this.state = {};

        this.handleProduct = this.handleProduct.bind(this);
        this.handleBennefit = this.handleBennefit.bind(this);
        this.handlePrecent = this.handlePrecent.bind(this);
        this.handleStartPrice = this.handleStartPrice.bind(this);
        this.toBalance = this.toBalance.bind(this);
        this.editBalance = this.editBalance.bind(this);
    }

    async componentWillMount(){
        let id = this.props.match.params.id;
        let {axios} = this.props;
        let data = await axios.post('/item/getIdBalance',qs.stringify({
            id
        }))

        this.setState({
            id: id,
            product: data.data[0].product,
            bennefit: data.data[0].bennefit,
            precent: data.data[0].precent,
            startPrice: data.data[0].startPrice
        })
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

    //修改函数
    async editBalance(){
        if(this.state.product.trim() === '' || this.state.bennefit.trim() === '' || this.state.precent.trim() === '' || this.state.startPrice.trim() === ''){
            alert('输入框不能含有空内容');
        }else{
            let {axios} = this.props;
            let result = await axios.post('/item/upadteBalance',qs.stringify({
                id: this.state.id,
                sproduct: this.state.product.trim(),
                sbennefit: this.state.bennefit.trim(),
                sprecent: this.state.precent.trim(),
                sstartPrice: this.state.startPrice.trim()
            }))
            if(result.data === 'update balance success'){
                alert('修改成功');
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
                            <Breadcrumb.Item>理财（修改）</Breadcrumb.Item>
                        </Breadcrumb>
                        <Content style={{
                            background: '#fff', padding: 24, margin: 0, minHeight: 490,
                        }}
                        >
                            <Input style={{marginBottom: '20px'}} value={this.state.id} disabled={true} placeholder="产品id"/>
                            <Input style={{marginBottom: '20px'}} onChange={this.handleProduct} value={this.state.product} placeholder="产品名称"/>
                            <Input style={{marginBottom: '20px'}} onChange={this.handleBennefit} value={this.state.bennefit} placeholder="收益系数" />
                            <Input style={{marginBottom: '20px'}} onChange={this.handlePrecent} value={this.state.precent} placeholder="百分比" />
                            <Input style={{marginBottom: '20px'}} onChange={this.handleStartPrice} value={this.state.startPrice} placeholder="最低买入金额" />
                            <Button style={{marginRight: '20px'}} onClick={this.editBalance} type="primary">修改</Button>
                            <Button type="default" onClick={this.toBalance}>取消</Button>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}

BalanceEdit = withAxios(BalanceEdit);
export default BalanceEdit