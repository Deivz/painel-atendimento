import React from 'react';
import styles from './Header.module.css';
import DateCard from '../DateCard/DateCard';
import logo from '../../assets/img/logo_pmps.png';
import hospital from '../../assets/img/hospital.png';


export default function Header() {
   return (
      <header className={styles.header}>
         <h1><img className={styles.logo} src={logo} /></h1>
         <div className={styles.textoCentral}>
            <h2 className={styles.titulo}>PAINEL DE ATENDIMENTO</h2>
            <div className={styles.ups}>
               <img className={styles.icone} src={hospital} />
               <h3 className={styles.texto}>POLICLÍNICA MUNICIPAL DE PORTO SEGURO</h3>
            </div>
         </div>
         <DateCard />
         {/* <h2 className={styles.texto}>SISTEMA DE GESTÃO DE ATENDIMENTO/PRONTUÁRIO</h2> */}
      </header>
   )
}
