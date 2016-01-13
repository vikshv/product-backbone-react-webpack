import React  from 'react';
import {Row, Col, Input} from 'react-bootstrap';

export default React.createClass({
    _getBsStyle: function(validatedObject) {
        return validatedObject.msg ? 'error' : null;
    },

    _onChange: function(e) {
        const target = e.target;
        const value = target.value;
        const formatValue = value ? value.replace(',', '.') : '';
        this.props.onChange(target.name, formatValue);
    },

    _formatValue: function(value) {
        return (typeof value === 'number') ? value.toFixed(1) : value;
    },

    render: function() {
        const { bsSize, protein, fat, carbs, calory } = this.props;

        return (
            <div>
                <Row>
                    <Col md={6}>
                        <Input type="text" 
                            label="Белки, г"
                            maxLength="4"
                            name="protein"
                            value={this._formatValue(protein.value)}
                            onChange={this._onChange} 
                            bsSize={bsSize}
                            bsStyle={this._getBsStyle(protein)}
                            help={protein.msg} />
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Input type="text" 
                            label="Жиры, г"
                            maxLength="4"
                            name="fat"
                            value={this._formatValue(fat.value)}
                            onChange={this._onChange} 
                            bsSize={bsSize}
                            bsStyle={this._getBsStyle(fat)}
                            help={fat.msg} />
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Input type="text" 
                            label="Углеводы, г"
                            maxLength="4"
                            name="carbs"
                            value={this._formatValue(carbs.value)}
                            onChange={this._onChange} 
                            bsSize={bsSize}
                            bsStyle={this._getBsStyle(carbs)}
                            help={carbs.msg} />
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Input type="text" 
                            label="Калорийность, ккал"
                            maxLength="5"
                            name="calory"
                            value={this._formatValue(calory)}
                            onChange={this._onChange} 
                            bsSize={bsSize} />
                    </Col>
                </Row>
            </div>
        );
    }
});
