import React from 'react';
import ReactDOM from 'react-dom';

import AppView from './AppView.jsx';
import ProductTableView from './components/productTablePage';
import ProductEditView from './components/productEditPage';
import ProductCardView from './components/productCardPage';

const contentRegionId = 'appContainer';
const contentContainer = document.getElementById(contentRegionId);

export default {
	homeRoute() {
		_renderPage(ProductTableView);
	},

	cardRoute(id) {
		_renderPage(ProductCardView, {id});
	},

	editRoute(id) {
		_renderPage(ProductEditView, {id});
	},

	newRoute() {
		_renderPage(ProductEditView);
	}
};

function _renderPage(contentView, options = {}) {
	const content = React.createElement(contentView, options);
	const app = React.createElement(AppView, {content});
	ReactDOM.render(app, contentContainer);
}
