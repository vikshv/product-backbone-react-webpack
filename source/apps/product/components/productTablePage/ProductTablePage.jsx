import React  from 'react';
import { Row, Col } from 'react-bootstrap';

import productCollectionService from '../../services/productCollectionService';
import ProductTable from './ProductTable.jsx';

function getState() {
    const loading = productCollectionService.isLoading();
    const data = productCollectionService.getCollectionData();
    return {
        data,
        loading
    };
}

export default React.createClass({
    getInitialState() {
        return getState();
    },

    componentDidMount() {
        this._bindEvents();
        this._appendData();
    },

    componentWillUnmount() {
        this._unbindEvents();
    },

    _bindEvents() {
        productCollectionService.onChange(this._onChangeCollection);
    },

    _unbindEvents() {
        productCollectionService.offChange(this._onChangeCollection);
    },

    _onChangeAuth() {
        const state = getState();
        this.setState(state);
    },

    _onChangeCollection() {
        const state = getState();
        this.setState(state);
    },

    _fetchData() {
        productCollectionService.fetchData().then(
            null,
            () => {
                console.log('fetch error');
            }
        );
    },

    _appendData() {
        productCollectionService.appendData().then(
            null,
            () => {
                console.log('append error');
            }
        );
    },

    render() {
        const {data, loading} = this.state;
        const handlers = this._getHandlers();
        const isAppend = productCollectionService.isAppend();
        return (
            <ProductTable data={data} loading={loading} isAppend={isAppend} handlers={handlers} />
        );
    },

    _getHandlers() {
        return {
            onClickShowMore: () => {
                this._appendData();
            },
            onClickShowAll: () => {
                this._fetchData();
            }
        };
    }
});
