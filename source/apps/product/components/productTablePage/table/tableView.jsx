import React from 'react';
import {Table} from 'react-bootstrap';
import './styles.less';
import TableRow from './TableRow';
import TableEmptyRow from './TableEmptyRow';
import TableLoadingRow from './TableLoadingRow';
import CheckboxView from 'core/components/checkboxView';

export default React.createClass({
    render() {
        const checkbox = this._getCheckbox();
        const tbody = this._getTbody();
        return (
            <Table condensed hover className="productTable">
                <thead>
                    <tr>
                        <th className="productTable__coll productTable__coll--checkbox">
                            {checkbox}
                        </th>
                        <th className="productTable__coll productTable__coll--name">Наименование</th>
                        <th className="productTable__coll productTable__coll--calory">Калорийность, ккал</th>
                        <th className="productTable__coll productTable__coll--prot">Белки, г</th>
                        <th className="productTable__coll productTable__coll--fat">Жиры, г</th>
                        <th className="productTable__coll productTable__coll--carb">Углеводы, г</th>
                        <th className="productTable__coll productTable__coll--ratio">&nbsp;Б&nbsp;/&nbsp;Ж&nbsp;/&nbsp;У&nbsp;</th>
                        <th className="productTable__coll productTable__coll--menu"></th>
                    </tr>
                </thead>
                {tbody}
            </Table>
        );
    },

    _getCheckbox() {
        const handlers = _getCheckboxViewHandlers.call(this);
        const {checked, indeterminate} = _getCheckboxProps.call(this);
        return (
            <CheckboxView checked={checked} indeterminate={indeterminate} handlers={handlers}/>
        );
    },

    _getTbody() {
        const {data, loading, isAppend} = this.props;
        let loadingRow;
        let rows;

        if (loading) {
            if (isAppend && data.length) {
                rows = this._getRows();
            }
            loadingRow = this._getLoadingRow();
        } else {
            if (data.length) {
                rows = this._getRows();
            } else {
                rows = this._getEmptyRow();
            }
        }

        return (
            <tbody>
                {rows}
                {loadingRow}
            </tbody>
        );
    },

    _getLoadingRow() {
        const {data, isAppend} = this.props;
        const baseClassName = 'productTable__loadingRow';
        const appendClassName = 'productTable__loadingRow--append';
        const className = (isAppend && data.length) ? `${baseClassName} ${appendClassName}` : baseClassName;
        return (
            <TableLoadingRow className={className} />
        );
    },

    _getRows() {
        const {data} = this.props;
        return data.map((item) => {
            return _createRowView.call(this, item);
        });
    },

    _getEmptyRow() {
        const {filter} = this.props;
        return <TableEmptyRow query={filter.query} />;
    }
});

function _getCheckboxProps() {
    const {data} = this.props;
    const {length} = data;

    let indeterminate = false;
    let checked = false;
    let checkedCount = 0;

    data.forEach((item) => {
        if (item.checked) {
            checkedCount++;
        }
    });

    if (length && checkedCount === length) {
        checked = true;
    } else if (!checkedCount) {
        checked = false;
    } else {
        indeterminate = true;
    }

    return {
        checked,
        indeterminate
    };
}

function _createRowView(item) {
    const { isAuth } = this;
    const handlers = _getRowViewHandlers.call(this, item);
    return <TableRow key={item.id} isAuth={ isAuth } checked={item.checked} data={item} handlers={handlers} />;
}

function _getRowViewHandlers(item) {
    const {handlers} = this.props;
    return {
        onChangeChecked: (value) => {
            handlers.onChangeRowChecked(item.id, value);
        }
    };
}

function _getCheckboxViewHandlers() {
    const {handlers} = this.props;
    return {
        onChangeChecked: handlers.onChangeTableChecked
    };
}
