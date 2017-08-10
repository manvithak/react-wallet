import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {Form} from 'formsy-react';
import MyInput from '../components/MyInput';
import Transfer from './Transfer';
import Transactions from './Transactions.js';
import axios from 'axios';
import {connect} from 'react-redux';
import {HashRouter,Link,Route} from 'react-router-dom';
import {Row,Col,Grid,Tab,Tabs,Modal,Button} from 'react-bootstrap';

class AddAmount extends Component{
	constructor(){
		super();
		this.state={
			message:'',
			number:'',
			show: false,
			balance:0
		}
		this.handleSubmit=this.handleSubmit.bind(this);
	}
	handleSubmit(data){
		axios.post('http://localhost:8080/addPoints',{
			month:data.expMonth,
			year:data.expYear,
			number:data.number,
			amount:data.amount,
			cvv:data.cvv,
			token:this.props.token.activeUser.token
		}).then(response=>{
  			this.setState({
  				message:response.data.message,
  				balance:this.state.balance+parseInt(data.amount)
			 })
		}).catch(err=>{
			console.log(err);
		})
		this.refs.form.reset();
	}
	componentDidMount(){
		this.setState({
			balance:this.props.token.activeUser.amount
		})
	}
	render(){
		let close = () => this.setState({ show: false});
		return(
			<div>
				<nav className="navbar navbar-default">
				  <div className="container-fluid">
				    <div className="navbar-header">
				      <a className="navbar-brand">Logo</a>
				    </div>
				    <ul className="nav navbar-nav navbar-right">
				      <li><a>Wallet Balance:{this.state.balance}</a></li>
				      <li><a><span className="glyphicon glyphicon-user"></span>{this.props.token.activeUser.user.phone}</a></li>
				    </ul>
				  </div>
				</nav>
				<Grid>
			    <Row>
						<Col lg={8}>
							<h3>Wallet Balance:{this.state.balance}</h3>
						</Col>
						<Col lg={4}>
							{this.state.message?<p>{this.state.message}</p>:null}
								<div className="modal-container">
								<Button bsStyle="primary" bsSize="large" onClick={() => this.setState({ show: true})}>AddAmount</Button>
				        <Modal
				          show={this.state.show}
				          onHide={close}
				          container={this}
				          aria-labelledby="contained-modal-title"
				        >
				          <Modal.Header closeButton>
				            <Modal.Title id="contained-modal-title">Fill Details</Modal.Title>
				          </Modal.Header>
				          <Modal.Body>
				            <Form onSubmit={this.handleSubmit} ref='form'>
											<MyInput type='text' title='Enter Amount' name='amount' value='' required />
											<MyInput type='number' title='Exp Month' name='expMonth' value='' required />
											<MyInput type='number' title='Exp year' name='expYear' value='' required />
											<MyInput type='text' title='Card Number' name='number' value='' required />
											<MyInput type='text' title='CVV' name='cvv' value='' required /><br/>
											<button className='btn btn-info' onClick={close}>Add Amount</button>
										</Form>
				          </Modal.Body>
				          <Modal.Footer>
				            <Button onClick={close}>Close</Button>
				          </Modal.Footer>
				        </Modal>
				      </div>
				    </Col>
		    	</Row>
		    	<br/>
					<Row>
	  				<Col lg={12}>
	  					<Tabs defaultActiveKey={1} id='login-signup-tabs'>
				        <Tab eventKey={1} title='Transactions' >
				        	<Transactions />
				        </Tab>
				        <Tab eventKey={2} title='Send Money' >
				        	<Transfer />
				        </Tab>
				      </Tabs>
	  				</Col>
	  			</Row>
  			</Grid>
			</div>
			)
	}
}

function mapStateToProps(state){
  console.log(state);
  return{
		token:state.activeUser
  }
}

export default connect(mapStateToProps)(AddAmount);
