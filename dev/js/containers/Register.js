import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Form} from 'formsy-react';
import {addUser} from '../actions/index'
import MyInput from '../components/MyInput';
import axios from 'axios';
import '../../scss/style.scss';

class Register extends React.Component{
	constructor(props) {
    super(props);
    this.state={
      canSubmit:false,
      message:''
    }
    this.enableButton = this.enableButton.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.submit = this.submit.bind(this);
	}

  submit(data){
    this.refs.form.reset();
    axios.post('http://localhost:8080/register',{
      phone:data.phone,
      password:data.password,
      email:data.email
    }).then(response =>{
        console.log(response.data.message);
        this.setState({
          message:response.data.message
        })
      }).catch(err =>{
        console.log(err);
      })
  }
  enableButton() {
    this.setState({ canSubmit: true });
  }
  disableButton() {
    this.setState({ canSubmit: false });
  }

	render(){
		return(
			<div className='form-height'>
				<Form onSubmit={this.submit} ref='form' onValid={this.enableButton} onInvalid={this.disableButton}>
					<MyInput type='text' value='' title='Mobile Number' name='phone'
          validations='isNumeric,maxLength:10' validationError='this is not valid phone number' required/><br/>
					<MyInput type='password' value='' title='Wallet Password' name='password'
          validations='minLength:8' validationError='password lenth to be minimum 8 characters' required/><br/>
					<MyInput type='email' value='' title='Enter Your Email' name='email'
          validations="isEmail" validationError="This is not a valid email" required/><br/>
					<button type='submit' disabled={!this.state.canSubmit} className='btn btn-info custom'>Create your Wallet</button>
          {this.state.message?<p>{this.state.message}</p>:null}
				</Form>
			</div>
		)
	}
}

export default Register;
