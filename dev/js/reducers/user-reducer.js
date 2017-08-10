import {AddUser,LoginUser} from '../actions/types';

export default function(state=null, action){
	switch(action.type){
		case AddUser:
			console.log(action.User);
			return{
				user:action.User
			}
		case LoginUser:
			console.log(action.activeUser);
			return{
				activeUser:action.activeUser
			}
	}
	return state;
}
