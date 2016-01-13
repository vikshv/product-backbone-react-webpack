import React  from 'react';
import {Row, Col, ButtonToolbar, Button, Input, Panel, PanelGroup} from 'react-bootstrap';
import './style.less';
import MainInfo from './MainInfo';
import MainProps from './MainProps';
import productService from '../../services/productService';

const bsSize = 'medium';

export default React.createClass({
    _onChange(name, value) {
        productService.setAttr(name, value);
    },

    render() {
        const {onSubmit, onCancel} = this.props;
        const title = this._getTitle();
        const mainInfo = this._getMainInfo();
        const propInfo = this._getPropInfo();

        return (
            <div className="productForm">
                <Row className="row--moreMarginBottom">
                    <Col md={6}>
                        {title}
                        {mainInfo}
                    </Col>
                    <Col md={6}>
                        {propInfo}
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <ButtonToolbar className="productForm__footer">
                            <Button bsStyle="success" onClick={onSubmit}>Сохранить</Button>
                            <Button bsStyle="link" onClick={onCancel}>Отмена</Button>
                        </ButtonToolbar>
                    </Col>
                </Row>
            </div>
        );
    },

    _getTitle() {
        const {data} = this.props;
        const text = data.id ? 'Редактирование продукта' : 'Создание нового продукта';
        return (
            <Row className='row--moreMarginBottom'>
                <Col md={12}>
                    <h3>{text}</h3>
                </Col>
            </Row>
        );
    },

    _createValidatedAttr(name) {
        const {data, validationError} = this.props;
        return {
            value: data[name],
            msg: validationError && validationError[name]
        };
    },

    _getMainInfo() {
        const {data, validationError} = this.props;
        const validatedShortName = this._createValidatedAttr('shortName');

        return (
            <MainInfo bsSize={bsSize}
                onChange={this._onChange}
                systemType={data.systemType}
                shortName={validatedShortName}
                longName={data.longName}
                manufacturer={data.manufacturer}
                description={data.description} />
        );
    },

    _getMainProps() {
        const {data} = this.props;

        const validatedProtein = this._createValidatedAttr('protein');
        const validatedFat = this._createValidatedAttr('fat');
        const validatedCarbs = this._createValidatedAttr('carbs');

        return (
            <MainProps bsSize={bsSize}
                onChange={this._onChange}
                protein={validatedProtein}
                fat={validatedFat}
                carbs={validatedCarbs}
                calory={data.calory} />
        );
    },

    _getPropInfo() {
        const MainProps = this._getMainProps();
        return (
            <div className="productForm__rigthBlock">
                <PanelGroup>
                    <Panel eventKey="1" collapsible defaultExpanded header="Основные характеристики">
                        {MainProps}
                    </Panel>
                </PanelGroup>
            </div>
        );
    }
});
