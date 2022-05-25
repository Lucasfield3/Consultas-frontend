import { createContext, useContext, ReactNode, useState, useEffect } from 'react'
import { createPaciente, getPacientes, Paciente } from '../../services/Pacientes'

type PacienteContextData = {
    registerPaciente: (data: Paciente) => Promise<Paciente | any> ;
    pacientes:Paciente[];
    getAllPacientes:()=> Promise<Paciente[] | any>;
}

type PacienteContextProviderProps = {
     children: ReactNode
}

export const PacienteContext = createContext({} as PacienteContextData)

export const PacienteContextProvider = ({children}: PacienteContextProviderProps) =>{
    const [ pacientes, setPacientes ] = useState<Paciente[]>([])

    async function registerPaciente(data: Paciente):Promise<Paciente | any> {
        const response = await createPaciente(data)
        const paciente = response.data as Paciente

        if(paciente){
            console.log(paciente);
            
        }
    }

    async function getAllPacientes():Promise<Paciente[] | any>{
        const response = await getPacientes()
        const pacienteRes = response.data as Paciente[]

        if(pacienteRes){
            setPacientes(pacienteRes)
        }
    }

    

    useEffect(()=>{
        getAllPacientes()
        console.log(pacientes);
    }, [])

     return(
          <PacienteContext.Provider value={{getAllPacientes ,registerPaciente, pacientes}}>
               {children}
          </PacienteContext.Provider>
     )

}