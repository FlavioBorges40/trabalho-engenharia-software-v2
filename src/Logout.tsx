import React from 'react';
import axios from 'axios';
import { Button } from '@material-ui/core';

interface Token {
    token: string,
    username: string,
    expiration: string
}

interface State {
    uri: string;
    response: string;
}
interface Props {
    token: Token;
    response: any;
}

export default class Logout extends React.Component<Props, State>{
    constructor(props: Props) {
        super(props);
        this.deslogarHandle = this.deslogarHandle.bind(this);
        this.state = {
            uri: '/Treino/dog/auth',
            response: ''
        }
    }

    deslogarHandle() {
        const config = {
            headers: { "Content-Type": "application/json" }
        };
        axios.post(`${this.state.uri}/sair`,
        {
            token: this.props.token.token,
            username: this.props.token.username,
            expiration: this.props.token.expiration
        }, config)
        .then(res => {
            this.setState({response: res.data});
        })
    }

    render() {
        return (
            <div>
                <h3>Realmente deseja deslogar?</h3>
                <br />
                <Button onClick={this.deslogarHandle} variant="contained" color="primary" aria-label="contained primary button group">Sim</Button>
                <Button variant="contained" color="primary" aria-label="contained primary button group">Não</Button>
                <h3>{this.state.response}</h3>
            </div>
        )
    }

}