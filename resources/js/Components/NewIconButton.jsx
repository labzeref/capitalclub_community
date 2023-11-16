import React from 'react';

const NewIconButton = ({ onClick, disabled, children, className, primary, secondary, icon: Icon }) => {
  const buttonClassName = `button ${className} ${primary ? 'primary' : ''} ${secondary ? 'secondary' : ''}`;

  return (
    <button className={buttonClassName} onClick={onClick} disabled={disabled}>
      {Icon && <Icon className="button-icon" />}
      {children}
    </button>
  );
};

export default NewIconButton;
 
