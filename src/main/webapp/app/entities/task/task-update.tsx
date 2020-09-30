import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ITaskBucket } from 'app/shared/model/task-bucket.model';
import { getEntities as getTaskBuckets } from 'app/entities/task-bucket/task-bucket.reducer';
import { getEntity, updateEntity, createEntity, reset } from './task.reducer';
import { ITask } from 'app/shared/model/task.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ITaskUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TaskUpdate = (props: ITaskUpdateProps) => {
  const [bucketId, setBucketId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { taskEntity, taskBuckets, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/task');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getTaskBuckets();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.startDate = convertDateTimeToServer(values.startDate);
    values.endDate = convertDateTimeToServer(values.endDate);

    if (errors.length === 0) {
      const entity = {
        ...taskEntity,
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
          <h2 id="anonygileApp.task.home.createOrEditLabel">
            <Translate contentKey="anonygileApp.task.home.createOrEditLabel">Create or edit a Task</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : taskEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="task-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="task-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="titleLabel" for="task-title">
                  <Translate contentKey="anonygileApp.task.title">Title</Translate>
                </Label>
                <AvField id="task-title" type="text" name="title" />
              </AvGroup>
              <AvGroup>
                <Label id="typeLabel" for="task-type">
                  <Translate contentKey="anonygileApp.task.type">Type</Translate>
                </Label>
                <AvInput id="task-type" type="select" className="form-control" name="type" value={(!isNew && taskEntity.type) || 'STORY'}>
                  <option value="STORY">{translate('anonygileApp.TaskType.STORY')}</option>
                  <option value="TASK">{translate('anonygileApp.TaskType.TASK')}</option>
                  <option value="EPIC">{translate('anonygileApp.TaskType.EPIC')}</option>
                  <option value="BUG">{translate('anonygileApp.TaskType.BUG')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="statusLabel" for="task-status">
                  <Translate contentKey="anonygileApp.task.status">Status</Translate>
                </Label>
                <AvInput
                  id="task-status"
                  type="select"
                  className="form-control"
                  name="status"
                  value={(!isNew && taskEntity.status) || 'PLANNED'}
                >
                  <option value="PLANNED">{translate('anonygileApp.TaskStatus.PLANNED')}</option>
                  <option value="IN_PROGRESS">{translate('anonygileApp.TaskStatus.IN_PROGRESS')}</option>
                  <option value="COMPLETE">{translate('anonygileApp.TaskStatus.COMPLETE')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="startDateLabel" for="task-startDate">
                  <Translate contentKey="anonygileApp.task.startDate">Start Date</Translate>
                </Label>
                <AvInput
                  id="task-startDate"
                  type="datetime-local"
                  className="form-control"
                  name="startDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.taskEntity.startDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="endDateLabel" for="task-endDate">
                  <Translate contentKey="anonygileApp.task.endDate">End Date</Translate>
                </Label>
                <AvInput
                  id="task-endDate"
                  type="datetime-local"
                  className="form-control"
                  name="endDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.taskEntity.endDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="priorityLabel" for="task-priority">
                  <Translate contentKey="anonygileApp.task.priority">Priority</Translate>
                </Label>
                <AvField id="task-priority" type="string" className="form-control" name="priority" />
              </AvGroup>
              <AvGroup>
                <Label id="sizeLabel" for="task-size">
                  <Translate contentKey="anonygileApp.task.size">Size</Translate>
                </Label>
                <AvField id="task-size" type="text" name="size" />
              </AvGroup>
              <AvGroup>
                <Label for="task-bucket">
                  <Translate contentKey="anonygileApp.task.bucket">Bucket</Translate>
                </Label>
                <AvInput id="task-bucket" type="select" className="form-control" name="bucket.id">
                  <option value="" key="0" />
                  {taskBuckets
                    ? taskBuckets.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/task" replace color="info">
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
  taskBuckets: storeState.taskBucket.entities,
  taskEntity: storeState.task.entity,
  loading: storeState.task.loading,
  updating: storeState.task.updating,
  updateSuccess: storeState.task.updateSuccess,
});

const mapDispatchToProps = {
  getTaskBuckets,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TaskUpdate);
