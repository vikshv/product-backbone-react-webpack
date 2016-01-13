import {Collection} from 'backbone';
import ProductModel from './productModel.js';

export default Collection.extend({
    model: ProductModel,

    setAttr(name, value) {
        this.each(model => {
            model.set(name, value);
        });
    },

    setAttrModel(name, value, id) {
        const model = this.findWhere({id});
        model.set(name, value);
    }
});
