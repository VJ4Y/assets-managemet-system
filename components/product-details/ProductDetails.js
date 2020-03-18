import React from 'react';
import { Input, Dropdown } from 'semantic-ui-react';
import SingleCalendar from 'react-date-picker-range';
import transform from '../../utils/transform';
import moment from 'moment';
import DataTable from '../common-components/DataTable';

class ProductDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			productIdVal: '',
			productNameVal: '',
			productDateVal: '',
			productTypeVal: '',
			productPriceVal: '',
			idErrorCheck: false,
			idErrorLabel: '',
			nameErrorCheck: false,
			nameErrorLabel: '',
			typeErrorCheck: false,
			typeErrorLabel: '',
			dateErrorLabel: '',
			priceErrorCheck: false,
			priceErrorLabel: '',
			allErrorLabel: '',
		};
	}

	componentDidMount() {
		const { requestProductTypeDetails, requestProductDetails } = this.props;
		requestProductTypeDetails();
		requestProductDetails();
	}

	onProductIdChange = event => {
		this.setState({ productIdVal: event.target.value });
	};

	onProductNameChange = event => {
		this.setState({ productNameVal: event.target.value });
	};

	onProductPriceChange = event => {
		this.setState({ productPriceVal: event.target.value });
	};

	onProductTypeChange = (event, data) => {
		this.setState({ productTypeVal: data.value });
	};

	onProductDateChange = event => {
		let formatedDate = moment(event).format('DD-MMM-YYYY');
		this.setState({ productDateVal: formatedDate });
	};

	onSubmitClick = () => {
		const { productIdVal, productNameVal, productTypeVal, productPriceVal, productDateVal } = this.state;
		if (
			productIdVal.length === 0 &&
			productTypeVal.length === 0 &&
			productDateVal.length === 0 &&
			productNameVal.length === 0 &&
			productPriceVal.length === 0
		) {
			this.setState({ errorCheck: true, errorLabel: '', allErrorLabel: 'All fields are mandatory' });
		} else if (productIdVal.length === 0) {
			this.setState({
				idErrorCheck: true,
				idErrorLabel: 'Product id is mandatory',
				nameErrorCheck: false,
				nameErrorLabel: '',
				typeErrorCheck: false,
				typeErrorLabel: '',
				priceErrorCheck: false,
				priceErrorLabel: '',
				dateErrorLabel: '',
				allErrorLabel: '',
			});
		} else if (productTypeVal.length === 0) {
			this.setState({
				typeErrorCheck: true,
				typeErrorLabel: 'Please select any product type',
				idErrorCheck: false,
				idErrorLabel: '',
				nameErrorCheck: false,
				nameErrorLabel: '',
				priceErrorCheck: false,
				priceErrorLabel: '',
				dateErrorLabel: '',
				allErrorLabel: '',
			});
		} else if (productDateVal.length === 0) {
			this.setState({
				dateErrorLabel: 'Please select any product date',
				typeErrorCheck: false,
				typeErrorLabel: '',
				idErrorCheck: false,
				idErrorLabel: '',
				nameErrorCheck: false,
				nameErrorLabel: '',
				priceErrorCheck: false,
				priceErrorLabel: '',
				allErrorLabel: '',
			});
		} else if (productNameVal.length === 0) {
			this.setState({
				nameErrorCheck: true,
				nameErrorLabel: 'Product name is mandatory',
				dateErrorLabel: '',
				typeErrorCheck: false,
				typeErrorLabel: '',
				idErrorCheck: false,
				idErrorLabel: '',
				priceErrorCheck: false,
				priceErrorLabel: '',
				allErrorLabel: '',
			});
		} else if (productPriceVal.length === 0) {
			this.setState({
				priceErrorCheck: true,
				priceErrorLabel: 'Product price is mandatory',
				nameErrorCheck: false,
				nameErrorLabel: '',
				dateErrorLabel: '',
				typeErrorCheck: false,
				typeErrorLabel: '',
				idErrorCheck: false,
				idErrorLabel: '',
				allErrorLabel: '',
			});
		} else {
			this.setState({
				priceErrorCheck: false,
				priceErrorLabel: '',
				nameErrorCheck: false,
				nameErrorLabel: '',
				dateErrorLabel: '',
				typeErrorCheck: false,
				typeErrorLabel: '',
				idErrorCheck: false,
				idErrorLabel: '',
				allErrorLabel: '',
			});

			const { productIdVal, productTypeVal, productDateVal, productNameVal, productPriceVal } = this.state;
			const { insertProductDetails } = this.props;
			let dbproductDate = moment(productDateVal).format('YYYY-MM-DD');
			insertProductDetails(productIdVal, productTypeVal, dbproductDate, productNameVal, productPriceVal);
		}
	};

	onCancelClick = () => {
		this.setState({
			allErrorLabel: '',
			productDateVal: '',
			productIdVal: '',
			productNameVal: '',
			productPriceVal: '',
			productTypeVal: '',
			priceErrorCheck: false,
			priceErrorLabel: '',
			nameErrorCheck: false,
			nameErrorLabel: '',
			dateErrorLabel: '',
			typeErrorCheck: false,
			typeErrorLabel: '',
			idErrorCheck: false,
			idErrorLabel: '',
		});
	};

	render() {
		const {
			productIdVal,
			productNameVal,
			productTypeVal,
			productPriceVal,
			productDateVal,
			allErrorLabel,
			idErrorCheck,
			idErrorLabel,
			typeErrorCheck,
			typeErrorLabel,
			dateErrorLabel,
			nameErrorCheck,
			nameErrorLabel,
			priceErrorCheck,
			priceErrorLabel,
		} = this.state;
		const { productTypeDetails } = this.props;
		const transformProductType = transform.transformProductType(productTypeDetails.data);
		console.log('productDetails:', this.props.productDetails.data);
		const productDetailsColumnHeader = ['Product Id', 'Product Type', 'Product Date', 'Product Name', 'Price'];
		return (
			<div className="as-product-details">
				<div className="all-error-label">{allErrorLabel}</div>

				<div className="product-id">
					<p className="id-text">Product Id</p>
					<Input onChange={this.onProductIdChange} value={productIdVal} error={idErrorCheck} />
					<span className="error-label">{idErrorLabel}</span>
				</div>
				<div className="product-type">
					<p className="type-text">Product Type</p>
					<Dropdown
						options={transformProductType}
						selection
						placeholder="Product Category"
						onChange={this.onProductTypeChange}
						value={productTypeVal}
						error={typeErrorCheck}
					/>
					<span className="error-label">{typeErrorLabel}</span>
				</div>
				<div className="product-date">
					<p className="date-text">Product date</p>
					<SingleCalendar value={productDateVal} onChangeDate={this.onProductDateChange} />
					<span className="error-label">{dateErrorLabel}</span>
				</div>
				<div className="product-name">
					<p className="name-text">Product Name</p>
					<Input onChange={this.onProductNameChange} value={productNameVal} error={nameErrorCheck} />
					<span className="error-label">{nameErrorLabel}</span>
				</div>
				<div className="product-price">
					<p className="price-text">Price</p>
					<Input onChange={this.onProductPriceChange} value={productPriceVal} error={priceErrorCheck} />
					<span className="error-label">{priceErrorLabel}</span>
				</div>
				<div>
					<button className="btn-submit" onClick={this.onSubmitClick}>
						Submit
					</button>
					<button className="btn-cancel" onClick={this.onCancelClick}>
						Cancel
					</button>
				</div>
				<DataTable columnHeader={productDetailsColumnHeader} />
			</div>
		);
	}
}

export default ProductDetails;
