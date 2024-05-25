import { useState } from 'react';
import styles from './App.module.css'
import { DisplayAgeComponent } from './Components/DisplayAgeComponent';
import { Input } from './Components/Input';
import arrow from '../public/images/icon-arrow.svg'
const App = () =>{
  const [day, setDay] = useState<number | null>(null);
  const [month, setMonth] = useState<number | null>(null);
  const [year, setYear] = useState<number | null>(null);
  const [birthDay, setBirthDay] = useState(0);
  const [birthMonth, setBirthMonth] = useState(0);
  const [birthYear, setBirthYear] = useState(0);
  const [error, setError] = useState<string | null>(null);
  
  const calculateAge = (birthDate: Date) => {
    const today = new Date();
    let ageYears = today.getFullYear() - birthDate.getFullYear();
    let ageMonths = today.getMonth() - birthDate.getMonth();
    let ageDays = today.getDate() - birthDate.getDate();

    if (ageDays < 0) {
      ageMonths--;
      ageDays += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    if (ageMonths < 0) {
      ageYears--;
      ageMonths += 12;
    }

    return { ageYears, ageMonths, ageDays };
  };

  const isFutureDate = (d: number, m: number, y: number): boolean => {
    const today = new Date();
    const date = new Date(y, m - 1, d);
    return date > today;
  };

  const isValidDate = (d: number, m: number, y: number): boolean => {
    const date = new Date(y, m - 1, d);
    return date.getFullYear() === y && date.getMonth() === m - 1 && date.getDate() === d;
  };

  const generateAge = () => {
    if (!birthDay || !birthMonth || !birthYear) {
      setError('All fields are required');
      return;
    }

    const birthDate = new Date(birthYear, birthMonth - 1, birthDay);
    if (isNaN(birthDate.getTime())) {
      setError('Invalid date');
      return;
    }

    if (!isValidDate(birthDay, birthMonth, birthYear)) {
      setError('Invalid date');
      return;
    }

    if (isFutureDate(birthDay, birthMonth, birthYear)) {
      setError('Date cannot be in the future');
      return;
    }

    const { ageYears, ageMonths, ageDays } = calculateAge(birthDate);
    setDay(ageDays);
    setMonth(ageMonths);
    setYear(ageYears);
    setError(null);
    console.log(ageMonths) // Clear error if date is valid
  };
  const handleDayChange = (value : string) => {
    setBirthDay(parseInt(value));
  };

  const handleMonthChange = (value : string) => {
    setBirthMonth(parseInt(value));
  };

  const handleYearChange = (value: string) => {
    setBirthYear(parseInt(value));
  };
  return(
    <section className={styles.screen}>
    <main className={styles.container}>
    <div className={styles.box}>
      <div className={styles.inputs}>
        <Input type='Day' onChange={handleDayChange} error={error != null} />
        <Input type='Month' onChange={handleMonthChange} error={error != null}/>
        <Input type='Year' onChange={handleYearChange} error={error != null}/>
      </div>
      {error && <div className={styles.error}>{error}</div>}
    </div>       
      <div className={styles.action_container}>
        <span></span>
        <a className={styles.generate} onClick={generateAge}>
          <img src={arrow} alt="arrow" />
        </a>
      </div>
      <div className={styles.results}>
        <DisplayAgeComponent type='year' data={year}/>
        <DisplayAgeComponent type='month'data={month}/>
        <DisplayAgeComponent type='day' data={day}/>
      </div>
    </main>   
    </section>
  )
}

export default App;