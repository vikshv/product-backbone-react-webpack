import React  from 'react';
import {Row, Col} from 'react-bootstrap';

import productCollectionService from '../../services/productCollectionService';
import searchFilterService from '../../services/searchFilterService';

import PaginatorView from './paginator';
import TableView from './table';
import FilterView from './filter';
import DefaultToolbarView from './toolbarDefault';
import SelectedToolbarView from './toolbarSelected';

export default React.createClass({
    render() {
        const ToolbarView = this._getToolbarView();
        const FilterView = _getFilterView.call(this);
        const TableView = _getTableView.call(this);
        const PaginatorView = _getPaginatorView.call(this);

        return (
            <div>
                <Row className="row--moreMarginBottom">
                    <Col md={12}>
                        <h3>Продукты</h3>
                    </Col>
                </Row>
                <Row className="row--moreMarginBottom">
                    <Col md={8}>
                        {ToolbarView}
                    </Col>
                    <Col md={4}>
                        {FilterView}
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        {TableView}
                    </Col>
                </Row>
                <Row className="row--moreMarginBottom">
                    <Col md={12}>
                        {PaginatorView}
                    </Col>
                </Row>
            </div>
        );
    },

    _getToolbarView() {
        const {data} = this.props;
        const isChecked = data.some(item => item.checked);
        return isChecked ? this._getSelectedToolbar() : this._getDefaultToolbar();;
    },

    _getSelectedToolbar() {
        return <SelectedToolbarView />;
    },

    _getDefaultToolbar(options = {}) {
        const filterServices = {searchFilterService};
        return <DefaultToolbarView disabled={options.disabled} services={filterServices} />;
    }
});

function _getFilterView() {
    const filterServices = {searchFilterService};
    return (
        <FilterView services={filterServices} />
    );
}

function _getTableView() {
    const { data, loading, isAppend } = this.props;
    const filter = searchFilterService.getFilterData();
    const handlers = _getTableHandlers.call(this);
    return (
        <TableView data={ data } loading={ loading } isAppend={ isAppend } filter={ filter } handlers={ handlers } />
    );
}

function _getTableHandlers() {
    return {
        onChangeTableChecked: (value) => {
            productCollectionService.setChecked(value);
        },
        onChangeRowChecked: (id, value) => {
            productCollectionService.setCheckedModel(value, id);
        }
    };
}

function _getPaginatorView() {
    const {data} = this.props;
    const dataLength = data.length;
    const maxSize = productCollectionService.getSize();

    let result;

    if (dataLength < maxSize) {
        const handlers = _getPaginatorHandlers.call(this);
        result = (
            <PaginatorView maxSize={maxSize} handlers={handlers} />
        );
    }

    return result;
}

function _getPaginatorHandlers() {
    const {handlers} = this.props;
    return {
        onClickShowMore: handlers.onClickShowMore,
        onClickShowAll: handlers.onClickShowAll
    };
}
