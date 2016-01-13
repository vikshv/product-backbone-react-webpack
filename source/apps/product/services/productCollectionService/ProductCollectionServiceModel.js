import {Model} from 'backbone';
import ProductCollection from '../../domain/product/productCollection';

export default Model.extend({
    defaults: {
        fetchMode: 'append',
        loading: false,
        maxSize: 0
    },

    initialize() {
        this.productCollection = new ProductCollection();
    }
});
