
import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { BackButton } from '../../components/BackButton/BackButton';
import { PageDefault } from '../../components/PageDefault/PageDefault';
import { ConsultaContext } from '../../context/Consulta/ConsultaContext';
import { NewConsulta } from '../../services/Consultas';
import './style.css';

export function EditConsultas() {

  const { consulta, getOneConsulta, editOneConsulta } = useContext(ConsultaContext)

  const { register, handleSubmit, reset, getValues } = useForm<NewConsulta>({
    defaultValues:{
      pacienteTel:'',
      pacienteNome:'',
      data:''
}})

const navigate = useNavigate()

  const { id } = useParams()

  useEffect(()=>{
    async function getCurrentConsultaOnEdit(id:string){
      const currentConsulta = await getOneConsulta(id)
      if(currentConsulta){
       // let convertedData = new Date(currentConsulta.data)
        reset({pacienteNome:currentConsulta.paciente?.nome!, 
          pacienteTel:currentConsulta.paciente?.telefone!,
          data:String(currentConsulta.data)
        })
        return currentConsulta
      }
    }
    getCurrentConsultaOnEdit(id!)
  }, [])

  async function onSubmit(){
    let today = new Date()
    let formatedDate = new Date(getValues('data'))
    let convertIso = formatedDate.toISOString()
    let hours = formatedDate.getHours()
    let minutes = formatedDate.getMinutes()
    console.log(convertIso);
    if(hours >= 17 || hours <= 8){
      if(minutes > 0){
        alert('Não se pode marcar nesse horaio')
        return
      }
    } 
    
    if(formatedDate < today){
      alert('Não se pode marcar nesse horaio')
        return
    }
      await editOneConsulta(consulta!.id! ,{
        data:convertIso,
        pacienteNome:getValues('pacienteNome'),
        pacienteTel:getValues('pacienteTel')
      }).then(()=>{
          setTimeout(()=>navigate('/home'), 200)
      })
    
  }

  return (
    <PageDefault>
      <BackButton onClick={()=>navigate('/home')}/>
      <h1>Tela de edição</h1>
      <form onSubmit={handleSubmit(onSubmit)} className='form-edit'>
        <input {...register("pacienteTel" , {required:true})} placeholder='telefone do paciente' type="text" />
        <input {...register("pacienteNome" , {required:true})} placeholder='nome do paciente' type="text" />
        <input {...register("data", {required:true})} placeholder="telefone" type="datetime-local" />
        <button type='submit' >Editar</button>
      </form>
    </PageDefault>
  );
};