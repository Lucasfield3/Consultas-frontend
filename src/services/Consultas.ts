
import {  getToken } from "./Authenticate";
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



export async function getConsulta(id:string): Promise<Consulta>{
    
    return await api
        .get<Consulta>(`/consultas/${id}`)
        .then(async(res)=> {
            return res.data
        })
    }
