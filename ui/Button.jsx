// export function Button({onClick,className,type,icon,children,disabled}){
//     return<button className={className} onClick={onClick} type={type} disabled={disabled}>{icon} {children}</button>
// }

import React from 'react';

export function Button({  onClick, style, fullWidth,className,type,children,disabled }) {
  const buttonStyle = {
    padding: '10px 20px',
    fontSize: '16px',
    fontWeight: 'bold',
    backgroundColor: '#007bff',
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    width: fullWidth ? '100%' : 'auto',
    ...style,
  };

  return (
    <button style={buttonStyle} className={className} onClick={onClick} type={type} disabled={disabled} >
      {children}
    </button>
  );
};

