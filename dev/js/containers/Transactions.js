import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {connect} from 'react-redux';

class Transactions extends React.Component{
constructor(){
super();
this.state={
 transactions:[]
}
}
componentDidMount(){
axios.post('http://localhost:8080/usertransactions',{
	phone:this.props.user.activeUser.user.phone,
	token:this.props.user.activeUser.token
})
.then(response=>{
	this.setState({transactions:response.data.message})
}).catch(err=>{
	console.log(err);
})
}
render(){
console.log(this.state.transactions)
return(
	<div>
	<br/>
		<table className='table'>
			<tr>
				<th>Sent By</th>
				<th>Received By</th>
				<th>Amount</th>
			</tr>
			{
			  this.state.transactions.map(function(transaction,index) {
			    return(
			    	<tr key={index}>
			 		    <td>{transaction.sentby}</td>
			   			<td>{transaction.receivedby}</td>
			   			<td>{transaction.amount}</td>
						</tr>
			    )
			  })
		  }
		</table>
	</div>
	)
}
}

function mapStateToProps(state){
console.log(state);
return{
user:state.activeUser
}
}
export default connect(mapStateToProps)(Transactions);
