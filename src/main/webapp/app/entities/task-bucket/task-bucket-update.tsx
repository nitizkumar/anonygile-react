import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IBoard } from 'app/shared/model/board.model';
import { getEntities as getBoards } from 'app/entities/board/board.reducer';
import { getEntity, updateEntity, createEntity, reset } from './task-bucket.reducer';
import { ITaskBucket } from 'app/shared/model/task-bucket.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ITaskBucketUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TaskBucketUpdate = (props: ITaskBucketUpdateProps) => {
  const [boardId, setBoardId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { taskBucketEntity, boards, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/task-bucket');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getBoards();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...taskBucketEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="anonygileApp.taskBucket.home.createOrEditLabel">
            <Translate contentKey="anonygileApp.taskBucket.home.createOrEditLabel">Create or edit a TaskBucket</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : taskBucketEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="task-bucket-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="task-bucket-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="task-bucket-name">
                  <Translate contentKey="anonygileApp.taskBucket.name">Name</Translate>
                </Label>
                <AvField id="task-bucket-name" type="text" name="name" />
              </AvGroup>
              <AvGroup>
                <Label id="statusLabel" for="task-bucket-status">
                  <Translate contentKey="anonygileApp.taskBucket.status">Status</Translate>
                </Label>
                <AvInput
                  id="task-bucket-status"
                  type="select"
                  className="form-control"
                  name="status"
                  value={(!isNew && taskBucketEntity.status) || 'PLANNED'}
                >
                  <option value="PLANNED">{translate('anonygileApp.TaskStatus.PLANNED')}</option>
                  <option value="IN_PROGRESS">{translate('anonygileApp.TaskStatus.IN_PROGRESS')}</option>
                  <option value="COMPLETE">{translate('anonygileApp.TaskStatus.COMPLETE')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="task-bucket-board">
                  <Translate contentKey="anonygileApp.taskBucket.board">Board</Translate>
                </Label>
                <AvInput id="task-bucket-board" type="select" className="form-control" name="board.id">
                  <option value="" key="0" />
                  {boards
                    ? boards.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/task-bucket" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  boards: storeState.board.entities,
  taskBucketEntity: storeState.taskBucket.entity,
  loading: storeState.taskBucket.loading,
  updating: storeState.taskBucket.updating,
  updateSuccess: storeState.taskBucket.updateSuccess,
});

const mapDispatchToProps = {
  getBoards,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TaskBucketUpdate);
