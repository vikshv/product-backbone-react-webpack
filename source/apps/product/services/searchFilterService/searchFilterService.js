import SearchFilterModel from './searchFilterModel';

const model = new SearchFilterModel();

export default {
    onChange(callback) {
        model.on('change', callback);
    },

    offChange(callback) {
        model.off('change', callback);
    },

    getFilterData() {
        return model.toJSON();
    },

    setQuery(value) {
        model.set('query', value);
    },

    getGroupType() {
        return model.get('groupType');
    },

    setGroupType(value) {
        model.set('groupType', value);
    },

    getTags() {
        return model.get('tags');
    },

    addTag() {
        const tags = getTags();
        const isExist = tags.find(name => name === tagName);

        if (!isExist) {
            tags.push(tagName);
            model.trigger('change:tags', tags);
        }
    },

    removeTag() {
    },

    clearTags() {
    }
};
