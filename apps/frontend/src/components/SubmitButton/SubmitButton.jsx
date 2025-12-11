import styles from './submitButton.module.css';

function Button({ children, type = 'button', onClick, variant = 'primary', className, ...props }) {
  const buttonClass = `${variant === 'primary' ? styles.primary : styles.secondary} ${className || ''}`;

  return (
    <button type={type} className={buttonClass} onClick={onClick} {...props}>
      {children}
    </button>
  );
}

export default Button;
