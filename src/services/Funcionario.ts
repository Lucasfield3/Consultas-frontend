import { Credentials, Funcionario, FuncionarioAuthenticated } from "./Authenticate";
import api from "./utils/api";


export async function signUp(credentials: Credentials):Promise<Funcionario| any>{

    console.log(credentials);

    return api.post('/funcionarios/signup', credentials) as Funcionario| any
    
}

export async function getFuncionario(id:string): Promise<Funcionario | any>{
    
    return api.get(`/funcionarios/${id}`) as Funcionario| any
}