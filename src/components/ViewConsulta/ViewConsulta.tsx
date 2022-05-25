import { useContext } from 'react';
import { ConsultaContext } from '../../context/Consulta/ConsultaContext';
import { Overlay } from '../Overlay/Overlay';
import './style.css'
type Props = {
  toggle:boolean;
  onClick:()=>void;
}

export function ViewConsulta({toggle, onClick}:Props) {

  const { consulta, formatDate } = useContext(ConsultaContext)

  return (
    <>
    <div style={{
      zIndex:toggle ? '999' : '-80',
      opacity:toggle ? '1' : '0'
      }} className="modal-consulta">
        <div className="content">
            <p className="paciente-name"><strong>Nome:</strong> {consulta?.paciente?.nome}</p>
            <p className="data"><strong>Data:</strong> {formatDate(consulta?.data!)}</p>
            <p className="paciente-telefone"><strong>Telefone:</strong> {consulta?.paciente?.telefone}</p>
          </div>
          <button onClick={onClick}>ok</button>
    </div>
    
    </>
  );
};