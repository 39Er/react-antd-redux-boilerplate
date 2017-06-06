'use strict';

import React from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

const Breadcrumbs = (props) => {
  console.log(props);
  function itemRender(route, params, routes, paths) {
    const last = routes.indexOf(route) === routes.length - 1;
    return last ? <span>{route.breadcrumbName}</span>
      : <Link to={paths.join('/')}>{route.breadcrumbName}</Link>;
  }
  return (
    <Breadcrumb id="breadcrumb" itemRender={itemRender} />
  );
};
export default Breadcrumbs;

