import React, { useEffect, useMemo, useState } from 'react'
import styles from "./Home.module.css"
import Header from '../../components/Header/Header'
import Card from '../../components/Card/Card';
import som from "../../assets/sound/chamado.3gpp";

export default function Home() {

   const [atendimentos, setAtendimentos] = useState({});
   const [haDadosRemovidos, setHaDadosRemovidos] = useState(false);

   const [dadosInseridos, setDadosInseridos] = useState({});
   const [dadosRemovidos, setDadosRemovidos] = useState({});

   const [novosAtendimentos, setNovosAtendimentos] = useState({});

   function tocarSom() {
      const audio = new Audio(som);
      audio.play()
   }

   function identificarAlteracoes(dadosAntigos, dadosNovos) {

      // adicionar paciente a fila
      if (dadosNovos.length > dadosAntigos.length) {
         const dadosInseridos = [];

         for (let key in dadosNovos) {
            if (!(key in dadosAntigos)) {
               dadosInseridos.push(dadosNovos[key]);
               delete atendimentosMemoizado[dadosNovos[key]]
               setHaDadosRemovidos(true);
               setDadosRemovidos(atendimentosMemoizado);
            }
         }
         setDadosInseridos({ ...dadosInseridos });
      }

      // remover paciente da fila
      if (dadosAntigos.length > dadosNovos.length) {
         for (let key in dadosAntigos) {
            if (!(key in dadosNovos)) {
               delete novosAtendimentos[dadosAntigos[key]];
            }

            if (key in dadosInseridos) {
               console.log(dadosInseridos[key]);
               delete dadosInseridos[key];
               setDadosInseridos({ ...dadosInseridos });
            }
         }
      }
   }

   useEffect(() => {
      fetch('http://hqsrv02:81/Carlos.Santos/alianza/clinica_prontuario/lista-atendimentos/painel-atendimento', {
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
         // fetch('http://localhost:3004/pacientes', {
         // fetch('http://186.202.139.29/homologacao/portoseguro/alianza/clinica_prontuario/lista-atendimentos/painel-atendimento', {
         fetch('http://hqsrv02:81/Carlos.Santos/alianza/clinica_prontuario/lista-atendimentos/painel-atendimento', {
            method: 'GET',
         })
            .then((res) => {
               return res.json()
            })
            .then((data) => {
               setNovosAtendimentos(data);
            })
            .catch((err) => {
               alert(err);
            });

      }, 1000);

      return () => clearInterval(interval);
   }, []);

   useEffect(() => {
      if (atendimentosMemoizado.length !== novosAtendimentos.length) {
         if (novosAtendimentos.length > atendimentosMemoizado.length) {
            setTimeout(() => {
               tocarSom();
            }, 1000)
         }
         setAtendimentos(novosAtendimentos);
         identificarAlteracoes(atendimentosMemoizado, novosAtendimentos);
      }
   }, [novosAtendimentos])

   const atendimentosMemoizado = useMemo(() => atendimentos, [atendimentos]);

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
                              {console.log(atendimento.PRIORIDADE)}
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
