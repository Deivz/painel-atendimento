import React, { useEffect, useMemo, useState } from 'react'
import styles from "./Home.module.css"
import Header from '../../components/Header/Header'
import Card from '../../components/Card/Card';
import som from "../../assets/sound/Alert.mp3";

export default function Home() {

   const [atendimentos, setAtendimentos] = useState([]);

   const atendimentosMemoizado = useMemo(() => atendimentos, [atendimentos]);

   function tocarSom() {
      const audio = new Audio(som);
      audio.play()
   }

   function chamarPaciente(data) {
      tocarSom();
      setTimeout(() => {
         if ('speechSynthesis' in window) {
            data.forEach(paciente => {
               if (paciente.PRIORIDADE) {
                  const speech = new SpeechSynthesisUtterance([paciente.NOM_USUA_SUS.toLowerCase(), `sala ${paciente.NUM_SALA}`]);
                  speech.lang = 'pt-BR';
                  window.speechSynthesis.speak(speech);
               }
            });
         };

      }, 1500);
   }

   useEffect(() => {
      const interval = setInterval(function (atendimentos) {

         fetch('https://portoseguro.alztecnologia.com.br/clinica_prontuario/lista-atendimentos/painel-atendimento', {
            // fetch('http://186.202.139.29/homologacao/portoseguro/alianza/clinica_prontuario/lista-atendimentos/painel-atendimento', {
            // fetch('http://hqsrv02:81/Carlos.Santos/alianza/clinica_prontuario/lista-atendimentos/painel-atendimento', {
            method: 'GET',
         })
            .then((res) => {
               if (res.status === 200) {
                  return res.json()
               }

               return new Promise();
            })
            .then((data) => {
               let tamanhoAtual = data.length;
               let novosAtendimentos = JSON.stringify(data);
               let tamanhoAntigo = atendimentos.length;
               let atendimentosAntigos = JSON.stringify(atendimentos);

               if (novosAtendimentos !== atendimentosAntigos) {

                  if (tamanhoAtual >= tamanhoAntigo) {
                     chamarPaciente(data);
                  }

                  setAtendimentos(data);
               }

            })
            .catch((err) => {
               console.log(err);
            });

      }, 10000, atendimentosMemoizado);

      return () => clearInterval(interval);
   }, [atendimentosMemoizado]);

   return (
      <section className={styles.home}>
         <div className={styles.container}>
            <div className={styles.backGround}>
               <div className={styles.conteudo}>
                  <Header />
                  <div className={styles.cards}>
                     <audio muted hidden id='audio' autoPlay />
                     {
                        Object.values(atendimentosMemoizado).map((atendimento, index) => {
                           return <Card
                              key={atendimento.COD_ATENDIMENTO}
                              nomeMedico={atendimento.NOM_PROF}
                              nomePaciente={atendimento.NOM_USUA_SUS}
                              numeroSala={atendimento.NUM_SALA}
                              chamado={atendimento.PRIORIDADE}
                              tipo={
                                 !isNaN(parseFloat(atendimento.NUM_SALA)) && isFinite(atendimento.NUM_SALA)? 'numero' : 'texto'
                              }
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