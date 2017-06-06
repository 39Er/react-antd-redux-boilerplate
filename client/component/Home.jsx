'use strict';

import React from 'react';
import { Layout } from 'antd';

import HeadBar from './HeadBar';
import SideBar from './SideBar';
import Routes from './Routes';
// import Breadcrumbs from './Breadcrumbs';
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
            {/* <Breadcrumbs />*/}
            <Content id="content" className={'bg-white'}>
              <Routes />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}
