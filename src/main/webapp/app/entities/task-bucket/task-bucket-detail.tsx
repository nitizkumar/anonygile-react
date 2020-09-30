import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './task-bucket.reducer';
import { ITaskBucket } from 'app/shared/model/task-bucket.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITaskBucketDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TaskBucketDetail = (props: ITaskBucketDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { taskBucketEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="anonygileApp.taskBucket.detail.title">TaskBucket</Translate> [<b>{taskBucketEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="anonygileApp.taskBucket.name">Name</Translate>
            </span>
          </dt>
          <dd>{taskBucketEntity.name}</dd>
          <dt>
            <span id="status">
              <Translate contentKey="anonygileApp.taskBucket.status">Status</Translate>
            </span>
          </dt>
          <dd>{taskBucketEntity.status}</dd>
          <dt>
            <Translate contentKey="anonygileApp.taskBucket.board">Board</Translate>
          </dt>
          <dd>{taskBucketEntity.board ? taskBucketEntity.board.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/task-bucket" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/task-bucket/${taskBucketEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ taskBucket }: IRootState) => ({
  taskBucketEntity: taskBucket.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TaskBucketDetail);
