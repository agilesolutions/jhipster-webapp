import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './product.reducer';
import { IProduct } from 'app/shared/model/product.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProductDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ProductDetail = (props: IProductDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { productEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="webappApp.product.detail.title">Product</Translate> [<b>{productEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="title">
              <Translate contentKey="webappApp.product.title">Title</Translate>
            </span>
          </dt>
          <dd>{productEntity.title}</dd>
          <dt>
            <span id="keywords">
              <Translate contentKey="webappApp.product.keywords">Keywords</Translate>
            </span>
          </dt>
          <dd>{productEntity.keywords}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="webappApp.product.description">Description</Translate>
            </span>
          </dt>
          <dd>{productEntity.description}</dd>
          <dt>
            <span id="rating">
              <Translate contentKey="webappApp.product.rating">Rating</Translate>
            </span>
          </dt>
          <dd>{productEntity.rating}</dd>
          <dt>
            <span id="dateAdded">
              <Translate contentKey="webappApp.product.dateAdded">Date Added</Translate>
            </span>
          </dt>
          <dd>
            {productEntity.dateAdded ? <TextFormat value={productEntity.dateAdded} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="dateModified">
              <Translate contentKey="webappApp.product.dateModified">Date Modified</Translate>
            </span>
          </dt>
          <dd>
            {productEntity.dateModified ? (
              <TextFormat value={productEntity.dateModified} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="webappApp.product.wishList">Wish List</Translate>
          </dt>
          <dd>{productEntity.wishList ? productEntity.wishList.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/product" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/product/${productEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ product }: IRootState) => ({
  productEntity: product.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
