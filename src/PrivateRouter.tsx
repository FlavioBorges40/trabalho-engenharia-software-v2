import React from 'react';
import axios from 'axios';
//import { checkPermition } from './Login';
import {
    Route,
    Redirect
} from 'react-router-dom';
interface Token {
    token: string,
    username: string,
    expiration: string
}

interface Props {
    path: string;
    token: Token;
}
interface State {
    response: boolean;
}

export default class PrivateRouter extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.checkPermission = this.checkPermission.bind(this);
        this.state = {
            response: false
        }
    }

    checkPermission(token: Token, uri: string): any {
        var resposta: boolean;
        const config = {
            headers: { "Content-Type": "application/json" }
        };
        axios.post(`/Treino/dog/auth/autorizar`,
            {
                token: token.token,
                uri: uri
            },
            config)
            .then(res => {
                resposta = res.data;
                console.log(resposta);
                return resposta;
            })
      }

    render() {
        return (
            <div>
                <Route
                    {...this.state}
                    render={({ location }) =>
                    true ? (this.props.children) : (
                            <Redirect
                                to={{
                                    pathname: "/login",
                                    state: { from: location }
                                }}
                            />
                        )
                    }
                />
            </div>
        )
    }
}