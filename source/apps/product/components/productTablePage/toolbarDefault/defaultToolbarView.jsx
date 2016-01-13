import React from 'react';
import {ButtonToolbar, ButtonGroup, Button} from 'react-bootstrap';
import preloading from 'core/helpers/preloadingDataGetter';

const groupTypes = preloading.get('ProductGroupTypes');

export default React.createClass({
    _onClick(e) {
        const target = e.target;
        const {services} = this.props;
        const {searchFilterService} = services;

        switch (target.name) {
            case 'add': {
                this._gotoNewPage();
                break;
            }
            case 'all': {
                searchFilterService.setGroupType(groupTypes.all);
                break;
            }
            case 'my': {
                searchFilterService.setGroupType(groupTypes.my);
                break;
            }
        }
    },

    _gotoNewPage() {
        window.location = '#new';
    },

    render() {
        const {disabled, services} = this.props;
        const {searchFilterService} = services;
        const groupType = searchFilterService.getGroupType();
        const allActive = groupType === groupTypes.all;
        const myActive = groupType === groupTypes.my;

        return (
            <ButtonToolbar>
                <ButtonGroup>
                    <Button bsStyle="success" name="add" disabled={disabled} onClick={this._onClick}>Добавить</Button>
                </ButtonGroup>
                <ButtonGroup>
                    <Button name="all" disabled={disabled} active={allActive} onClick={this._onClick}>Все продукты</Button>
                    <Button name="my" disabled={disabled} active={myActive} onClick={this._onClick}>Мои продукты</Button>
                </ButtonGroup>
            </ButtonToolbar>
        );
    }
});
