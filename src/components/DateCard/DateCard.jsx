import React, { useEffect, useMemo, useState } from 'react';
import styles from './DateCard.module.css';
import calendar from '../../assets/img/calendar.png';

export default function DateCard() {

   const [hora, setHora] = useState("");
   const [dataHoje, setDataHoje] = useState("");

   useEffect(() => {
      const interval = setInterval(() => {
         let dataHoje = new Date();
         let data = dataHoje.getDate();
         let mes = dataHoje.getMonth() + 1;
         let ano = dataHoje.getFullYear();
         let dataCompleta = `${data}/${mes < 10 ? `0${mes}` : `${mes}`}/${ano}`

         let hora = dataHoje.getHours();
         let minutos = dataHoje.getMinutes() < 10 ? `0${dataHoje.getMinutes()}` : `${dataHoje.getMinutes()}`;
         let horaCompleta = `${hora}:${minutos}`;

         setHora(horaCompleta);
         setDataHoje(dataCompleta);

      }, 1000);
      return () => clearInterval(interval);
   }, []);

   const horaMemoizada = useMemo(() => hora, [hora]);
   const dataMemoizada = useMemo(() => dataHoje, [dataHoje]);

   return (
      <div className={styles.container}>
         <div className={styles.dateCard}>
            <img className={styles.calendario} src={calendar} alt='Ícone do calendário' />
            <div>
               <p>{dataMemoizada}</p>
               <p>{horaMemoizada}</p>
            </div>
         </div>
      </div>
   )
}
