
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { PageDefault } from '../../components/PageDefault/PageDefault';
import { AuthContext } from '../../context/Auth/AuthContext';
import { Credentials } from '../../services/Authenticate';
import { signUp } from '../../services/Funcionario';
type Props = {
  
};

import '../Login/style.css'

export type Inputs = {
  nome: string;
  hash_senha: string;
}
export function Register(props: Props) {
  // const { signUp } = useContext(AuthContext)

  const navigate = useNavigate()

  const { register, handleSubmit } = useForm<Credentials>()

  const onSubmit = async (data:Credentials) => {
    const funcionario = await signUp(data)
    console.log(funcionario);
    
    if(funcionario){
        navigate('/login') 
    }
}


  return (
    <PageDefault>
      <h1>Cadastro</h1>
      <form onSubmit={handleSubmit(onSubmit)} className='custom-form'>
          <input {...register("nome", {required:true})} placeholder='Nome' type="text" />
          <input {...register("hash_senha", {required:true})} placeholder='senha' type="password" />
          <button type="submit" >Registrar</button>
      </form>

      <Link to='/login' ><p>Ja tem cadastro? se sim, clique aqui</p></Link>
    </PageDefault>
  );
};



