import React from 'react';
import styles from './Card.module.css';
import icone from '../../assets/img/chamado.png';
import medico from '../../assets/img/doc.png';

export default function Card({ isLastChild, nomeMedico, nomePaciente, numeroSala }) {
   return (
      <div className={styles.container}>
         <img className={styles.icone} src={icone} />
         <div className={isLastChild ? `${styles.informacoes} ${styles.chamado}` : `${styles.informacoes}`}>
            <div className={styles.sala}>
               <p>Sala:</p>
               <h3>{numeroSala}</h3>
            </div>
            <div className={styles.atendimento}>
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
