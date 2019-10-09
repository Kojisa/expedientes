import React,{Component} from 'react';
import {TextField,Button} from '@material-ui/core';
import DBHandler from '../DBHandler';


export default class Ente extends Component{

    constructor(props){
        super(props);
        this.state={
            cuit:'',
            razon:'',
            direccion:'',
            localidad:'',
            mostrarBoton:props.mostrarBoton === undefined ? true: props.mostrarBoton,
        }
        this.funBoton = props.funBoton
        this.db = new DBHandler();
        
    }

    clickBoton(){
        if(this.funBoton !== undefined && this.funBoton !== null){
            this.funBoton();
        }
    }

    aplicarCorroboracion(data){
        let confirmacion = data['confirmacion'];
        if(confirmacion === true){
            return;
        }
        this.setState({error:'Cuit ya ingresado'})
    }

    corroborarEnte(){
        this.db.corroborarEnte(this.aplicarCorroboracion.bind(this),this.state.cuit)
    }

    render(){
        return(
            <div>
                <TextField
                    value={this.state.cuit} label='Cuit' onBlur={this.corroborarEnte.bind(this)}
                    onChange={(ev)=>this.setState({cuit:ev.target.value})}
                ></TextField>
                <TextField
                    value={this.state.razon} label='Razon'
                    onChange={(ev)=>this.setState({razon:ev.target.value})}
                ></TextField>
                <TextField
                    value={this.state.direccion} label='Direccion'
                    onChange={(ev)=>this.setState({direccion:ev.target.value})}
                >
                </TextField>
                <TextField
                    value={this.state.localidad} label='Localidad'
                    onChange={(ev)=>this.setState({localidad:ev.target.value})}
                ></TextField>
                {this.state.mostrarBoton === true?<Button
                    onClick={this.clickBoton.bind(this)()}
                >Siguiente</Button>:null}
            </div>
        )
    }
}