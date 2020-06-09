import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import logo from './react-logo.png';
import axios from 'axios';

interface Token {
    token: string,
    username: string,
    expiration: string
}

interface State {
    uri: string,
    username: string,
    password: string,
    response: string,
    error500: string,
    token: Token
}

interface Props {
    token: any;
}

export default class Login extends React.Component<Props, State>{

    constructor(props: Props) {
        super(props);
        this.changeUserHandle = this.changeUserHandle.bind(this);
        this.changePasswordHandle = this.changePasswordHandle.bind(this);
        this.loginHandle = this.loginHandle.bind(this);
        this.cadastroHandle = this.cadastroHandle.bind(this);
        this.state = {
            uri: '/Treino/dog/auth',
            username: '',
            password: '',
            response: '',
            error500: "Não foi possível acessar o Banco de Dados!",
            token: {
                token:'',
                username:'',
                expiration: ''
            }
        }
    }

    changeUserHandle(event: any) {
        this.setState({ username: event.target.value })
    }
    changePasswordHandle(event: any) {
        this.setState({ password: event.target.value })
    }

    loginHandle(event: any) {
        const config = {
            headers: { "Content-Type": "application/json" }
        };
        axios.post(`${this.state.uri}/entrar`,
            {
                username: this.state.username,
                password: this.state.password
            }, config)
            .then(res => {
                this.setState({response: res.data});
            })
    }
    
    cadastroHandle(event: any) {
        const config = {
            headers: { "Content-Type": "application/json" }
        };
        axios.post(`${this.state.uri}/cadastrar`,
            {
                username: this.state.username,
                password: this.state.password
            }, config)
            .then(res => {
                this.setState({response: res.data});
            })
    }

    render() {
        return (
            <div className='loginscreen'>
                <img className='logo' src={logo} alt='logo' />
                <form noValidate autoComplete="off">
                    <div>
                        <TextField onChange={this.changeUserHandle} id="user-login" label="Login" inputProps={{maxLength: 16}}/>
                    </div>
                    <div>
                        <TextField onChange={this.changePasswordHandle} id="user-password" label="Senha" type="password" autoComplete="current-password" inputProps={{maxLength: 16}}/>
                    </div>
                    <br />
                    <Button onClick={this.loginHandle} variant="contained" color="primary" aria-label="contained primary button group" id="entrar">Entrar</Button>
                    <Button onClick={this.cadastroHandle} variant="contained" color="primary" aria-label="contained primary button group" id="cadastrar">Cadastrar</Button>
                </form>
                <h3 id="resposta">{this.state.response}</h3>
            </div>
        );
    }
}

export function checkPermition(token: Token, uri: string): any {
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