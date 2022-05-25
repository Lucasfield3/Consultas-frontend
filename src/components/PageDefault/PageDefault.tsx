
import { ReactNode } from 'react';
type Props = {
  children:ReactNode
};

import './style.css'
export function PageDefault(props: Props) {
  return (
    <div className='container-page'>
        {props.children}
    </div>
  );
};