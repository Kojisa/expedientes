import React,{Component} from 'react';
import {TextField,Button} from '@material-ui/core';
import DBHandler from '../DBHandler';



export default class Login extends Component{

    constructor(props){
        super(props);
        this.state = {
            usuario:'',
            contra:'',
            error:''
        }
        this.db = new DBHandler();
        this.actualizarLogin = props.act;
    }

    login(){
        this.db.login(this.manejarLogin.bind(this),{usuario:this.state.usuario,contra:this.state.contra})
    }

    manejarLogin(datos){
        let usuario = datos.token;
        let error = datos.error;


        if(error.length > 0){
            //mostrar error
            return;
        }
        if(usuario == null) {
            return;
        }
        document.cookie ='auth='+usuario;

    }


    render(){
        return(<div style={{width:'100%',height:'100%'}}>
            <div style={{position:'relative',width:'100%',textAlign:'center',top:'150px'}} >
                <TextField
                    value={this.state.usuario} variant='outlined' label='Usuario'
                    onChange={(ev)=>this.setState({usuario:ev.target.value})}
                ></TextField>
                <TextField
                    value={this.state.contra} variant='outlined' label='Contraseña'
                    onChange={(ev)=>this.setState({contra:ev.target.value})} type='password'
                ></TextField>
                <Button
                onClick={this.login.bind(this)}
                >Entrar</Button>
            </div>
        </div>)
    }


}