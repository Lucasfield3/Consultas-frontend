
import jwt_decode from "jwt-decode";
import api, { access_token } from "./utils/api";


export interface Credentials {
    nome: string;
    hash_senha: string;
}

export interface AccessToken {
    access_token: string;
}

export interface PayLoad {
    funcionarioId: string;
    iat:number;
    exp:number;
    sub:string;
}

export interface FuncionarioAuthenticated {
    name: string;
    jwtToken: string;
    senha: string;
}

export interface Funcionario{
    id?:string;
    nome: string;
    hash_senha: string;
}


export async function login(credentials: Credentials):Promise<FuncionarioAuthenticated | any>{

    console.log(credentials);

    return api.post('/funcionarios/signin', credentials) as FuncionarioAuthenticated | any
    
}


export const storeToken = (token:string)=>{
    
    if(token === access_token){
        console.log('é igual');
        
    }else{
        console.log('diferente');
        console.log(token)
        console.log(access_token)
    
    }

    return window.localStorage.setItem('access_token', token)
}

export const getToken = () =>{
    return window.localStorage.getItem('access_token')
}

export const getPayload = ()=>{
    const token = window.localStorage.getItem('access_token')
    if(token){
        return jwt_decode(token) as PayLoad
    }
}