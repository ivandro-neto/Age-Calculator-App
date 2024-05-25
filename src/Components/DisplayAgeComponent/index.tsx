import styles from "./style.module.css";

interface IDisplayProps{
  data: number | null;
  type: string;
}

export const DisplayAgeComponent = ({data, type} : IDisplayProps) =>{

  const handleType = (type: string): string =>{
    switch(type.toLowerCase()){
        case 'day':
          return 'days'
          break;
  
        case 'month':
          return 'months'
          break;
  
        case 'year':
          return 'years'
          break;
        default:
          return "define a type"
      } 
  }
  return (
    <div className={styles.container}>
      <span className={styles.value}>{data == null ? '__' : data }</span>
      <h1 className={styles.block}>{handleType(type)}</h1>
    </div>
  )
}