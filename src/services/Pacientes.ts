
import api from "./utils/api";

export type Paciente = {
    id?:string;
    nome:string;
    telefone:string;
}

export async function createPaciente(paciente: Paciente):Promise<Paciente| any>{

    console.log(paciente);

    return api.post('/pacientes', paciente) as Paciente| any
    
}

export async function getPaciente(id:string): Promise<Paciente | any>{
    
    return api.get(`/pacientes/${id}`) as Paciente| any
}

export async function getPacientes(): Promise<Paciente[] | any>{
    
    return api.get(`/pacientes`) as Paciente[]| any
}