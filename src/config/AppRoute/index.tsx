import React from 'react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router-dom';
import { IonRouterOutlet } from '@ionic/react';
import { appRoute } from '@utils/constant';

import HomePage from '@pages/Home';

export const AppRoute: React.FC = () => (
  <>
    <Route path={appRoute.HOME} component={HomePage} exact={true} />
    <Route exact path={appRoute.DEFAULT} render={() => <Redirect to={appRoute.HOME} />} />
  </>
);

export default AppRoute;