
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
