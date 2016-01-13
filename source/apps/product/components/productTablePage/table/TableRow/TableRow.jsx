import React from 'react';
import RowContextMenu from './RowContextMenu';
import CheckboxView from 'core/components/checkboxView';

export default React.createClass({
    shouldComponentUpdate(nextProps) {
        return this.props.checked !== nextProps.data.checked;
    },

    render() {
        const { data, checked } = this.props;
        const trClassName = checked ? 'warning' : '';
        const href = `#card/${ data.id }`;
        const checkboxView = this._getCheckboxView();

        return (
            <tr className={trClassName}>
                <td className="productTable__coll productTable__coll--checkbox">
                    {checkboxView}
                </td>
                <td className="productTable__coll productTable__coll--name">
                    <a href={href}>{data.shortName}</a>
                </td>
                <td className="productTable__coll productTable__coll--calory">{data.calory}</td>
                <td className="productTable__coll productTable__coll--prot">{data.protein}</td>
                <td className="productTable__coll productTable__coll--fat">{data.fat}</td>
                <td className="productTable__coll productTable__coll--carb">{data.carbs}</td>
                <td className="productTable__coll productTable__coll--ratio">{data.ratio}</td>
                <td className="productTable__coll productTable__coll--menu">
                    <RowContextMenu id={data.id} shared={data.shared} />
                </td>
            </tr>
        );
    },

    _getCheckboxView() {
        const { checked } = this.props;
        const handlers = this._getCheckboxViewHandlers();
        return <CheckboxView checked={checked} handlers={handlers} />;
    },

    _getCheckboxViewHandlers() {
        const handlers = this.props.handlers || {};
        return {
            onChangeChecked: checked => {
                if (handlers.onChangeChecked) {
                    handlers.onChangeChecked(checked);
                }
            }
        };
    }
});
