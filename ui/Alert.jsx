import React from 'react';

const Alert = ({ children, type = 'info', style }) => {
  const colors = {
    info: '#cce5ff',
    success: '#d4edda',
    warning: '#fff3cd',
    error: '#f8d7da',
  };

  const alertStyle = {
    padding: '12px 20px',
    borderRadius: '4px',
    backgroundColor: colors[type],
    color: '#333',
    marginBottom: '15px',
    ...style,
  };

  return <div style={alertStyle}>{children}</div>;
};

export default Alert;

