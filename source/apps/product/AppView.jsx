import React  from 'react';
import SiteNavbar from 'common/components/SiteNavbar';

export default React.createClass({
    render() {
        const {content} = this.props;
        return (
            <div>
                <SiteNavbar />
                {content}
            </div>
        );
    }
});
