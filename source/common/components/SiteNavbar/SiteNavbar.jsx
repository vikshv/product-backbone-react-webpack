import React from 'react';
import { Navbar } from 'react-bootstrap';

export default React.createClass({
    render() {
        return (
            <Navbar fixedTop inverse>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/">Продукты</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
            </Navbar>
        );
    }
});
