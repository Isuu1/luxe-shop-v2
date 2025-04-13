import React from "react";
//Styles
import styles from "./Input.module.scss";

interface InputProps {
  label: string;
  labelHidden: boolean;
  placeholder?: string;
  type: string;
  id: string;
  icon?: React.ReactNode;
  clearButton?: React.ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  ref?: React.Ref<HTMLInputElement>;
}

const Input: React.FC<InputProps> = ({
  label,
  labelHidden,
  placeholder,
  type,
  id,
  icon,
  clearButton,
  onChange,
  className,
  ref,
}) => {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={label}>{!labelHidden && label}</label>
      <input
        ref={ref}
        id={id}
        name={id}
        placeholder={placeholder}
        type={type}
        onChange={onChange}
        className={`${styles.input} ${className}`}
      />
      <span className={styles.icon}>{icon}</span>
      <div className={styles.clearButton}>{clearButton}</div>
    </div>
  );
};

export default Input;
