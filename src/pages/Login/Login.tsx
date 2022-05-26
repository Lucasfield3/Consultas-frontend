
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { PageDefault } from '../../components/PageDefault/PageDefault';
import { AuthContext, DEFAULT_FUNCIONARIO } from '../../context/Auth/AuthContext';
import { Credentials, FuncionarioAuthenticated } from '../../services/Authenticate';
import './style.css';


export function Login() {
  const { signIn, funcionario } = useContext(AuthContext)

  const navigate = useNavigate()

  const { register, handleSubmit } = useForm<Credentials>()

  const onSubmit = async (data:Credentials) => {
    const funcionarioRes = await signIn(data) as FuncionarioAuthenticated
    if(funcionarioRes){
      if(funcionario !== DEFAULT_FUNCIONARIO){
        setTimeout(()=>navigate('/home'), 600)
      }
    }
    
  }


  return (
    <PageDefault>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className='custom-form'>
          <input {...register("nome", {required:true})} placeholder='Nome' type="text" />
          <input {...register("hash_senha", {required:true})} placeholder='senha' type="password" />
          <button type="submit" >Entrar</button>
      </form>

      <Link to='/register' ><p>Não tem cadastro ainda?, clique aqui.</p></Link>
    </PageDefault>
  );
};