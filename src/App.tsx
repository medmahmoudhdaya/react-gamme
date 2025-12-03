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
          <p className="text-xl text-blue-500 text-center py-2 font-bold">
            {words.filter(e=>e=='').length === 0 ? words[5] === solution ? "You are great !" : "The correct word was : "+solution
            : ("you have " + words.filter(e=>e=='').length + " tries left.")}
          </p>
        </div>
        <div className="mx-auto flex flex-col gap-1">
        {
          words.map((word, i) => (
            <Line key={i} word={word} solution={solution}/>
          ))
        }
        </div>

        <Input words={words} setWords={setWords}/>
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

export function Input({ words, setWords} : 
  {
  words : Array<string> ; 
  setWords : Dispatch<SetStateAction<Array<string>>>;
}){

  const [userWord , setUserWord] = useState('')

  return (
    <div className="w-full mt-4 p-2 flex justify-start gap-1">
      <form 
      className="w-full flex gap-1"
       onSubmit={(e) => {
        e.preventDefault();
            if (userWord.length != 5){
              return
            }

            const index = words.findIndex((e) => e === '')
            const newWords = [...words]
            newWords[index] = userWord
            setWords(newWords)
            setUserWord('')
      }}>
        <input 
        value={userWord}
        onChange={(e)=>{
          if(e.target.value.length <=5 ){
            setUserWord(e.target.value)
          }
        }}
        type="text"
         className="border border-blue-500 font-bold text-lg outline-none rounded p-2" />
        <button
        type="submit" 
        className="outline-none py-2 px-4 bg-blue-500 rounded">Try</button>
       </form>
    </div>
  )
}