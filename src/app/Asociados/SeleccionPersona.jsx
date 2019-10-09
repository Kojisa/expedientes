import React,{Component} from 'react';
import {TextField,Select,MenuItem,FormControl,Button
,Typography} from '@material-ui/core';
import {Table,Column,AutoSizer} from 'react-virtualized';
import NuevaPersona from '../Asociados/CargaPersona';
import 'react-virtualized/styles.css';





export default class Busqueda extends Component{
    constructor(props){
        super(props);
        this.state={
            personas:[],
            filtro:'',
            tipo:'CUIT',
            tipos:[
                <MenuItem value='CUIT' >CUIT</MenuItem>,
                <MenuItem value='Nombre'>Nombre</MenuItem>,
            ],
            nuevo:false,
            campos:[
                {label:'CUIT',datakey:'cuit'},
                {label:'Nombre',datakey:'nombre'},
            ]
        }
        this.devolverDato = props.funDev;
    }

    componentWillReceiveProps(props){
        if(props.funDev !== undefined){
            this.devolverDato = props.funDev;
        }
    }

    clickFila(datos){
        let info = datos.rowData;
        if(this.devolverDato !== undefined){
            this.devolverDato(info.id);
        }
    }

    seleccionar(id){
        this.setState({
            nuevo:false,
        })
        this.devolverDato(id);
    }

    render(){

        let nuevo = null;
        let listado = [];
        for (let x = 0; x < 10; x++){
            listado.push({
                'id':x,
                'cuit':x*100,
                'nombre':x
            })
        }
        let busqueda = null;
        if (this.state.nuevo === true){
            nuevo = <NuevaPersona funbot={this.seleccionar.bind(this)}></NuevaPersona>
        }
        else{
            busqueda = <div  style={{width:'40vw',height:'60vh'}}>
                        <AutoSizer  >
                            {({width,height})=>(<Table 
                            width={width}
                            height={height}
                            rowHeight={30}
                            rowCount={listado.length}
                            rowGetter={({index})=>listado[index]}
                            onRowClick={this.clickFila.bind(this)}
                            >
                                { this.state.campos.map((elem,ind)=><Column key={ind} width={70}
                                    label={elem.label} dataKey={elem.datakey} flexGrow={1}
                                    flexShrink={1} headerRenderer={()=> <Typography>{elem.label}</Typography>    }
                                ></Column>)}
                            </Table>)}
                        </AutoSizer>
                    </div>
        }


        return <div>
            <div>
                <TextField
                    value={this.state.filtro} label='Filtro' variant='outlined'
                    onChange={(ev)=>this.setState({filtro:ev.target.value})}
                ></TextField>
                <FormControl>
                    <label htmlFor="tipo">Tipo</label>
                    <Select
                        variant='outlined'
                        inputProps={{id:'tipo'}} value={this.state.tipo}
                        onChange={(ev)=>this.setState({tipo:ev.target.value})}
                    >
                        {this.state.tipos}
                    </Select>
                </FormControl>
                <Button onClick={()=>this.setState({nuevo:!this.state.nuevo})} >{this.state.nuevo === false? 'Nuevo':'Cancelar'}</Button>
            </div>
            {nuevo}
            {busqueda}
        </div>
    }
}