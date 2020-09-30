import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './task.reducer';
import { ITask } from 'app/shared/model/task.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITaskProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Task = (props: ITaskProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { taskList, match, loading } = props;
  return (
    <div>
      <h2 id="task-heading">
        <Translate contentKey="anonygileApp.task.home.title">Tasks</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="anonygileApp.task.home.createLabel">Create new Task</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {taskList && taskList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="anonygileApp.task.title">Title</Translate>
                </th>
                <th>
                  <Translate contentKey="anonygileApp.task.type">Type</Translate>
                </th>
                <th>
                  <Translate contentKey="anonygileApp.task.status">Status</Translate>
                </th>
                <th>
                  <Translate contentKey="anonygileApp.task.startDate">Start Date</Translate>
                </th>
                <th>
                  <Translate contentKey="anonygileApp.task.endDate">End Date</Translate>
                </th>
                <th>
                  <Translate contentKey="anonygileApp.task.priority">Priority</Translate>
                </th>
                <th>
                  <Translate contentKey="anonygileApp.task.size">Size</Translate>
                </th>
                <th>
                  <Translate contentKey="anonygileApp.task.bucket">Bucket</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {taskList.map((task, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${task.id}`} color="link" size="sm">
                      {task.id}
                    </Button>
                  </td>
                  <td>{task.title}</td>
                  <td>
                    <Translate contentKey={`anonygileApp.TaskType.${task.type}`} />
                  </td>
                  <td>
                    <Translate contentKey={`anonygileApp.TaskStatus.${task.status}`} />
                  </td>
                  <td>{task.startDate ? <TextFormat type="date" value={task.startDate} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{task.endDate ? <TextFormat type="date" value={task.endDate} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{task.priority}</td>
                  <td>{task.size}</td>
                  <td>{task.bucket ? <Link to={`task-bucket/${task.bucket.id}`}>{task.bucket.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${task.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${task.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${task.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="anonygileApp.task.home.notFound">No Tasks found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ task }: IRootState) => ({
  taskList: task.entities,
  loading: task.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Task);
