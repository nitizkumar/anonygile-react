import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './task-bucket.reducer';
import { ITaskBucket } from 'app/shared/model/task-bucket.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITaskBucketProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const TaskBucket = (props: ITaskBucketProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { taskBucketList, match, loading } = props;
  return (
    <div>
      <h2 id="task-bucket-heading">
        <Translate contentKey="anonygileApp.taskBucket.home.title">Task Buckets</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="anonygileApp.taskBucket.home.createLabel">Create new Task Bucket</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {taskBucketList && taskBucketList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="anonygileApp.taskBucket.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="anonygileApp.taskBucket.status">Status</Translate>
                </th>
                <th>
                  <Translate contentKey="anonygileApp.taskBucket.board">Board</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {taskBucketList.map((taskBucket, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${taskBucket.id}`} color="link" size="sm">
                      {taskBucket.id}
                    </Button>
                  </td>
                  <td>{taskBucket.name}</td>
                  <td>
                    <Translate contentKey={`anonygileApp.TaskStatus.${taskBucket.status}`} />
                  </td>
                  <td>{taskBucket.board ? <Link to={`board/${taskBucket.board.id}`}>{taskBucket.board.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${taskBucket.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${taskBucket.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${taskBucket.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="anonygileApp.taskBucket.home.notFound">No Task Buckets found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ taskBucket }: IRootState) => ({
  taskBucketList: taskBucket.entities,
  loading: taskBucket.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TaskBucket);
