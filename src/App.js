import React, {useState, useEffect, useMemo, useCallback} from "react"

function App() {

  //usestate
  const [tarefas, setTarefas] = useState([
    'Pagar conta',
    'Estudar'
  ])

  const [input, setInput] = useState('')

  // function handleAdd(){
  //   setTarefas([...tarefas, input])
  //   setInput('')
  // }

  //precisa receber os hooks que vamos utilizar no segundo parametro, a funcao handleAdd agora só será chamada de fato quando for preciso
  const handleAdd = useCallback(() => {
    setTarefas([...tarefas, input])
    setInput('')
  }, [input, tarefas])

  //useeffect (1 param - funcao, 2 param - state que ele fica 'observando')
  //sempre que o state sofrer alterações ele executa a função
  //componentDidUpdate()
  useEffect(() => {
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
    console.log(localStorage.getItem('tarefas'))
  }, [tarefas])


  //para usar é só deixar o segundo parametro vazio que a função será executada quando a tela for montada
  //componentDidMount()
  useEffect(() => {
    const tarefasStorage = localStorage.getItem('tarefas')

    if(tarefasStorage){
      setTarefas(JSON.parse(tarefasStorage))
    }
  }, [])

  //usado para não precisar renderizar tudo de novo quando algo muda
  const totalTarefas = useMemo(() => tarefas.length, [tarefas])

  return (
    <div>
      {tarefas.map(tarefa => (
        <li key={tarefa}>{tarefa}</li>
      ))}

      <input type="text" value={input} onChange={(e) => {setInput(e.target.value)}}></input>
      
      <button type="button" onClick={handleAdd}>Add tarefa</button>

      <strong>Você tem {totalTarefas} tarefas</strong>
      <br/>


    </div>
  )
}

export default App
