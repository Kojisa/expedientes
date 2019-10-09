import React,{Component} from 'react';
import {Paper,TextField, MenuItem,
    Select,FormControl,Button,
    Dialog,DialogTitle,DialogContent,
    DialogActions} from '@material-ui/core';
import DBHandler from '../DBHandler';
import Persona from '../Asociados/SeleccionPersona';
import Ente from '../Asociados/SeleccionarEnte';


export default class IngresoExpediente extends Component{
    constructor(props){
        super(props);
        this.state={
            anio:'',
            fechaInicio:'',
            fechaFin:'',
            tipoPersona:'',
            persona:'', //id devuelta por el metodo de ingreso
            caracteristica:'',
            tipo:'Municipal',
            extracto:'',
            alcance:'',
            cuerpo:'',
            comentario:'',
            cuit:'',
            origen:'Municipalidad',
            tiposPersona:[
                <MenuItem value='Ente'>Ente</MenuItem>,
                <MenuItem value='Persona'>Persona</MenuItem>,
            ],
            tipos:[
                <MenuItem value='Municipal'>Municipal</MenuItem>, //1 en el viejo
                <MenuItem value='Provincial'>Provincial</MenuItem>, //2 en el viejo
                <MenuItem value='Nacional'>Nacional</MenuItem> //3 en el viejo
            ],
            origenes:[ //para marcarlo despues en la base de datos
                <MenuItem value='Municipalidad'>Municipalidad</MenuItem>,
                <MenuItem value='HCD'>HCD</MenuItem>
            ],
            busquedaRelacionado:false,

        }
        this.db = new DBHandler();
    }

    activarMenu(){
        this.setState({
            busquedaRelacionado:true
        })
    }

    seleccionarRelacionado(id){
        this.setState({
            persona:id,
            busquedaRelacionado:false,
        })
    }

    cerrarRelacionado(){
        this.setState({
            busquedaRelacionado:false,
        })
    }

    guardar(){
        //funcion que va a guardar datos.
        
    }


    mostrarBoton(){
        if(this.state.anio.length === 0 || this.state.caracteristica.length === 0 ||
            this.state.alcance.length === 0 || this.state.cuerpo.length === 0){
            return false;
        }

        if(this.state.extracto.length === 0){
            return false;
        }

        if(this.state.persona === ''){
            return false;
        }

        return true;
    }

    render(){

        let relacionado = null;
        if (this.state.busquedaRelacionado === true){
            relacionado = 
                <Dialog open={this.state.busquedaRelacionado}
                    onClose={this.cerrarRelacionado.bind(this)}
                > 
                    <DialogContent>
                        {this.state.tipoPersona === 'Ente' ? <Ente funDev={this.seleccionarRelacionado.bind(this)}/>:
                        <Persona funDev={this.seleccionarRelacionado.bind(this)} />}
                    </DialogContent>
                </Dialog>
        }



        let mostrarBoton = this.mostrarBoton.bind(this)()


        return( 
            <div style={{left:'10vw',position:'relative'}}>
                <div style={{width:'80vw'}} >
                    <div>
                        <TextField
                                value={this.state.caracteristica} label='Caracteristica'
                                variant='outlined' margin='dense'
                                onChange={(ev)=>this.setState({caracteristica:ev.target.value})}
                            ></TextField>
                        <TextField margin='dense'
                            value={this.state.anio} label='Año' variant='outlined'
                            onChange={(ev)=>this.setState({anio:ev.target.value})}
                        ></TextField>
                        <TextField margin='dense'
                            value={this.state.alcance} label='Alcance' variant='outlined'
                            onChange={(ev)=>this.setState({alcance:ev.target.value})}
                        ></TextField>
                        
                        <TextField margin='dense'
                            value={this.state.cuerpo} label='Cuerpo' variant='outlined'
                            onChange={(ev)=>this.setState({alcance:ev.target.value})}
                        ></TextField>
                    </div>
                    <div>
                        <FormControl>
                            <label htmlFor="tipo">Tipo Expendiente</label>
                            <Select
                                variant='outlined' dense
                                inputProps={{id:'tipo'}} value={this.state.tipo}
                                onChange={(ev)=>this.setState({tipo:ev.target.value})}
                            >
                                {this.state.tipos}
                            </Select>
                        </FormControl>
                        <FormControl>
                            <label htmlFor="origen">Origen</label>
                            <Select
                                variant='outlined'
                                inputProps={{id:'origen'}} value={this.state.origen}
                                onChange={(ev)=>this.setState({origen:ev.target.value})}
                            >
                                {this.state.origenes}
                            </Select>
                        </FormControl>
                    </div>
                    <div>
                        <TextField margin='dense'
                            label='Extracto' multiline fullWidth
                            value={this.state.extracto} variant='outlined'
                            onChange={(ev)=>this.setState({extracto:ev.target.value})}
                        >
                        </TextField>
                    </div>
                        <TextField label='Comentario' fullWidth variant='outlined'
                            value={this.state.comentario} margin='dense' multiline
                            onChange={(ev)=>this.setState({comentario:ev.target.value})}
                        >
                        </TextField>
                    <div>
                        <FormControl>
                            <label htmlFor="persona">Tipo Persona</label>
                            <Select
                                variant='outlined'
                                inputProps={{id:'persona'}} value={this.state.tipoPersona}
                                onChange={(ev)=>this.setState({tipoPersona:ev.target.value})}
                            >
                                {this.state.tiposPersona}
                            </Select>
                        </FormControl>
                        {this.state.tipoPersona !== '' ? 
                        <div>
                        <TextField value={this.state.cuit}
                            margin='dense' label='CUIT' variant='outlined'
                            onChange={(ev)=>this.setState({cuit:ev.target.value})}
                        />
                        <Button onClick={this.activarMenu.bind(this)} >Buscar</Button>
                        </div>: null}
                        {relacionado}
                    </div>
                    {mostrarBoton === true? <Button onClick={this.guardar.bind(this)} >Guardar</Button>:null}
                </div>
                
            </div>
        )
    }


}



