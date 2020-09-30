import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './size-estimate.reducer';
import { ISizeEstimate } from 'app/shared/model/size-estimate.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISizeEstimateDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const SizeEstimateDetail = (props: ISizeEstimateDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { sizeEstimateEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="anonygileApp.sizeEstimate.detail.title">SizeEstimate</Translate> [<b>{sizeEstimateEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="size">
              <Translate contentKey="anonygileApp.sizeEstimate.size">Size</Translate>
            </span>
          </dt>
          <dd>{sizeEstimateEntity.size}</dd>
          <dt>
            <span id="estimate">
              <Translate contentKey="anonygileApp.sizeEstimate.estimate">Estimate</Translate>
            </span>
          </dt>
          <dd>{sizeEstimateEntity.estimate}</dd>
          <dt>
            <Translate contentKey="anonygileApp.sizeEstimate.user">User</Translate>
          </dt>
          <dd>{sizeEstimateEntity.user ? sizeEstimateEntity.user.id : ''}</dd>
          <dt>
            <Translate contentKey="anonygileApp.sizeEstimate.board">Board</Translate>
          </dt>
          <dd>{sizeEstimateEntity.board ? sizeEstimateEntity.board.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/size-estimate" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/size-estimate/${sizeEstimateEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ sizeEstimate }: IRootState) => ({
  sizeEstimateEntity: sizeEstimate.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SizeEstimateDetail);
