import React,{Component} from 'react';
import {TextField,Button,ExpansionPanel,ExpansionPanelSummary
    ,ExpansionPanelDetails,ExpansionPanelActions} from '@material-ui/core';
import {Table,Column} from 'react-virtualized';




export default class MoverExp extends Component{
    constructor(props){
        super(props);
        this.state = {
            expedientes:[],
            filtro:'',
            tipoFiltro:'',
            orden:'',
        }
    }
}






class FilaExpediente extends Component{
    constructor(props){
        super(props);
        this.state = {
            expediente:'',
            anexados:[],
        }
    }

    render(){
        return <ExpansionPanel>
            <ExpansionPanelSummary>
                {this.state.expediente}
            </ExpansionPanelSummary>
            <ExpansionPanelActions>
                <Button variant='contained' color='secondary'
                    >Eliminar</Button>
                <Button variant='contained'>Anexar</Button>
            </ExpansionPanelActions>
        </ExpansionPanel>
    }
}