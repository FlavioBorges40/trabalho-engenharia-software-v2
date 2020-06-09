import React from 'react';
import Membro from './Membro';

interface Props{
};

interface State{

};

export default class Familia extends React.Component<Props,State>{

    render(){
        return(
            <div>
                <Membro nome= 'GOMES' snome = 'JUNIOR'></Membro>
                <Membro nome= 'JONAS' snome = 'JUNIOR'></Membro>
                <Membro nome= 'DOUGLAS' snome = 'JUNIOR'></Membro>
                <Membro nome= 'ZACK' snome = 'JUNIOR'></Membro>
                <Membro nome= 'DARIUS' snome = 'JUNIOR'></Membro>
            </div>
        )
    }
}