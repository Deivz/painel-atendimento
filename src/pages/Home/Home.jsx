import React, { useEffect, useMemo, useState } from 'react'
import styles from "./Home.module.css"
import Header from '../../components/Header/Header'
import Card from '../../components/Card/Card';
import som from "../../assets/sound/chamado.3gpp";

export default function Home() {

   const [atendimentos, setAtendimentos] = useState({});
   const [novosAtendimentos, setNovosAtendimentos] = useState({});

   // const atendimentosMemoizado = useMemo(() => atendimentos, [atendimentos]);

   function tocarSom() {
      const audio = new Audio(som);
      audio.play()
   }

   useEffect(() => {
      const interval = setInterval(() => {
         // fetch('http://localhost:3004/pacientes', {
         // fetch('http://186.202.139.29/homologacao/portoseguro/alianza/clinica_prontuario/lista-atendimentos/painel-atendimento', {
         fetch('http://hqsrv02:81/Carlos.Santos/alianza/clinica_prontuario/lista-atendimentos/painel-atendimento', {
            method: 'GET',
         })
            .then((res) => {
               if (res.status === 200) {
                  return res.json()
               }

               return new Promise();
            })
            .then((data) => {
               setNovosAtendimentos(data);
            })
            .catch((err) => {
               console.log(err);
            });

      }, 1000);

      return () => clearInterval(interval);
   }, []);


   useEffect(() => {
      if (atendimentos.length !== novosAtendimentos.length) {
         console.log("agui")
         if (novosAtendimentos.length > atendimentos.length) {
            setTimeout(() => {
               tocarSom();
            }, 1000)
         }
         setAtendimentos(novosAtendimentos);
      }
   }, [novosAtendimentos])

   return (
      <section className={styles.home}>
         <div className={styles.container}>
            <div className={styles.backGround}>
               <div className={styles.conteudo}>
                  <Header />
                  <div className={styles.cards}>
                     <audio muted hidden id='audio' autoPlay />
                     {
                        Object.values(atendimentos).map((atendimento, index) => {
                           return <Card
                              key={`${atendimento.NUM_SALA}${index}${Math.random()}`}
                              nomeMedico={atendimento.NOM_PROF}
                              nomePaciente={atendimento.NOM_USUA_SUS}
                              numeroSala={atendimento.NUM_SALA}
                              chamado={atendimento.PRIORIDADE}
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
