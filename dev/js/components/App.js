import React from 'react';
import Register from '../containers/Register';
import Login from '../containers/Login';
import Home from '../containers/Home';
import routes from '../routes/routes';
import {Link,HashRouter,Route} from 'react-router-dom';
import {Grid,Row,Col,Tabs,Tab} from 'react-bootstrap/lib';
import '../../scss/style.scss'

const App = () => (
  <div className='body-height'>
  	<Grid>
  		<Row>
  			<Col lg={3}></Col>
  				<Col lg={4}>
				    <Tabs defaultActiveKey={1} id='login-signup-tabs'>
				      <Tab eventKey={1} title='Log In' >
				      	<Login />
				      </Tab>
				      <Tab eventKey={2} title='Sign Up' >
				      	<Register />
				      </Tab>
				    </Tabs>
  				</Col>
  			<Col lg={5}></Col>
  		</Row>
  	</Grid>
  </div>
);

export default App;
