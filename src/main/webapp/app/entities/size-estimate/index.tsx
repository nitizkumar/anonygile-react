import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import SizeEstimate from './size-estimate';
import SizeEstimateDetail from './size-estimate-detail';
import SizeEstimateUpdate from './size-estimate-update';
import SizeEstimateDeleteDialog from './size-estimate-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={SizeEstimateUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={SizeEstimateUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={SizeEstimateDetail} />
      <ErrorBoundaryRoute path={match.url} component={SizeEstimate} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={SizeEstimateDeleteDialog} />
  </>
);

export default Routes;
