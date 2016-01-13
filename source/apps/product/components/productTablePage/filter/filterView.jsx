import React  from 'react';
import ButtonView from 'core/components/buttonView';

export default React.createClass({
    getInitialState,
    render
});

function getInitialState() {
    return {
        state: 'search',
        inputValue: '',
        filterValue: ''
    };
}

function render() {
    const ButtonView = _getButtonView.call(this);
    const valueLink = _getValueLink.call(this);
    const keyDownHandler = _getKeyDownHandler.call(this);

    return (
        <div className="input-group">
            <input type="text" className="form-control" valueLink={valueLink} onKeyDown={keyDownHandler} placeholder="Наименование" />
            <span className="input-group-btn">
                {ButtonView}
            </span>
        </div>
    );
}

function _getValueLink() {
    const view = this;
    const {inputValue} = this.state;
    return {
        value: inputValue,
        requestChange: (value) => {
            _onChangeInput.call(view, value);
        }
    };
}

function _onChangeInput(inputValue) {
    const {filterValue} = this.state;
    const state = inputValue !== filterValue ? 'search' : 'remove';
    this.setState({inputValue, state});
}

function _getKeyDownHandler() {
    const view = this;
    return (e) => {
        var keyCode = e.keyCode;
        if (keyCode === 13) {
            _setFilter.call(view);
        }
    };
}

function _getButtonView() {
    const {state} = this.state;
    return state === 'search' ? _getSearchButtonView.call(this) : _getRemoveButtonView.call(this);
}

function _getSearchButtonView() {
    return (
        <ButtonView className="btn-default" onClick={_onClickSearchButton.bind(this)}>
            <i className="fa fa-search"></i>
        </ButtonView>
    );
}

function _onClickSearchButton() {
    _setFilter.call(this);
}

function _setFilter() {
    const {inputValue, filterValue} = this.state;
    if (inputValue) {
        this.setState({
            state: 'remove',
            filterValue: inputValue
        });
        _applyFilter.call(this, inputValue);
    } else if (inputValue !== filterValue) {
        _clearFilter.call(this);
    }
}

function _getRemoveButtonView() {
    return (
        <ButtonView className="btn-default" onClick={_onClickRemoveButton.bind(this)}>
            <i className="fa fa-times"></i>
        </ButtonView>
    );
}

function _onClickRemoveButton() {
    _clearFilter.call(this);
}

function _clearFilter() {
    this.setState({
        state: 'search',
        inputValue: '',
        filterValue: ''
    });
    _applyFilter.call(this, null);
}

function _applyFilter(text) {
    const services = this.props.services || {};
    if (services && services.searchFilterService) {
        services.searchFilterService.setQuery(text);
    }
}
