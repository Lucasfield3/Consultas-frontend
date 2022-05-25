// @flow
import * as React from 'react';
type Props = {
  isShown:boolean;
  onClick:()=>void;
};

import './style.css'
export function Overlay({isShown, onClick}: Props) {
  return (
    <div onClick={onClick} style={{
        opacity:isShown ? '0.4' : '0',
        display: isShown ? 'block': 'none'
    }} className='overlay'>
      
    </div>
  );
};