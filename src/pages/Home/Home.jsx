import React, { useEffect, useMemo, useState } from 'react'
import styles from "./Home.module.css"
import Header from '../../components/Header/Header'
import Card from '../../components/Card/Card';
import som from "../../assets/sound/chamado.3gpp";

export default function Home() {

   const [atendimentos, setAtendimentos] = useState({});
   const [novosAtendimentos, setNovosAtendimentos] = useState({});

   function tocarSom() {
      const audio = new Audio(som);
      audio.play()
   }

   useEffect(() => {
      fetch('http://186.202.139.29/homologacao/portoseguro/alianza/clinica_prontuario/lista-atendimentos/painel-atendimento', {
      // fetch('http://hqsrv02:81/Carlos.Santos/alianza/clinica_prontuario/lista-atendimentos/painel-atendimento', {
         method: 'GET',
      })
         .then((res) => res.json())
         .then((data) => {
            setAtendimentos(data);
         })
         .catch((err) => {
            alert(err);
         });
   }, []);

   useEffect(() => {
      const interval = setInterval(() => {
         fetch('http://186.202.139.29/homologacao/portoseguro/alianza/clinica_prontuario/lista-atendimentos/painel-atendimento', {
         // fetch('http://hqsrv02:81/Carlos.Santos/alianza/clinica_prontuario/lista-atendimentos/painel-atendimento', {
            method: 'GET',
         })
            .then((res) => {
               return res.json()
            })
            .then((data) => {
               let objetoAtendimentos = JSON.stringify(atendimentos);
               let objetoData = JSON.stringify(data);
               if (objetoAtendimentos !== objetoData) {
                  setNovosAtendimentos(data);
               }
            })
            .catch((err) => {
               alert(err);
            });

      }, 1000);

      return () => clearInterval(interval);
   }, [atendimentos]);

   const atendimentosMemoizado = useMemo(() => novosAtendimentos, [novosAtendimentos]);

   return (
      <section className={styles.home}>
         <div className={styles.container}>
            <div className={styles.backGround}>
               <div className={styles.conteudo}>
                  <Header />
                  <div className={styles.cards}>
                     <audio muted hidden id='audio' autoPlay />
                     {/* {
                        Object.values(dadosInseridos).map((atendimento, index) => {
                           return <Card
                              key={`${atendimento.sala}index}`}
                              nomeMedico={atendimento.profissional}
                              nomePaciente={atendimento.nome}
                              numeroSala={atendimento.sala}
                              chamado={true}
                           />
                        })
                     } */}
                     {
                        Object.values(atendimentosMemoizado).map((atendimento, index) => {
                           return <Card
                              key={`${atendimento.NUM_SALA} ${index}`}
                              nomeMedico={atendimento.NOM_PROF}
                              nomePaciente={atendimento.NOM_USUA_SUS}
                              numeroSala={atendimento.NUM_SALA}
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
