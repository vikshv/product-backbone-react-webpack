import {Model} from 'backbone';
import preloading from 'core/helpers/preloadingDataGetter';

const groupTypes = preloading.get('ProductGroupTypes');

export default Model.extend({
    defaults: {
        query: '',
        groupType: groupTypes.all,
        sortOrder: null,
        sortColumn: null
    }
});
