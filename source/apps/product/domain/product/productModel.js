'use strict';

import Backbone from 'backbone';
import _ from 'underscore';

const weightLimit = 100;

const validateMessage = {
    valueLimit: 'Должно быть меньше 100 г',
    sumLimit: 'Сумма белков, жиров и углеводов должна быть меньше 100 г'
};

export default Backbone.Model.extend({
    defaults: {
    	id: null,
    	shortName: '',
        longName: '',

        protein: null,
        fat: null,
        carbs: null,
        calory: null
    },

    initialize: function(attributes, options = {}) {
        const {bindEvents} = options;
        if (bindEvents) {
            this._bindEvents();
        }
    },

    _bindEvents: function() {
        this.on('change:protein', this._updateCalory);
        this.on('change:fat', this._updateCalory);
        this.on('change:carbs', this._updateCalory);
    },

    _updateCalory: function() {
        const protein = this.get('protein');
        const fat = this.get('fat');
        const carbs = this.get('carbs');

        if (protein && fat && carbs) {
            const calory = protein * 4 + fat * 9 + carbs * 4;
            this.set('calory', calory);
        }
    },

    validate: function(attrs, options) {
        let result = {};

        if (!attrs.shortName) {
            result.shortName = 'Укажите краткое наименование';
        } 

        if (!attrs.protein) {
            result.protein = 'Укажите количество белков';
        } else if (weightLimit < attrs.protein) {
            result.protein = validateMessage.valueLimit;
        }

        if (!attrs.fat) {
            result.fatAnimal = 'Укажите количество жиров';
        } else if (weightLimit < attrs.fat) {
            result.fatAnimal = validateMessage.valueLimit;
        }

        if (!attrs.carbs) {
            result.carbs = 'Укажите количество углеводов';
        } else if (weightLimit < attrs.carbs) {
            result.carbs = validateMessage.valueLimit;
        }

        if (_.isEmpty(result)) {
            result = this._validateSum(attrs);
        }

        return _.isEmpty(result) ? null : result;
    },

    _validateSum: function(attrs) {
        let propName;
        let sum = parseFloat(attrs.protein) + parseFloat(attrs.fat);

        if (weightLimit < sum) {
            propName = 'fat';
        } else {
            sum += parseFloat(attrs.protein) + parseFloat(attrs.fat);
            if (weightLimit < sum) {
                propName = 'fat';
            } else {
                sum += parseFloat(attrs.carbs);
                if (weightLimit < sum) {
                    propName = 'carbs';
                }
            }
        }

        return propName ? {[propName]: validateMessage.sumLimit} : null;
    }
});
