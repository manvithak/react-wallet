import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {Form} from 'formsy-react';
import MyInput from '../components/MyInput';
import axios from 'axios';
import {connect} from 'react-redux';


class Transfer extends Component{
	constructor(){
		super();
		this.state={
			message:''
		}
		this.handleSubmit=this.handleSubmit.bind(this);
	}
	handleSubmit(data){
		this.refs.form.reset();
		axios.post('http://localhost:8080/transfer',{
			amount:data.amount,
			phone:data.phone,
			token:this.props.token.activeUser.token
		})
		.then(response=>{
			console.log(response.data.message);
			this.setState({message:response.data.message})
		}).catch(err=>{
			console.log(err);
		})
	}
	render(){
		return(
				<div>
					<h4>Send Money to Mobile Number</h4>
					<div className='form-transfer'>
					<Form  onSubmit={this.handleSubmit} ref='form'>
						<MyInput type='text' title='Enter Amount' name='amount'
            validations='isNumeric' validationError='enter valid amount' value='' required /><br/>
						<MyInput type='text' title='Phone' name='phone' value=''
            validations='isNumeric' validations='isNumeric,maxLength:10,minLength:10' validationError='this is not valid phone number'required /><br/>
						<MyInput type='text' title='Remarks for Transactions'name='remarks' value='' required /><br/>
						<button className='btn btn-info custom'>Send Money</button>
					</Form>
					</div>
					{this.state.message?<p>{this.state.message}</p>:null}
				</div>
			)
	}
}

function mapStateToProps(state){
	return{
		token:state.activeUser
	}
}
export default connect(mapStateToProps)(Transfer);
