import React from 'react';
import {ButtonToolbar, ButtonGroup, Button} from 'react-bootstrap';
import productCollectionService from '../../../services/productCollectionService';

export default React.createClass({
    _onClick(e) {
        const target = e.target;
        switch (target.name) {
            case 'delete': {
                const ids = productCollectionService.getCheckedIds();
                productCollectionService.deleteProducts(ids);
                break;
            }
        }
    },

    render() {
        const disabledDeleteButton = productCollectionService.isSomeCheckedShared();
        return (
            <ButtonToolbar>
                <ButtonGroup>
                    <Button bsStyle="danger" disabled={disabledDeleteButton} name="delete" onClick={this._onClick}>Удалить</Button>
                </ButtonGroup>
            </ButtonToolbar>
        );
    }
});
