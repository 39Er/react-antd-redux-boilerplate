'use strict';

import React from 'react';
import { Layout, Breadcrumb } from 'antd';

import HeadBar from './HeadBar';
import SideBar from './SideBar';
import '../asserts/css/home.css';

const { Header, Content } = Layout;

export default class Home extends React.Component {
  render() {
    return (
      <Layout id="homeLayout">
        <Header>
          <HeadBar />
        </Header>
        <Layout id="main">
          <SideBar />
          <Layout id="rightLayout">
            <Breadcrumb style={{ margin: '12px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content id="content" className={'bg-white'}>
              Content
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}
