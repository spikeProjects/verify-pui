import React from 'react';
import { Switch } from "react-router-dom";
import { renderRoutes } from 'react-router-config';

import roles from './shared/constants/roles';
import authorizeRoute from './shared/components/authorizedRoute';

import NotFound from './modules/notFound';
import ExampleModule from './modules/exampleModule';
import asyncComponent from './shared/containers/asyncComponent';
import TypescriptStarter from './modules/typescriptStarter';

const routesFactory = function(role) {
  const routes = [
    {
      id: 'root',
      path: '/',
      exact: true,
      component: authorizeRoute(roles.ALL, role)(NotFound)
    },
    {
      id: 'example',
      path: '/example',
      component: ExampleModule
    },
    {
      id: 'typescriptStarter',
      path: '/typescriptStarter',
      component: TypescriptStarter
    },
    {
      id: 'lazy',
      path: '/lazy',
      component: authorizeRoute(roles.ALL, role)(asyncComponent(() => import('./modules/lazyModule/lazyModule')))
      // component: asyncComponent(() => import('./modules/lazyModule/lazyModule'))
    },
    {
      id: 'redirect',
      component: NotFound
    }
  ];

  return (
    <Switch>
      {renderRoutes(routes)}
    </Switch>
  );
};
export default routesFactory;
