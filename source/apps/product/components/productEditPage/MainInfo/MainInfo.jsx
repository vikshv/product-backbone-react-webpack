import React  from 'react';
import {Row, Col, ButtonToolbar, Button, Input, Panel, PanelGroup} from 'react-bootstrap';
import preloadingDataGetter from 'core/helpers/preloadingDataGetter';

const productTypes = preloadingDataGetter.get('ProductType');

export default React.createClass({
    _onChange: function(e) {
        const target = e.target;
        this.props.onChange(target.name, target.value);
    },

    _getBsStyle: function(validatedObject) {
        return validatedObject.msg ? 'error' : null;
    },

    render: function() {
        const {shortName, longName, manufacturer, description, bsSize} = this.props;
        const selectProductType = this._getSelectProductType();

        return (
            <div>
                <Row>
                    <Col md={8}>
                        {selectProductType}
                    </Col>
                </Row>
                <Row>
                    <Col md={8}>
                        <Input type='text' 
                            maxLength='32' 
                            label="Краткое наименование"
                            value={shortName.value} 
                            name='shortName' 
                            onChange={this._onChange} 
                            bsSize={bsSize}
                            bsStyle={this._getBsStyle(shortName)}
                            help={shortName.msg} />
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Input type='text' 
                            maxLength='64' 
                            value={longName} 
                            name='longName' 
                            onChange={this._onChange} 
                            bsSize={bsSize} 
                            label='Полное наименование' />
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Input type="text" 
                            maxLength="64" 
                            value={manufacturer} 
                            name="manufacturer" 
                            onChange={this._onChange} 
                            bsSize={bsSize} 
                            label="Производитель" />
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Input type="textarea" 
                            maxLength="512" 
                            rows="3" 
                            value={description} 
                            name="description" 
                            onChange={this._onChange} 
                            bsSize={bsSize} 
                            label="Описание" />
                    </Col>
                </Row>
            </div>
        );
    },

    _getSelectProductType: function() {
        const {systemType, bsSize} = this.props;
        const options = productTypes.map(item => <option key={item.value} value={item.value}>{item.text}</option>);
        return (
            <Input type="select" label="Тип" bsSize={bsSize} onChange={this._onChange} value={systemType} name="systemType">
                {options}
            </Input>
        );
    }
});
