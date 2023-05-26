import React from 'react';
import styles from './Card.module.css';
import icone from '../../assets/img/chamado.png';
import iconeChamado from '../../assets/img/icone_chamado.png';
import medico from '../../assets/img/esteto_icon.png';

export default function Card({ chamado, nomeMedico, nomePaciente, numeroSala, tipo }) {

   let estilo = '';
   let salaEstilo = '';
   let atendimentoEstilo = '';

   if (chamado) {

      estilo = `${styles.informacoes} ${styles.chamado}`;

      if (tipo === 'numero') {
         estilo += ` ${styles.tipoNumero}`;
      }

   } else {

      estilo = `${styles.informacoes}`;

      if (tipo === 'numero') {
         estilo += ` ${styles.tipoNumero}`;
      }

   }

   if (tipo === 'texto') {
      salaEstilo = `${styles.sala} ${styles.salaTexto}`;
   } else {
      salaEstilo = `${styles.sala} ${styles.salaNumero}`;
   }

   return (
      <div className={styles.container}>
         {
            chamado
               ? <img className={styles.icone} src={iconeChamado} />
               : <img className={styles.icone} src={icone} />
         }
         <div className={estilo}>
            <div className={salaEstilo}>
               <p>Sala:</p>
               <h3>{numeroSala}</h3>
            </div>
            <div className={tipo === 'texto' ? styles.atendimentoTexto : styles.atendimentoNumero}>
               <h4>{nomePaciente}</h4>
               <div className={styles.medico}>
                  <img className={styles.iconeMedico} src={medico} />
                  <h5>{nomeMedico}</h5>
               </div>
            </div>
         </div>
      </div>
   )
}
