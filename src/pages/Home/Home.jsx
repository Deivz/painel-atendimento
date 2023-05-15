import React, { useEffect, useMemo, useState } from 'react'
import styles from "./Home.module.css"
import Header from '../../components/Header/Header'
import Card from '../../components/Card/Card';
import atendimento from '../../utils/atendimento.json';
import som from "../../assets/sound/chamado.3gpp";


export default function Home() {

   const [atendimentos, setAtendimentos] = useState({});

   function tocarSom() {
      const audio = new Audio(som);
      audio.play()
   }

   useEffect(() => {
      const interval = setInterval(() => {
         setAtendimentos(atendimento.reverse());
      }, 1000);

      return () => clearInterval(interval);

   }, []);

   const atendimentosMemoizado = useMemo(() => atendimentos, [atendimentos]);


   useEffect(() => {
      if (atendimento.length > atendimentosMemoizado.length) {
         document.getElementById('audio').click();
      }

   }, [atendimentosMemoizado]);

   return (
      <section className={styles.home}>
         <div className={styles.container}>
            <div className={styles.backGround}>
               <div className={styles.conteudo}>
                  <Header />
                  <div className={styles.cards}>
                     <audio muted hidden id='audio' onClick={tocarSom} autoPlay />
                     {
                        Object.values(atendimentosMemoizado).map((atendimento, index) => {
                           return <Card
                              key={`${atendimento.sala}index}`}
                              nomeMedico={atendimento.profissional}
                              nomePaciente={atendimento.nome}
                              numeroSala={atendimento.sala}
                              isFirstChild={index === 0 ? true : false}
                           />
                        })
                     }
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}
