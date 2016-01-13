import React  from 'react';
import ProductForm from './ProductForm.jsx';
import productService from '../../services/productService';

function getProductState() {
    return productService.getData();
}

export default React.createClass({
    getInitialState() {
        const {id} = this.props;
        const data = getProductState();
        return {data, loading: !!id};
    },

    componentDidMount() {
        const {id} = this.props;
        productService.onChange(this._onChangeProduct);
        if (id) {
            this._fetchProduct(id);
        }
    },

    componentWillUnmount() {
        productService.offChange(this._onChangeProduct);
        productService.clearModel();
    },

    _onChangeProduct() {
        const data = getProductState();
        this.setState({data});
    },

    _fetchProduct(id) {
        const view = this;
        productService.fetch({id}).then(
            () => {
                view.setState({loading: false});
            },
            () => {
                console.log('Fetch product error');
            }
        );
    },

    render() {
        const {loading} = this.state;
        const content = loading ? this._getLoading() : this._getContent();
        return content;
    },

    _getLoading() {
        return (
            <div className="productForm--loading">
                <i className="fa fa-4x fa-spinner fa-spin"></i>
            </div>
        );
    },

    _getContent() {
        const {data, validationError} = this.state;
        return <ProductForm data={data} validationError={validationError} onSubmit={this._onSubmit} onCancel={this._onCancel} />;
    },

    _onSubmit() {
        const view = this;
        const isValid = productService.isValid();
        const validationError = productService.getValidationError();

        this.setState({validationError});
        
        if (isValid) {
            productService.save().then(
                () => {
                    view._gotoBackPage();
                },
                () => {
                    console.log('Save product error');
                }
            );
        }
    },

    _onCancel() {
        this._gotoBackPage();
    },

    _gotoBackPage() {
        const {history} = window;
        const {length} = history;
        if (2 < length) {
            history.back();
        } else {
            window.location = '/';
        }
    }
});
