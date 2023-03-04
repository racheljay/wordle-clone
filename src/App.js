import './App.css';
import { styled } from '@stitches/react';
import { fourLetterWords } from './data/four-letter-words'
import { useState, useEffect, useRef } from 'react';

/* Styled Components */

const Container = styled('div', {
  backgroundColor: "pink",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: "100vh",
  margin: "0 auto"
})

const Title = styled('h1', {
  color: "orange",
  margin: "0 auto"
})

const WordInput = styled('input', {})

const SubmitButton = styled('button', {})

const ResetButton = styled('button', {})

const WordList = styled('div', {
  background: 'SkyBlue',
  display: 'flex',
  flexDirection: "column-reverse"
})

const Letter = styled('span', {
  background: "white"
})
const GuessedWord = styled('p', {
  color: "Navy"
})

function App() {

  const [secret, setSecret] = useState('')
  const [guess, setGuess] = useState('')
  const [message, setMessage] = useState('')
  const [guessList, setGuessList] = useState([])
  const [gameState, setGameState] = useState(true)

  const pickWord = () => {
    const randomIndex = Math.floor(Math.random() * fourLetterWords.length)
    return fourLetterWords[randomIndex]

  }

  const inputRef = useRef(null)
  useEffect(() => {
    setSecret(pickWord())
    inputRef.current.focus()
  }, [])

  // TODO: adjust game logic for index information
  const compareWords = (s1, s2) => {
    const s1Letters = {}
    let exactMatch = 0
    let closeMatch = 0
    let scores = new Array(s1.length).fill("")

    if (s1 === s2) {
      setMessage(`Correct! Secret word is ${s1}`)
      scores.fill("correct")
      setGameState(false)
    } else {
      for (let i = 0; i < s1.length; i++) {
        let letter = s1[i]

        if (!(letter in s1Letters)) {
          s1Letters[letter] = 0
        }
        s1Letters[letter]++

        if (letter === s2[i]) {
          scores[i] = "correct"
          exactMatch++
        }
      }

      for (let i = 0; i < s2.length; i++) {
        if (s1[i] !== s2[i] && s1Letters[s2[i]] > 0) {
          closeMatch++
          scores[i] = "close"
          s1Letters[s2[i]]--
        }
      }
      setMessage(`Right letter, right place: ${exactMatch}\nRight letter, wrong place: ${closeMatch}`)
    }
    console.log(scores)
    return scores
  }


  const handleChange = (event) => {

    const onlyLetters = str => {
      const letters = /^[A-Za-z]+$/
      return str.match(letters)
    }

    // input value is only updated with valid chars or empty string
    if (onlyLetters(event.target.value) || event.target.value === "") {
      setGuess(event.target.value.toUpperCase())
    }
  }

  const letterColorMatch = str => {
    if(str === "correct") {
      return "green"
    } else if (str === "close") {
      return "yellow"
    } else return ""
  }

  const resetRef = useRef(null)

  const updateList = () => {
    let gameScore = compareWords(secret, guess)
    if (gameState && guessList.length < 5) {
      setGuessList(guessList.concat({word: guess, score: gameScore}))
    } else if (guessList.length === 5) {
      setMessage("Game over. Too many guesses")
      resetRef.current.focus()
    }
  }

  const handleSumbit = () => {
    if (guess.length === 4) {
      guess.toUpperCase()
      
      updateList()
      setGuess("")
    } else if (guess.length < secret.length) {
      console.log('guess is too short')
    }
  }


  const handleReset = () => {
    setGuess("")
    setMessage("")
    setGuessList([])
    setGameState(true)
    setSecret(pickWord())

    inputRef.current.focus()
  }

  const validGuess = () => {
    return guess.length === secret.length ? true : false
  }
  return (
    <Container>
      <Title>Wordle Clone</Title>
      <h2>{secret}</h2>
      <ResetButton
        autoFocus={!gameState}
        onClick={handleReset}
        ref={resetRef}
      >
        New Game</ResetButton>
      <form
        onSubmit={(e) => e.preventDefault()}
      >
        <WordInput
          maxLength={secret.length}
          minLength={secret.length}
          onChange={handleChange}
          ref={inputRef}
          type="text"
          value={guess.toUpperCase()}
        ></WordInput>
        <SubmitButton
          type="submit"
          onClick={() => handleSumbit()}
          disabled={!validGuess()}
        >Check Word</SubmitButton>
      </form>
      <div>{message}</div>
      <WordList>
        {guessList.map((item, i) => {
          return (<GuessedWord key={i}>
            {item.word.split("").map((letter, j) => {
              return (<Letter key={j} css={{backgroundColor: letterColorMatch(item.score[j])}}>{letter}</Letter>)
            })}
          </GuessedWord>)
        })}
      </WordList>

    </Container>
  );
}

export default App;

/* Documentation on controlled components:
https://reactjs.org/docs/forms.html#controlled-components
*/