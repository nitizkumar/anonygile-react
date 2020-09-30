import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import TaskBucket from './task-bucket';
import TaskBucketDetail from './task-bucket-detail';
import TaskBucketUpdate from './task-bucket-update';
import TaskBucketDeleteDialog from './task-bucket-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TaskBucketUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TaskBucketUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TaskBucketDetail} />
      <ErrorBoundaryRoute path={match.url} component={TaskBucket} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={TaskBucketDeleteDialog} />
  </>
);

export default Routes;
