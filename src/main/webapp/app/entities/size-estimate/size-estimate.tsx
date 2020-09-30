import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './size-estimate.reducer';
import { ISizeEstimate } from 'app/shared/model/size-estimate.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISizeEstimateProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const SizeEstimate = (props: ISizeEstimateProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { sizeEstimateList, match, loading } = props;
  return (
    <div>
      <h2 id="size-estimate-heading">
        <Translate contentKey="anonygileApp.sizeEstimate.home.title">Size Estimates</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="anonygileApp.sizeEstimate.home.createLabel">Create new Size Estimate</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {sizeEstimateList && sizeEstimateList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="anonygileApp.sizeEstimate.size">Size</Translate>
                </th>
                <th>
                  <Translate contentKey="anonygileApp.sizeEstimate.estimate">Estimate</Translate>
                </th>
                <th>
                  <Translate contentKey="anonygileApp.sizeEstimate.user">User</Translate>
                </th>
                <th>
                  <Translate contentKey="anonygileApp.sizeEstimate.board">Board</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {sizeEstimateList.map((sizeEstimate, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${sizeEstimate.id}`} color="link" size="sm">
                      {sizeEstimate.id}
                    </Button>
                  </td>
                  <td>{sizeEstimate.size}</td>
                  <td>{sizeEstimate.estimate}</td>
                  <td>{sizeEstimate.user ? sizeEstimate.user.id : ''}</td>
                  <td>{sizeEstimate.board ? <Link to={`board/${sizeEstimate.board.id}`}>{sizeEstimate.board.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${sizeEstimate.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${sizeEstimate.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${sizeEstimate.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="anonygileApp.sizeEstimate.home.notFound">No Size Estimates found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ sizeEstimate }: IRootState) => ({
  sizeEstimateList: sizeEstimate.entities,
  loading: sizeEstimate.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SizeEstimate);
