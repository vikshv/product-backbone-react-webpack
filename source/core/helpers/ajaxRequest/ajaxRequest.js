import {ajax} from 'jquery';
import _ from 'underscore';
import {Promise} from 'es6-promise-polyfill';
import preloading from 'core/helpers/preloadingDataGetter';

let productList = preloading.get('Products');
let productId = productList[productList.length - 1].id + 1;

export default function ajaxRequest(options) {
    return new Promise((resolve, reject) => {

        switch (options.url) {
            case '/product/table': {
                const { groupType, query } = options.data;
                let list = groupType ? productList.filter(item => item.type) : productList;
                list = query ? list.filter(item => item.shortName === query) : list;
                setTimeout(() => {
                    resolve({
                        status: true,
                        list,
                        size: list.length
                    });
                }, 500);
                break;
            }
            case '/product/delete': {
                const { ids } = options.data;
                productList = productList.filter(item => {
                    return !_.contains(ids, item.id);
                });
                resolve({
                    status: true
                });
                break;
            }
            case '/product/get': {
                const { id } = options.data;
                const result = productList.filter(item => item.id === parseInt(id, 10));
                setTimeout(() => {
                    resolve({
                        status: true,
                        value: result[0],
                    });
                }, 500);
                break;
            }
            case '/product/save': {
                const { id, systemType, shortName, longName, manufacturer, description, calory, protein, fat, carbs } = options.data;
                if (id) {
                    const result = productList.filter(item => item.id === parseInt(id, 10));
                    result[0] = _.extend(result[0], {
                        systemType,
                        shortName,
                        longName,
                        manufacturer,
                        description,
                        calory,
                        protein,
                        fat,
                        carbs,

                    });
                } else {
                    productList.push({
                        id: productId++,
                        type: 1,
                        systemType,
                        shortName,
                        longName,
                        manufacturer,
                        description,
                        calory,
                        protein,
                        fat,
                        carbs,
                        shared: false,
                        ratio: '0.0/0.0./0.0',
                    });
                }
                resolve({
                    status: true,
                });
                break;
            }
        }

        // $.ajax({
        //     type: options.type,
        //     url: options.url,
        //     dataType: 'json',
        //     cache: false,
        //     contentType: 'application/json; charset=utf-8',
        //     data: JSON.stringify(options.data)
        // })
        // .done(function(response) {
        //     if (response && response.status) {
        //         resolve(response);
        //     } else {
        //         reject();
        //     }
        // })
        // .fail(function() {
        //     reject();
        // });
    });
}
