import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './task.reducer';
import { ITask } from 'app/shared/model/task.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITaskDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TaskDetail = (props: ITaskDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { taskEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="anonygileApp.task.detail.title">Task</Translate> [<b>{taskEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="title">
              <Translate contentKey="anonygileApp.task.title">Title</Translate>
            </span>
          </dt>
          <dd>{taskEntity.title}</dd>
          <dt>
            <span id="type">
              <Translate contentKey="anonygileApp.task.type">Type</Translate>
            </span>
          </dt>
          <dd>{taskEntity.type}</dd>
          <dt>
            <span id="status">
              <Translate contentKey="anonygileApp.task.status">Status</Translate>
            </span>
          </dt>
          <dd>{taskEntity.status}</dd>
          <dt>
            <span id="startDate">
              <Translate contentKey="anonygileApp.task.startDate">Start Date</Translate>
            </span>
          </dt>
          <dd>{taskEntity.startDate ? <TextFormat value={taskEntity.startDate} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="endDate">
              <Translate contentKey="anonygileApp.task.endDate">End Date</Translate>
            </span>
          </dt>
          <dd>{taskEntity.endDate ? <TextFormat value={taskEntity.endDate} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="priority">
              <Translate contentKey="anonygileApp.task.priority">Priority</Translate>
            </span>
          </dt>
          <dd>{taskEntity.priority}</dd>
          <dt>
            <span id="size">
              <Translate contentKey="anonygileApp.task.size">Size</Translate>
            </span>
          </dt>
          <dd>{taskEntity.size}</dd>
          <dt>
            <Translate contentKey="anonygileApp.task.bucket">Bucket</Translate>
          </dt>
          <dd>{taskEntity.bucket ? taskEntity.bucket.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/task" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/task/${taskEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ task }: IRootState) => ({
  taskEntity: task.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TaskDetail);
