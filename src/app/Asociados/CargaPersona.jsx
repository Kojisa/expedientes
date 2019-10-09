import React,{Component} from 'react';
import {Typography,TextField,Paper,Select, Button} from '@material-ui/core';
import DBHandler from '../DBHandler';




export default class Carga extends Component{

    constructor(props){
        super(props);
        this.state={
            nombre:'',
            apellido:'',
            cuit:'',
            dni:'',
            calle:'',
            altura:'',
            dpto:'',
            anotacion:'',
            telefonos:[{numero:''},{numero:''},{numero:''}],
            mail:'',
            codPost:'',
            localidad:'',
            id:'',
            localidades:[],
            observaciones:'',
        }

        this.funbot = props.funbot
        this.db = new DBHandler();
    }

    componentWillReceiveProps(props){
        this.setState({
            nombre:'',
            apellido:'',
            cuit:'',
            dni:'',
            calle:'',
            altura:'',
            dpto:'',
            anotacion:'',
            telefonos:[{numero:''},{numero:''},{numero:''}],
            mail:'',
            codPost:'',
            localidad:'',
            id:'',
            observaciones:'',
        })
        this.funbot = props.funbot;
    }

    guardarDatos(){

        let datos={
            nombre:this.state.nombre,
            apellido:this.state.apellido,
            cuit:this.state.cuit,
            dni:this.state.dni,
            calle:this.state.calle,
            altura:this.state.altura,
            dpto:this.state.dpto,
            anotacion:this.state.anotacion,
            mail:this.state.mail,
            codPost:this.state.codPost,
            localidad:this.state.localidad,
            telefonos:this.state.telefonos,
            observaciones:this.state.observaciones,
        }
        this.db.enviarPeticion(this.funbot,'personas/ingresar',datos)

    }


    render(){
        return(<div>
            <TextField
                value={this.state.nombre} label='Nombre' dense
                onChange={(ev)=>this.setState({nombre:ev.target.value})}
            ></TextField>
            <TextField
                value={this.state.apellido} label='Apellido' dense
                onChange={(ev)=>this.setState({apellido:ev.target.value})}
            ></TextField>
            <TextField
                value={this.state.cuit} label='CUIT' dense
                onChange={(ev)=>this.setState({cuit:ev.target.value})}
            ></TextField>
            <TextField
                value={this.state.calle} label='Calle' dense
                onChange={(ev)=>this.setState({calle:ev.target.value})}
            ></TextField>
            <TextField dense
                value={this.state.altura} label='Altura' type='number'
                onChange={(ev)=>this.setState({altura:ev.target.value})}
            ></TextField>
            <TextField
                value={this.state.dpto} label='Dpto.' dense
                onChange={(ev)=>this.setState({dpto:ev.target.value})}
            ></TextField>
            <TextField
                value={this.state.codPost} label='Codigo Postal' dense
                onChange={(ev)=>this.setState({codPost:ev.target.value})}
            ></TextField>
            <TextField
                value={this.state.localidad} label='Localidad' dense
                onChange={(ev)=>this.setState({localidad:ev.target.value})}
                >
            </TextField>
            <TextField
                value={this.state.mail} label='Mail' dense
                onChange={(ev)=>this.setState({mail:ev.target.value})}
            ></TextField>
            {this.funbot !== undefined? <Button  onClick={this.guardarDatos.bind(this)}>Siguiente</Button>:null}
        </div>) 
    }
}