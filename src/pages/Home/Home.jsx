import React, { useEffect, useMemo, useState } from 'react'
import styles from "./Home.module.css"
import Header from '../../components/Header/Header'
import Card from '../../components/Card/Card';
import atendimento from '../../utils/atendimento.json';

export default function Home() {

   const [atendimentos, setAtendimentos] = useState({});

   useEffect(() => {
      const interval = setInterval(() => {
         setAtendimentos(atendimento);
      }, 5000);
      return () => clearInterval(interval);

   }, []);

   const atendimentosMemoizado = useMemo(() => atendimentos, [atendimentos]);

   return (
      <section className={styles.home}>
         <div className={styles.container}>
            <div className={styles.backGround}>
               <div className={styles.conteudo}>
                  <Header />
                  <div className={styles.cards}>
                     {
                        Object.values(atendimentosMemoizado).map(atendimento => {
                           console.log(atendimento)
                           return <Card nomeMedico={atendimento.profissional} nomePaciente={atendimento.nome} numeroSala={atendimento.sala} />
                        })
                     }
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}
