import Button from "../Button";
import Relogio from "./Relogio";
import style from './Cronometro.module.scss'
import { ITarefa } from "../../types/tarefa";
import { tempoParaSegundos } from "../../common/utils/time";
import { useEffect, useState } from "react";

interface Props {
  selecionado: ITarefa | undefined,
  finalizarTarefa: () => void
}

export function Cronometro({ selecionado, finalizarTarefa }: Props) {
  const [tempo, setTempo] = useState<number>();

  useEffect(() => {
    if(selecionado?.tempo){
      setTempo(tempoParaSegundos(selecionado.tempo));
    }
  },[selecionado]);

  function regressiva(contador: number = 0) {
    setTimeout(() => {
      if (contador > 0){
        setTempo(contador--);
        return regressiva(contador--);
      }
      finalizarTarefa();
    }, 1000)
  }

  return (
    <div className={style.cronometro}>
      <p className={style.titulo}>Escolha um card e inicie o cronômetro</p>
      <div className={style.relogioWrapper}>
        <Relogio tempo={tempo}/>
      </div>
      <Button texto="Começar!" onClick={() => regressiva(tempo)}/>
    </div>
  )
}