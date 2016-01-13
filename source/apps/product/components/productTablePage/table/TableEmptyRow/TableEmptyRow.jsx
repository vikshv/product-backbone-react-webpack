import React  from 'react';

export default React.createClass({
    render: function() {
        const {query} = this.props;
        const text = query ? `По запросу "${query}" ничего не найдено` : 'Нет продуктов';
        return (
            <tr>
                <td colSpan="8" className="productTable__emptyRow">
                    {text}
                </td>
            </tr>
        );
    }
});
