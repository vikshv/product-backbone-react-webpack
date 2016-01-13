import React  from 'react';

export default React.createClass({
    render: function() {
        const {className} = this.props;
        return (
            <tr>
                <td colSpan="8" className={className}>
                    <i className="fa fa-3x fa-spinner fa-spin"></i>
                </td>
            </tr>
        );
    }
});
