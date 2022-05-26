import { createContext, useContext, ReactNode, useState, useEffect } from 'react'
import { Consulta, createConsulta, editConsulta, getConsulta, getConsultas, NewConsulta, removeConsulta } from '../../services/Consultas'
import { Paciente } from '../../services/Pacientes';

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

const DEFAULT_PACIENTE = {
    id:'',
    nome:'',
    telefone:''
} as Paciente


export const  DEFAULT_CONSULTAS:Consulta[] = [
    {
        id:'',
        data:new Date(),
        pacienteId:'',
        paciente:DEFAULT_PACIENTE,
    } 
]

export const ConsultaContext = createContext({} as ConsultaContextData)

export const ConsultaContextProvider = ({children}: ConsultaContextProviderProps) =>{

    const [ consultas, setConsultas ] = useState<Consulta[]>(DEFAULT_CONSULTAS)
    const [ consulta, setConsulta ] = useState<Consulta>()

    async function registerConsulta(data: NewConsulta):Promise<Consulta> {
        const response = await createConsulta(data)
        if(response){
            console.log(response);
        }
        return response
    }

    async function getAllConsultas():Promise<Consulta[]> {
        const response = await getConsultas()
        if(response){
            console.log(response);
            setConsultas(response)
        }
        return response
    }

    
    async function getOneConsulta(id:string):Promise<Consulta> {
        const response = await getConsulta(id)
        if(response){
            console.log(response);
            setConsulta(response)
        }
        return response
    }

    async function removeOneConsulta(id:string):Promise<Consulta> {
        const response = await removeConsulta(id)
        if(response){
             await getAllConsultas()
        }
        return response
    }

    async function editOneConsulta(id:string, data:NewConsulta):Promise<Consulta> {
        const response = await editConsulta(id, data)
        if(response){
             await getAllConsultas()
        }
        return response
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


    useEffect(()=>{
        getAllConsultas()
    }, [])

     return(
          <ConsultaContext.Provider value={{formatDate ,editOneConsulta ,removeOneConsulta ,consulta ,getOneConsulta ,getAllConsultas, registerConsulta, consultas}}>
               {children}
          </ConsultaContext.Provider>
     )

}