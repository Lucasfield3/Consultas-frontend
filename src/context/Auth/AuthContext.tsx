
import { createContext, ReactNode, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Credentials, FuncionarioAuthenticated, login, storeToken } from '../../services/Authenticate'

let DEFAULT_FUNCIONARIO = {
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
    funcionario:FuncionarioAuthenticated | undefined;
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
    const navigate = useNavigate()

    const signIn = async(data: Credentials):Promise<FuncionarioAuthenticated| any>=>{
        setLoading(true)
        console.log(data);
        const response =  await login(data)
        const funcionarioRes = response.data as FuncionarioAuthenticated | any

        if(funcionarioRes){
            localStorage.setItem('funcionário', JSON.stringify(funcionarioRes))
            storeToken(funcionarioRes.jwtToken)
            setFuncionario(funcionarioRes)
            setLoading(false)
        }

        return funcionarioRes
       
    }

    

     return(
          <AuthContext.Provider value={{loading ,signIn, funcionario, authenticated:(funcionario === DEFAULT_FUNCIONARIO ? false : true)}}>
               {children}
          </AuthContext.Provider>
     )

}