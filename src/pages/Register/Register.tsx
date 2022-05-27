
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { PageDefault } from '../../components/PageDefault/PageDefault';
import { Credentials } from '../../services/Authenticate';
import { signUp } from '../../services/Funcionario';


import '../Login/style.css'

export type Inputs = {
  nome: string;
  hash_senha: string;
}
export function Register() {

  const navigate = useNavigate()

  const { register, handleSubmit } = useForm<Credentials>()

  const onSubmit = async (data:Credentials) => {
    
    if(data.hash_senha !== import.meta.env.VITE_SENHA_FUNCIONARIO ){
      alert('senha de acesso incorreta')
      return
    }
    const funcionario = await signUp(data)
    if(funcionario){
        navigate('/') 
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

      <Link to='/' ><p>Ja tem cadastro? se sim, clique aqui</p></Link>
    </PageDefault>
  );
};



