import React from 'react'
import axios from 'axios'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Container, Button, ButtonGroup, TextField } from '@material-ui/core';

interface Not {
    id: string,
    name: string,
    msg: string
}

interface Props {
}
interface State {
    uri: string,
    id: string,
    name: string,
    msg: string
    notifications: Not[],
    response: string;
    error500: string;
}

export default class Notification extends React.Component<Props, State>{

    constructor(props: Props) {
        super(props);
        this.changeMsgHandle = this.changeMsgHandle.bind(this);
        this.changeNameHandle = this.changeNameHandle.bind(this);
        this.changeIdHandle = this.changeIdHandle.bind(this);
        this.deleteHandle = this.deleteHandle.bind(this);
        this.createHandle = this.createHandle.bind(this);
        //this.listHandle = this.listHandle.bind(this);
        this.searchHandle = this.searchHandle.bind(this);
        this.saveHandle = this.saveHandle.bind(this);
        this.editHandle = this.editHandle.bind(this);
        this.state = {
            uri: '/Treino/dog/not',
            id: '',
            name: '',
            msg: '',
            notifications: [],
            response: "",
            error500: "Não foi possível acessar o Banco de Dados!"
        }
        this.refresh();
    }

    changeIdHandle(event: any) {
        this.setState({ id: event.target.value });
    }
    changeNameHandle(event: any) {
        this.setState({ name: event.target.value });
    }
    changeMsgHandle(event: any) {
        this.setState({ msg: event.target.value });
    }

    searchHandle(event: any) {
        const config = {
            headers: { "Content-Type": "application/json" }
        };
        axios.post(`${this.state.uri}/buscar`,
            {
                id: '',
                name: this.state.name,
                msg: ''
            }, config)
            .then(res => {
                if(typeof res.data != "string"){
                    this.setState({ notifications: res.data });
                }
                else{
                    this.setState({response: res.data})
                }
            })
            .catch(error => {
                if (error.response.status === 500){
                    this.setState({ response: this.state.error500 });
                }
            })
    }

    editHandle(not: Not) {
        this.setState({ response: `Você está alterando a notificação "${not.name}".` });
        this.setState({ id: not.id });
        return not;
    }
    saveHandle() {
        if (this.state.id === null || this.state.id === "") {
            this.setState({ response: `Você não selecionou nenhuma notificação!` });
        }
        else if (this.state.name === "" || this.state.msg === "") {
            this.setState({ response: 'Erro, algum campo está vazio!' });
        }
        else {
            const config = {
                headers: { "Content-Type": "application/json" }
            };
            axios.post(`${this.state.uri}/alterar`,
                {
                    id: this.state.id,
                    name: this.state.name,
                    msg: this.state.msg
                },
                config)
                .then(res => {
                    this.setState({ response: res.data });
                    this.refresh();
                })
                .catch(error => {
                    if (error.response.status === 500) {
                        this.setState({ response: this.state.error500 });
                    }
                })
        }
    }

    createHandle(event: any) {
        if (this.state.name === "" || this.state.msg === "") {
            this.setState({ response: 'Erro, algum campo está vazio!' });
        }
        else {
            const config = {
                headers: { "Content-Type": "application/json" }
            };
            axios.post(`${this.state.uri}/criar`,
                {
                    id: '',
                    name: this.state.name,
                    msg: this.state.msg
                },
                config)
                .then(res => {
                    this.setState({ response: res.data });
                    this.refresh();
                })
        }
    }
    refresh() {
        axios.post(`${this.state.uri}/listar/`,
            {
            })
            .then(res => {
                this.setState({ notifications: res.data })
            }
            )
            .catch(error => {
                if (error.response.status === 500) {
                    this.setState({ response: this.state.error500 });
                }
            })
    }

    deleteHandle(not: Not) {
        axios.post(`${this.state.uri}/apagar`,
            {
                id: not.id,
                msg: "",
                name: ""
            })
            .then(res => {
                this.setState({ response: res.data });
                this.refresh();
            })
            .catch(error => {
                if (error.response.status === 500) {
                    this.setState({ response: this.state.error500 })
                }
            })
    }

    testHandle(not: Not) {
        alert(`${not.msg}`);
    }

    render() {
        return (
            <Container maxWidth="md">
                <div>
                    <h3 id="resposta">{this.state.response}</h3>
                </div>
                <div className='InputNotification'>
                    <TextField onChange={this.changeNameHandle} id="nome" label="Nome"/>
                    <TextField onChange={this.changeMsgHandle} id="mensagem" label="Mensagem"/>
                    <ButtonGroup className="InputButtonGroup" variant="contained" color="primary">
                        <Button onClick={this.createHandle} id="criar">Criar</Button>
                        <Button onClick={this.searchHandle} id="buscar">Buscar</Button>
                        <Button onClick={this.saveHandle} id="salvar">Salvar</Button>
                    </ButtonGroup>
                </div>
                <TableContainer className='NotificationTable' component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell align="right">Nome</TableCell>
                                <TableCell align="right">Mensagem</TableCell>
                                <TableCell align="right">Opções</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.notifications.map(notification => (
                                <TableRow key={notification.id}>
                                    <TableCell component="th" scope="row">{notification.id}</TableCell>
                                    <TableCell align="right">{notification.name}</TableCell>
                                    <TableCell align="right">{notification.msg}</TableCell>
                                    <TableCell align="right">
                                        <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                                            <Button onClick={() => this.testHandle(notification)} name="testar">Testar</Button>
                                            <Button onClick={() => this.editHandle(notification)} name="editar">Editar</Button>
                                            <Button onClick={() => this.deleteHandle(notification)} name="deletar">Deletar</Button>
                                        </ButtonGroup>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        )
    }
}