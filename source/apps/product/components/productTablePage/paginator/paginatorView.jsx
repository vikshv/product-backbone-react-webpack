'use strict';

import React  from 'react';
import {ButtonToolbar, Button} from 'react-bootstrap';

export default React.createClass({
    render: function() {
        const {handlers} = this.props;
        const ShowAllButton = _getShowAllButton.call(this);

        return (
            <ButtonToolbar>
                <Button onClick={handlers.onClickShowMore}>
                    Показать ещё
                </Button>
                {ShowAllButton}
            </ButtonToolbar>
        );
    }
});

function _getShowAllButton() {
    const limit = 500;
    const {handlers, maxSize} = this.props;
    let result;

    if (maxSize <= limit) {
        result = (
            <Button onClick={handlers.onClickShowAll}>
                Показать все
            </Button>
        );
    }

    return result;
}
