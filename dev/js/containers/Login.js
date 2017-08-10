import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Form} from 'formsy-react';
import {loginUser} from '../actions/index';
import {withRouter} from 'react-router-dom';
import MyInput from '../components/MyInput';
import Home from '../containers/Home';
import '../../scss/style.scss';

class Login extends React.Component{
	constructor(props) {
    super(props);
    this.state={
      canSubmit:false,
      login:true
    }
    this.enableButton = this.enableButton.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.submit = this.submit.bind(this);
	}

  submit(data){
    this.refs.form.reset();
    this.props.loginUser(data);
  }
  enableButton() {
    this.setState({ canSubmit: true });
  }
  disableButton() {
    this.setState({ canSubmit: false });
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.token.activeUser){
      this.props.history.push('/dashboard');
    }else{
      this.setState({login:false})
    }
  }
	render(){

		return(
			<div className='form-height'>
        <Form onSubmit={this.submit} ref='form' onValid={this.enableButton} onInvalid={this.disableButton}>
          <MyInput type='text' value='' title='Phone' name='phone' required/><br/>
          <MyInput type='password' value='' title='Wallet Password' name='password' required/><br/>
          <button disabled={!this.state.canSubmit} className="btn btn-info custom">Secure Login</button>
        </Form>
        {!this.state.login?<p>InValidLogin</p>:null}
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

function matchDispatchToProps(dispatch){
	return bindActionCreators({loginUser:loginUser},dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(withRouter(Login));
