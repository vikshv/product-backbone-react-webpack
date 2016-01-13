import _ from 'underscore';
import ajaxRequest from 'core/helpers/ajaxRequest';
import ProductCollectionServiceModel from './ProductCollectionServiceModel';
import searchFilterService from '../searchFilterService';

const fetchBlockSize = 20;
const appendFetchMode = 'append';
const model = new ProductCollectionServiceModel();
const collection = model.productCollection;

export default {
    getCollectionData() {
        return collection.toJSON();
    },

    isLoading() {
        return model.get('loading');
    },

    isAppend() {
        return model.get('fetchMode') === appendFetchMode;
    },

    getSize() {
        return model.get('maxSize');
    },

    fetchData() {
        const reset = true;
        return _fetchData({reset});
    },

    appendData() {
        const fetchMode = appendFetchMode;
        return _fetchData({fetchMode});
    },

    onChange(callback) {
        model.on('change', callback);
        collection.on('change remove', callback);
    },

    offChange(callback) {
        model.off('change', callback);
        collection.off('change remove', callback);
    },

    setChecked(value) {
        collection.setAttr('checked', value);
    },

    setCheckedModel(value, id) {
        collection.setAttrModel('checked', value, id);
    },

    _getCheckedModels() {
        return collection.where({checked: true});
    },

    getCheckedIds() {
        const models = this._getCheckedModels();
        return models.map(model => model.get('id'));
    },

    isSomeCheckedShared() {
        const models = this._getCheckedModels();
        return _.some(models, model => model.get('shared'));
    },

    deleteProducts(ids) {
        const ajaxOptions = this._getDeleteRequestOptions(ids);
        return ajaxRequest(ajaxOptions).then(
            () => {
                const maxSize = model.get('maxSize');
                const models = collection.filter(model => _.contains(ids, model.get('id')));
                model.set('maxSize', maxSize - models.length);
                collection.remove(models);
            },
            () => {

            }
        );
    },

    _getDeleteRequestOptions(ids) {
        return {
            type: 'POST',
            url: '/product/delete',
            data: {ids}
        };
    }
};

searchFilterService.onChange(() => {
    collection.reset();
    model.set('maxSize', 0);
    _fetchData({fetchMode: 'append'});
});

function _fetchData(options = {}) {
    const {fetchMode} = options;
    const ajaxOptions = _getAjaxRequestOptions(fetchMode);

    model.set({
        loading: true,
        fetchMode
    });

    return ajaxRequest(ajaxOptions).then(
        response => {
            const {list} = response;
            if (fetchMode === 'append') {
                collection.add(list);
            } else {
                collection.reset(list);
            }
            model.set({
                maxSize: response.size,
                loading: false
            });
        },
        () => {
            model.set('loading', false);
        }
    );
}

function _getAjaxRequestOptions(fetchMode) {
    const size = fetchBlockSize;
    const count = fetchMode === 'append' ? collection.length : null;
    const filterData = searchFilterService.getFilterData();
    const data = _.extend(filterData, {count, size});

    return {
        type: 'POST',
        url: '/product/table',
        data
    };
}
