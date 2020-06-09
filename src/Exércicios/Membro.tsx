import React from 'react';

interface Props{
    nome: string;
    snome: string;
};
interface State{
    nome: string;
    snome: string;
};

export default class Membro extends React.Component<Props, State>{
    constructor(props: Props){
        super(props);
        this.state = {
            nome: this.props.nome,
            snome: this.props.snome
        }
        // this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // handleChange (event: any) {
    //     this.setState({nome: event.target.value});
    //     console.log(this.state.nome);
    // }

    handleSubmit (event: any){
        this.setState({nome: event.target.value});
        console.log(this.state.nome);
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <p>{this.state.nome} {this.state.snome}</p>
                <input defaultValue={this.state.nome}/>
                <input type="submit" value="alterar"/>
            </form>
        )
    }
}