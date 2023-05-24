import React, { useEffect, useMemo, useState } from 'react'
import styles from "./Home.module.css"
import Header from '../../components/Header/Header'
import Card from '../../components/Card/Card';
import som from "../../assets/sound/chamado.3gpp";

export default function Home() {

   const [atendimentos, setAtendimentos] = useState([]);

   const atendimentosMemoizado = useMemo(() => atendimentos, [atendimentos]);

   function tocarSom() {
      const audio = new Audio(som);
      audio.play()
   }

   useEffect(() => {
      const interval = setInterval(function(atendimentos) {
         
         fetch('http://186.202.139.29/homologacao/portoseguro/alianza/clinica_prontuario/lista-atendimentos/painel-atendimento', {
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
               let tamanhoAntigo = atendimentos.length;
               
               if(tamanhoAtual !== tamanhoAntigo){

                  if(tamanhoAtual > tamanhoAntigo){
                     tocarSom();
                  }

                  setAtendimentos(data);
               }

            })
            .catch((err) => {
               console.log(err);
            });

      }, 5000, atendimentosMemoizado);

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
