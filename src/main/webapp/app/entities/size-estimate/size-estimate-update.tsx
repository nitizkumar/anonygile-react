import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { IBoard } from 'app/shared/model/board.model';
import { getEntities as getBoards } from 'app/entities/board/board.reducer';
import { getEntity, updateEntity, createEntity, reset } from './size-estimate.reducer';
import { ISizeEstimate } from 'app/shared/model/size-estimate.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ISizeEstimateUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const SizeEstimateUpdate = (props: ISizeEstimateUpdateProps) => {
  const [userId, setUserId] = useState('0');
  const [boardId, setBoardId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { sizeEstimateEntity, users, boards, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/size-estimate');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getUsers();
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
        ...sizeEstimateEntity,
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
          <h2 id="anonygileApp.sizeEstimate.home.createOrEditLabel">
            <Translate contentKey="anonygileApp.sizeEstimate.home.createOrEditLabel">Create or edit a SizeEstimate</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : sizeEstimateEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="size-estimate-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="size-estimate-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="sizeLabel" for="size-estimate-size">
                  <Translate contentKey="anonygileApp.sizeEstimate.size">Size</Translate>
                </Label>
                <AvField id="size-estimate-size" type="text" name="size" />
              </AvGroup>
              <AvGroup>
                <Label id="estimateLabel" for="size-estimate-estimate">
                  <Translate contentKey="anonygileApp.sizeEstimate.estimate">Estimate</Translate>
                </Label>
                <AvField id="size-estimate-estimate" type="string" className="form-control" name="estimate" />
              </AvGroup>
              <AvGroup>
                <Label for="size-estimate-user">
                  <Translate contentKey="anonygileApp.sizeEstimate.user">User</Translate>
                </Label>
                <AvInput id="size-estimate-user" type="select" className="form-control" name="user.id">
                  <option value="" key="0" />
                  {users
                    ? users.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="size-estimate-board">
                  <Translate contentKey="anonygileApp.sizeEstimate.board">Board</Translate>
                </Label>
                <AvInput id="size-estimate-board" type="select" className="form-control" name="board.id">
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
              <Button tag={Link} id="cancel-save" to="/size-estimate" replace color="info">
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
  users: storeState.userManagement.users,
  boards: storeState.board.entities,
  sizeEstimateEntity: storeState.sizeEstimate.entity,
  loading: storeState.sizeEstimate.loading,
  updating: storeState.sizeEstimate.updating,
  updateSuccess: storeState.sizeEstimate.updateSuccess,
});

const mapDispatchToProps = {
  getUsers,
  getBoards,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SizeEstimateUpdate);
