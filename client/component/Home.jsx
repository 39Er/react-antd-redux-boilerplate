'use strict';

import React from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { Link } from 'react-router-dom';

import HeadBar from './HeadBar';
import '../asserts/css/home.css';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export default class Home extends React.Component {
  render() {
    return (
      <Layout style={{ height: '100%' }}>
        <Header>
          <HeadBar />
        </Header>
        <Layout >
          <Sider width={200} style={{ background: '#fff' }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
            >
              <SubMenu key="sub1" title={<span><Icon type="user" />subnav 1</span>}>
                <Menu.Item key="1"><Link to="/sub1/option1">option1</Link></Menu.Item>
                <Menu.Item key="2"><Link to="/sub1/option2">option2</Link></Menu.Item>
                <Menu.Item key="3"><Link to="/sub1/option3">option3</Link></Menu.Item>
                <Menu.Item key="4"><Link to="/sub1/option4">option4</Link></Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" title={<span><Icon type="laptop" />subnav 2</span>}>
                <Menu.Item key="5">option5</Menu.Item>
                <Menu.Item key="6">option6</Menu.Item>
                <Menu.Item key="7">option7</Menu.Item>
                <Menu.Item key="8">option8</Menu.Item>
              </SubMenu>
              <SubMenu key="sub3" title={<span><Icon type="notification" />subnav 3</span>}>
                <Menu.Item key="9">option9</Menu.Item>
                <Menu.Item key="10">option10</Menu.Item>
                <Menu.Item key="11">option11</Menu.Item>
                <Menu.Item key="12">option12</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '12px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content style={{ background: '#fff', padding: 24, margin: 0 }}>
              Content
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}
