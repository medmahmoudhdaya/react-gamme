import { useEffect, useState, type Dispatch, type JSX, type ReactNode, type SetStateAction } from "react"

export default function App() {
  const [words, setWords] = useState(Array(6).fill(''))
  const [solution, setSolution] = useState('')

  useEffect(() => {
    
    const getWord = async () => {
        const response = await fetch(
          "https://random-word-api.herokuapp.com/word?length=5"
        );
        const data = await response.json(); 
        setSolution(data[0]);
      };

      getWord()
    
  },[])

  return (
      <Container>
        <div className="w-full mb-2 shadow mx-auto">
          <p className="text-xl text-blue-500 text-center py-2 font-bold">you have {words.filter(e=>e=='').length} tries left.</p>
        </div>
        <div className="mx-auto flex flex-col gap-1">
        {
          words.map((word, i) => (
            <Line key={i} word={word} solution={solution}/>
          ))
        }
        </div>

      </Container>
  )
}

export function Container({ children } : { children : ReactNode}){
  return (
      <div className="mt-10 flex flex-col gap-1 w-1/3 mx-auto">
          {children}
      </div>
  )
}

export function Line({ word , solution }: { word: string;solution : string;}) {

  if (!word){
    return (
        <div className="w-full flex gap-1">
          <div className="w-10 h-10 border text-center text-lg font-black uppercase" ></div>
          <div className="w-10 h-10 border text-center text-lg font-black uppercase" ></div>
          <div className="w-10 h-10 border text-center text-lg font-black uppercase" ></div>
          <div className="w-10 h-10 border text-center text-lg font-black uppercase" ></div>
          <div className="w-10 h-10 border text-center text-lg font-black uppercase" ></div>
        </div>
    )
  }

  const lines : JSX.Element[]  = []
     Array.from(word.toLocaleLowerCase()).map((char,index) => {
              if(solution[index] === char){
                lines.push(<div key={index} className="w-10 h-10 border text-center text-lg font-black uppercase bg-green-500 text-white" >{char}</div>)
              }else if(solution.includes(char)){
                lines.push(<div key={index} className="w-10 h-10 border text-center text-lg font-black uppercase bg-yellow-500 text-white" >{char}</div>)

              }else{
                lines.push(<div key={index} className="w-10 h-10 border text-center text-lg font-black uppercase bg-gray-500 text-white" >{char}</div>)
              }
            })

            return (
              <div className="w-full flex gap-1">
                {
                  lines.map((e) => e)
                }
              </div>
            )

}

