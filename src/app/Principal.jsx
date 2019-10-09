import React,{Component} from 'react';
import {TextField,AppBar,Toolbar,MenuItem,
Typography,} from '@material-ui/core';

import Expedientes from './Expedientes/IngresoExpedientes';

export default class Principal extends Component{

    constructor(props){
        super(props);
        this.state={
            permisos:{},
            botonera:true,
            titulo:'Principal',
        }
    }

    armarBotonera(){
        return 
    }

    render(){
        return(<div>
            <AppBar position='static'>
                <Toolbar dense={true}>
                    <Typography>
                        {this.state.titulo}
                    </Typography>
                </Toolbar>
            </AppBar>
            <div>
                <Expedientes/>
            </div>
        </div>)
    }
}