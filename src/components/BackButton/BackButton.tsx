import './style.css'
type Props = {
  onClick:()=>void;
};
export function BackButton({onClick}: Props) {
  return (
    <button className='back-button' onClick={onClick}>
      Voltar
    </button>
  );
};