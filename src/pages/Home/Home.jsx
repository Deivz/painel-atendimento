import React, { useEffect, useMemo, useState } from 'react'
import styles from "./Home.module.css"
import Header from '../../components/Header/Header'
import Card from '../../components/Card/Card';
import atendimento from '../../utils/atendimento.json';
import som from "../../assets/sound/chamado.3gpp";


export default function Home() {

   const [atendimentos, setAtendimentos] = useState({});
   const [dadosInseridos, setDadosInseridos] = useState({});
   const [dadosRemovidos, setDadosRemovidos] = useState({});

   function tocarSom() {
      const audio = new Audio(som);
      audio.play()
   }

   function identificarAlteracoes(dadosAntigos, dadosNovos) {
      if(dadosNovos.length > dadosAntigos.length){
         const dadosInseridos = [];
   
         for (let key in dadosNovos) {
            if (!(key in dadosAntigos)) {
               dadosInseridos.push(dadosNovos[key]);
            }
         }
         setDadosInseridos({ ...dadosInseridos });
      }
      
      if(dadosAntigos.length > dadosNovos.length){
         for(let key in dadosAntigos){
            if (!(key in dadosNovos)) {
               delete atendimento[dadosAntigos[key]]
            }
         }
      }
   }

   useEffect(() => {
      const interval = setInterval(() => {
         for (let i = 0; i < dadosInseridos.length; i++) {
            delete atendimento[dadosInseridos[i]];
         }
         setAtendimentos(atendimento.reverse());
      }, 1000);

      return () => clearInterval(interval);
   }, []);

   const atendimentosMemoizado = useMemo(() => atendimentos, [atendimentos]);

   useEffect(() => {
      if (atendimento.length !== atendimentosMemoizado.length) {
         if (atendimento.length > atendimentosMemoizado.length) {
            setTimeout(() => {
               tocarSom();
            }, 1000)
         }

         identificarAlteracoes(atendimentosMemoizado, atendimento);
      }
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
                        Object.values(dadosInseridos).map((atendimento, index) => {
                           return <Card
                              key={`${atendimento.sala}index}`}
                              nomeMedico={atendimento.profissional}
                              nomePaciente={atendimento.nome}
                              numeroSala={atendimento.sala}
                              chamado={true}
                           />
                        })
                     }
                     {
                        Object.values(atendimentosMemoizado).map((atendimento, index) => {
                           return <Card
                              key={`${atendimento.sala}index}`}
                              nomeMedico={atendimento.profissional}
                              nomePaciente={atendimento.nome}
                              numeroSala={atendimento.sala}
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
