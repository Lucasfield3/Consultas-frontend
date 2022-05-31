import { createContext, ReactNode, useState } from 'react'
import { getToken } from '../../services/Authenticate';
import { Consulta, getConsulta, NewConsulta } from '../../services/Consultas'

import api from '../../services/utils/api';

type ConsultaContextData = {
    registerConsulta:(data: NewConsulta)=>Promise<Consulta>;
    getAllConsultas:()=>Promise<Consulta[]>;
    getOneConsulta:(id:string)=> Promise<Consulta>;
    removeOneConsulta:(id:string)=> Promise<Consulta>;
    editOneConsulta:(id:string, data:NewConsulta)=> Promise<Consulta>;
    consultas:Consulta[];
    consulta:Consulta | undefined;
    formatDate:(value:Date)=>string;
}

type ConsultaContextProviderProps = {
     children: ReactNode
}


export const ConsultaContext = createContext({} as ConsultaContextData)

export const ConsultaContextProvider = ({children}: ConsultaContextProviderProps) =>{

    const [ consultas, setConsultas ] = useState<Consulta[]>([])
    const [ consulta, setConsulta ] = useState<Consulta>()

    async function registerConsulta(newConsulta: NewConsulta):Promise<Consulta | any> {
        try {
            if(getToken()){
                const {data} = await api.post<Consulta[]>('/consultas', newConsulta) 
    
                console.log(data)
            }
        } catch (error) {
            console.log(error);
            
        }
    }

    async function getAllConsultas(): Promise<Consulta[] | any>{

        try {
            if(getToken()){
                const {data} = await api.get<Consulta[]>('/consultas')
                setConsultas(data)
            }
        } catch (error) {
            console.log(error);
            
        }
    }
    

    
    async function getOneConsulta(id:string):Promise<Consulta> {
        const response = await getConsulta(id)
        if(response){
            console.log(response);
            setConsulta(response)
        }
        return response
    }

    async function removeOneConsulta(id:string):Promise<Consulta | any> {
        
            if(getToken()){
                await api.delete<Consulta>(`consultas/${id}`) 
    
                getAllConsultas()
            }
        
    }

    async function editOneConsulta(id:string, newConsulta:NewConsulta):Promise<Consulta | any> {
        try {
            if(getToken()){
                const {data} = await api.patch<Consulta>(`consultas/${id}`, newConsulta) 
    
                console.log(data);
            }
        } catch (error) {
            console.log(error);
            
        }
    }

    const formatDate = (value:Date)=>{
       
        let date = new Date(value),
         day = date.getDate().toString().padStart(2, '0'),
         month = (date.getMonth()+1).toString().padStart(2, '0'),
         year  = date.getFullYear(),
         hour = date.getHours().toString().padStart(2, '0'),
         minutes = date.getMinutes().toString().padStart(2, '0')
        
        return day+"/"+month+"/"+year+" "+hour+":"+minutes
        
     }



     return(
          <ConsultaContext.Provider value={{formatDate ,editOneConsulta ,removeOneConsulta ,consulta ,getOneConsulta ,getAllConsultas, registerConsulta, consultas}}>
               {children}
          </ConsultaContext.Provider>
     )

}