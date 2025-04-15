import React from "react";
//Styles
import styles from "./Input.module.scss";

interface InputProps {
  label: string;
  labelHidden?: boolean;
  placeholder?: string;
  type: string;
  id: string;
  icon?: React.ReactNode;
  showPasswordIcon?: React.ReactNode;
  clearButton?: React.ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  ref?: React.Ref<HTMLInputElement>;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  label,
  labelHidden,
  placeholder,
  type,
  id,
  icon,
  showPasswordIcon,
  clearButton,
  onChange,
  className,
  ref,
  onFocus,
}) => {
  return (
    <div className={styles.inputContainer}>
      <label className={styles.label} htmlFor={label}>
        {!labelHidden && label}
      </label>
      <div className={styles.inputWrapper}>
        <input
          ref={ref}
          id={id}
          name={id}
          placeholder={placeholder}
          type={type}
          onChange={onChange}
          className={`${styles.input} ${className}`}
          onFocus={onFocus}
        />
        <span className={styles.icon}>{icon}</span>
        <span className={styles.showPasswordIcon}>{showPasswordIcon}</span>
        <div className={styles.clearButton}>{clearButton}</div>
      </div>
    </div>
  );
};

export default Input;
