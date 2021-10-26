import React, { useEffect } from 'react'
import {AgGridColumn, AgGridReact} from 'ag-grid-react';
import './Table.css'
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import persons from "../../../public/data/vaccine_dates.json";

const Table = ({currentDate}) => {

    var date = currentDate.toJSON().slice(0, 10);
    var nDate = date.slice(0, 4) + '-' 
               + date.slice(5, 7) + '-' 
               + date.slice(8, 10);

    const DateRenderer=(props)=>{
        return(    
          <h3 style={{color:props.data.vaccination_date>nDate?'green':'red',fontSize:'14px',margin:'0px'}}>{props.data.vaccination_date >nDate?"Vaccine Done":"Vaccine Pending"}</h3>      
        )     
      }
     
 
    return (
        <div className="ag-theme-alpine" style={{height: 400, width: 600,flex:'0.5',padding:'5%'}}>
            {currentDate &&<AgGridReact
                rowData={persons}
                frameworkComponents={{dateRenderer:DateRenderer}}>
                <AgGridColumn field="person_name" headerName="Name" filter={true} sortable={true} flex={1}  headerClass="headerclass" rowStyle={{display:'flex'}}></AgGridColumn>
                <AgGridColumn field="vaccination_date" headerName="Vaccination date" filter={true} sortable={true} flex={1} cellRenderer="dateRenderer"  rowStyle={{display:'flex'}}  headerClass="headerclass"></AgGridColumn>
           
            </AgGridReact>
            
            }
        </div>
        
    )
}

export default Table
