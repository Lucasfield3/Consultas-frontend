
import { createContext, ReactNode, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Credentials, FuncionarioAuthenticated, getPayload, getToken, login, storeToken } from '../../services/Authenticate'

export let DEFAULT_FUNCIONARIO = {
    jwtToken:'', 
    name: '',
    senha: '',
} as FuncionarioAuthenticated



const storageItem = localStorage.getItem('funcionário')

let recoveredFuncionario:FuncionarioAuthenticated | null;

if(storageItem){
    recoveredFuncionario = JSON.parse(storageItem)
}



export type AuthContextData = {
    signIn: (data: Credentials) => Promise<FuncionarioAuthenticated | any> ;
    funcionario:FuncionarioAuthenticated;
    authenticated:boolean;
    loading:boolean;
}

export type AuthContextProviderProps = {
     children: ReactNode
}



export const AuthContext= createContext({} as AuthContextData)

export const AuthContextProvider = ({children}: AuthContextProviderProps) =>{


    const [ funcionario, setFuncionario ] = useState<FuncionarioAuthenticated>(!recoveredFuncionario ? DEFAULT_FUNCIONARIO : recoveredFuncionario);
    const [ loading, setLoading ] = useState<boolean>(false)

    let storeFuncionario:FuncionarioAuthenticated | null;
    const signIn = async(data: Credentials):Promise<FuncionarioAuthenticated| any>=>{
        setLoading(true)
        const response =  await login(data)
        const funcionarioRes = response.data as FuncionarioAuthenticated | any

        if(funcionarioRes){
            localStorage.setItem('funcionário', JSON.stringify(funcionarioRes))
            storeFuncionario = JSON.parse(localStorage.getItem('funcionário')!)
            storeToken(funcionarioRes.jwtToken)
            setLoading(false)
        }

        console.log(funcionario);
        
        return funcionarioRes
       
    }

    useEffect(() => {
  
        if(storeFuncionario){
            setFuncionario(prevstate => { return {...prevstate,...storeFuncionario}});
            console.log(storeFuncionario);
            
        }
      }, [storeFuncionario!]);
    

    

     return(
          <AuthContext.Provider value={{loading ,signIn, funcionario, authenticated:(!getPayload() ? false : true)}}>
               {children}
          </AuthContext.Provider>
     )

}