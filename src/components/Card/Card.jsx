import React from 'react';
import styles from './Card.module.css';
import icone from '../../assets/img/chamado.png';
import iconeChamado from '../../assets/img/icone_chamado.png';
import medico from '../../assets/img/esteto_icon.png';

export default function Card({ chamado, nomeMedico, nomePaciente, numeroSala }) {
   return (
      <div className={styles.container}>
         {
            chamado
               ? <img className={styles.icone} src={iconeChamado} />
               : <img className={styles.icone} src={icone} />
         }
         <div className={chamado ? `${styles.informacoes} ${styles.chamado}` : `${styles.informacoes}`}>
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
