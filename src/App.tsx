import React from 'react';
import './App.css';
import Login from './Login';
import Logout from './Logout';
import PrivateRouter from './PrivateRouter';
import Notification from './Notification';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

interface Token {
  token: string,
  username: string,
  expiration: string
}

interface Props {

}
interface State {
  token: Token;
  response: boolean;
  path: string;
}

export default class App extends React.Component<Props, State> {

  constructor(props: Props){
    super(props);
    this.responseHandle = this.responseHandle.bind(this);
    this.tokenHandle = this.tokenHandle.bind(this);
    this.state = {
      response: false,
      path: '',
      token: {
        token:'',
        username:'',
        expiration: ''
      }
    }
  }

  tokenHandle(event: any){
    this.setState({token: event})
  }
  responseHandle(event: any){
    this.setState({response: event})
  }

  render() {
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to='/notifications'>Notifications</Link>
              </li>
              <li>
                <Link to='/logout'>Logout</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/login">
              <Login token={this.tokenHandle}/>
            </Route>
            <PrivateRouter token={this.state.token} path='/notifications'>
              <Notification />
            </PrivateRouter>
            <PrivateRouter token={this.state.token} path='/logout'>
              <Logout token={this.state.token} response={this.responseHandle}/>
            </PrivateRouter>
          </Switch>
        </div>
      </Router>
    )
  }
}