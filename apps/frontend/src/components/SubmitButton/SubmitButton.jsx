import styles from './submitButton.module.css';

function Button({ children, type = 'button', onClick, variant = 'primary', className, ...props }) {
  let buttonClass = '';

  switch (variant) {
    case 'primary':
      buttonClass = styles.primary;
      break;
    case 'secondary':
      buttonClass = styles.secondary;
      break;
    case 'cancel-event':
      buttonClass = styles['cancel-event'];
      break;
    default:
      buttonClass = styles.primary;
  }

  return (
    <button type={type} className={buttonClass} onClick={onClick} {...props}>
      {children}
    </button>
  );
}

export default Button;
