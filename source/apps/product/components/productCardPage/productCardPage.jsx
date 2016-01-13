'use strict';

import React  from 'react';
import {Row, Col} from 'react-bootstrap';
import productService from '../../services/productService';

export default React.createClass({
    getInitialState,
    componentDidMount,
    render
});

function getInitialState() {
    return {
        data: {}
    };
}

function componentDidMount() {
    _fetchData.call(this);
}

function render() {
    const {data} = this.state;
    return (
        <div>
            <Row className="row--moreMarginBottom">
                <Col md={12}>
                    <h3>{data.shortName}</h3>
                </Col>
            </Row>
        </div>
    );
}

function _fetchData() {
    const view = this;
    const {id} = this.props;

    productService.fetch({id}).then(
        data => {
            view.setState({data});
        }
    );
}
