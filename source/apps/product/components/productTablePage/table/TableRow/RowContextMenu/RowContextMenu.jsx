import React from 'react';
import ReactDOM from 'react-dom';
import { Overlay, MenuItem } from 'react-bootstrap';
import './style.less';
import productCollectionService from '../../../../../services/productCollectionService';

export default React.createClass({
    getInitialState() {
        return { show: false };
    },

    _onSelectDelete() {
        const { id } = this.props;
        productCollectionService.deleteProducts([ id ]);
    },

    _toggle() {
        this.setState({ show: !this.state.show });
    },

    _hide() {
        this.setState({ show: false })
    },

    _getEditMenuItem() {
        const { id } = this.props;
        const editHref = `#edit/${ id }`;
        return <MenuItem href={ editHref }>Редактировать</MenuItem>;
    },

    _getDeleteMenuItem() {
        const { shared } = this.props;
        return shared ? null : <MenuItem onSelect={ this._onSelectDelete }>Удалить</MenuItem>;
    },

    render() {
        const editMenuItem = this._getEditMenuItem();
        const deleteMenuItem = this._getDeleteMenuItem();
        
        return (
            <div className="rowContextMenu">
                <div ref="target" className="rowContextMenu__triggerBlock" onClick={ this._toggle }>
                    <i className="fa fa-ellipsis-v"></i>
                </div>
                <Overlay show={ this.state.show }
                    onHide={ this._hide }
                    container={ this }
                    target={ () => ReactDOM.findDOMNode(this.refs.target) }
                    rootClose >
                    <div className="rowContextMenu__content">
                        <ul className="dropdown-menu dropdown-menu--open">
                            { editMenuItem }
                            { deleteMenuItem }
                        </ul>
                    </div>
                </Overlay>
            </div>
        );
    }
});
