import React from 'react';

export function Modal ({ isOpen,style, onClose, children,maxWidth }) {
  if (!isOpen) return null;

  const modalStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const contentStyle = {
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: maxWidth? maxWidth:'500px',
    width: '90%',
    ...style
  };

  return (
    <div style={modalStyle} onClick={onClose}>
      <div style={contentStyle} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

