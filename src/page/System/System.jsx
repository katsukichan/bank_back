import React,{Component} from 'react';
import { Route, Link } from "react-router-dom";
import './system.css';

import Balance from '../../components/Balance/Balance.jsx';
import BalanceUser from '../../components/BalanceUser/BalanceUser.jsx';
import BalanceAdd from '../../components/BalanceAdd/BalanceAdd.jsx';
import BalanceEdit from '../../components/BalanceEdit/BalanceEdit.jsx';
import Coin from '../../components/Coin/Coin.jsx';
import CoinUser from '../../components/CoinUser/CoinUser.jsx';
import PhoneFare from '../../components/PhoneFare/PhoneFare.jsx';
import PhoneUser from '../../components/PhoneUser/PhoneUser.jsx';
import User from '../../components/User/User.jsx';

import {
  Layout, Menu, Icon,
} from 'antd';

const { SubMenu } = Menu;
const { Header, Sider } = Layout;

class SystemModel extends Component {
    constructor(props){
        super(props);
        this.props = props;

        this.state = {
            collapsed: false,
        };

        this.toLogin = this.toLogin.bind(this);
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    toLogin(){
        this.props.history.push('/');
    }

    render() {
        return (
            <Layout>
                <Header className="header" style={{overflow: 'hidden'}}>
                    <h1 className="header_title">Bank后台管理系统</h1>
                    <ul className="header_ul">
                        <li><span onClick={this.toLogin} style={{color: '#fff',cursor: 'pointer'}}>登出</span></li>
                    </ul>
                </Header>
                <Layout>
                    <Sider width={200} style={{ background: '#fff' }}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100%', borderRight: 0 }}
                        >
                            <SubMenu key="sub1" title={<span><Icon type="money-collect" />余额理财</span>}>
                                    <Menu.Item key="1">
                                        <Link to="/system/balance">余额理财信息</Link>
                                    </Menu.Item>
                                    <Menu.Item key="2">
                                        <Link to="/system/balanceUser">用户订单信息</Link>
                                    </Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" title={<span><Icon type="pay-circle" />纪念币</span>}>
                                    <Menu.Item key="3">
                                        <Link to="/system/coin">纪念币信息</Link>
                                    </Menu.Item>
                                    <Menu.Item key="4">
                                        <Link to="/system/coinUser">用户订单信息</Link>                                        
                                    </Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub3" title={<span><Icon type="phone" />话费</span>}>
                                    <Menu.Item key="5">
                                        <Link to="/system/phone">话费信息</Link>
                                    </Menu.Item>
                                    <Menu.Item key="6">
                                        <Link to="/system/phoneUser">用户订单信息</Link>                                        
                                    </Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub4" title={<span><Icon type="user" />用户</span>}>
                                    <Menu.Item key="7">
                                        <Link to="/system/user">用户信息</Link>           
                                    </Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Route exact path="/system/balance" component={Balance}></Route>
                    <Route path="/system/balanceUser" component={BalanceUser}></Route>
                    <Route path="/system/balanceAdd" component={BalanceAdd}></Route>
                    <Route path="/system/balanceEdit/:id" component={BalanceEdit}></Route>

                    <Route path="/system/coin" component={Coin}></Route>
                    <Route path="/system/coinUser" component={CoinUser}></Route>

                    <Route path="/system/phone" component={PhoneFare}></Route>
                    <Route path="/system/phoneUser" component={PhoneUser}></Route>

                    <Route path="/system/user" component={User}></Route>
                </Layout>
            </Layout>
        );
    }
}

export default SystemModel