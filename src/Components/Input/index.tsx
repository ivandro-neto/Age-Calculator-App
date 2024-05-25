import { ChangeEvent } from "react";
import styles from "./style.module.css"

interface InputProps{
  type : string;
  onChange : (value : string) => void;
  error: boolean;
}

export const Input = ({type, onChange, error} : InputProps)=> {

  const handleType = (type : string) : string => {
    switch(type.toLowerCase()){
      case 'day':
        return 'dd'
        break;

      case 'month':
        return 'mm'
        break;

      case 'year':
        return 'YYYY'
        break;
      default:
        return "define a type"
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    onChange(value); // Notificando o componente pai sobre a mudança de valor
  };

  
  return (
    <div className={styles.container}>
      <label className = {error ? `${styles.label} ${styles.error}` : `${styles.label}`}htmlFor={type}>{type}</label>
      <input className = {error ? `${styles.input} ${styles.error}` : `${styles.input}`} type="text" id={type} placeholder={handleType(type)} onChange={handleChange} required/>
    </div>
  )
}

