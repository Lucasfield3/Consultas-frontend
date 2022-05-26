import { DEFAULT_FUNCIONARIO } from "../context/Auth/AuthContext";
import { FuncionarioAuthenticated } from "./Authenticate";
import { Paciente } from "./Pacientes";
import api from "./utils/api";


export interface Consulta {
    id?:string;
    data:Date;
    pacienteId:string
    paciente?:Paciente;
}

export interface NewConsulta {
    pacienteTel:string;
    pacienteNome:string;
    data:string;
}


export async function createConsulta(data:NewConsulta):Promise<Consulta>{

    console.log(data);
    return await api
        .post<Consulta>('/consultas', data)
        .then(async(res)=> {
            return res.data
        })
}

export async function getConsulta(id:string): Promise<Consulta>{
    
    return await api
        .get<Consulta>(`/consultas/${id}`,)
        .then(async(res)=> {
            return res.data
        })
    }
export async function getConsultas(funcionario:FuncionarioAuthenticated): Promise<Consulta[] | any>{
    
    return await api
        .get<Consulta[]>('/consultas')
        .then(async(res)=> {
            if(funcionario !== DEFAULT_FUNCIONARIO){
                return res.data
            }
        })
    }

export async function removeConsulta(id:string): Promise<Consulta>{

    return await api
        .delete<Consulta>(`consultas/${id}`)
        .then(async(res)=> {
            return res.data
        })
    }

export async function editConsulta(id:string, data:NewConsulta): Promise<Consulta>{

    console.log(data);

    return await api
        .patch<Consulta>(`consultas/${id}`, data)
        .then(async(res)=> {
            return res.data
        })
    }
