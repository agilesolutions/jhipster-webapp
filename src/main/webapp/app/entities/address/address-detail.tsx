import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './address.reducer';
import { IAddress } from 'app/shared/model/address.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAddressDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AddressDetail = (props: IAddressDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { addressEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="webappApp.address.detail.title">Address</Translate> [<b>{addressEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="address1">
              <Translate contentKey="webappApp.address.address1">Address 1</Translate>
            </span>
          </dt>
          <dd>{addressEntity.address1}</dd>
          <dt>
            <span id="address2">
              <Translate contentKey="webappApp.address.address2">Address 2</Translate>
            </span>
          </dt>
          <dd>{addressEntity.address2}</dd>
          <dt>
            <span id="city">
              <Translate contentKey="webappApp.address.city">City</Translate>
            </span>
          </dt>
          <dd>{addressEntity.city}</dd>
          <dt>
            <span id="postcode">
              <Translate contentKey="webappApp.address.postcode">Postcode</Translate>
            </span>
          </dt>
          <dd>{addressEntity.postcode}</dd>
          <dt>
            <span id="country">
              <Translate contentKey="webappApp.address.country">Country</Translate>
            </span>
          </dt>
          <dd>{addressEntity.country}</dd>
          <dt>
            <Translate contentKey="webappApp.address.customer">Customer</Translate>
          </dt>
          <dd>{addressEntity.customer ? addressEntity.customer.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/address" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/address/${addressEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ address }: IRootState) => ({
  addressEntity: address.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AddressDetail);
