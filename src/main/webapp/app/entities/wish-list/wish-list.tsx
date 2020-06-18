import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './wish-list.reducer';
import { IWishList } from 'app/shared/model/wish-list.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IWishListProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const WishList = (props: IWishListProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { wishListList, match, loading } = props;
  return (
    <div>
      <h2 id="wish-list-heading">
        <Translate contentKey="webappApp.wishList.home.title">Wish Lists</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="webappApp.wishList.home.createLabel">Create new Wish List</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {wishListList && wishListList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="webappApp.wishList.title">Title</Translate>
                </th>
                <th>
                  <Translate contentKey="webappApp.wishList.restricted">Restricted</Translate>
                </th>
                <th>
                  <Translate contentKey="webappApp.wishList.customer">Customer</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {wishListList.map((wishList, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${wishList.id}`} color="link" size="sm">
                      {wishList.id}
                    </Button>
                  </td>
                  <td>{wishList.title}</td>
                  <td>{wishList.restricted ? 'true' : 'false'}</td>
                  <td>{wishList.customer ? <Link to={`customer/${wishList.customer.id}`}>{wishList.customer.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${wishList.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${wishList.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${wishList.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="webappApp.wishList.home.notFound">No Wish Lists found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ wishList }: IRootState) => ({
  wishListList: wishList.entities,
  loading: wishList.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(WishList);
