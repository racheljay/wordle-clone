import './App.css';
import { styled } from '@stitches/react';
import { fourLetterWords } from './data/four-letter-words'
import { useState, useEffect, useRef } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro'
// TODO: icon not working because of babel plugin https://github.com/kentcdodds/babel-plugin-macros/blob/main/other/docs/user.md
/*
  Also tried using bootstrap icons. Those aren't working either
  need to try a new approach
*/
const Container = styled('div', {
  backgroundColor: "#313833",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: "100vh",
  margin: "0 auto",
})

const Title = styled('h1', {
  color: "orange",
  fontFamily: "Yeseva One",
  fontSize: "2.7rem",
  margin: "0 auto",
  marginTop: "2rem"
})

const WordInput = styled('input', {})

const SubmitButton = styled('button', {})

const ResetButton = styled('button', {})

const WordList = styled('div', {
  display: 'flex',
  flexDirection: "column-reverse",
  fontSize: "2.5rem",
  width: "12rem"
})

const Letter = styled('span', {
  alignItems: "center",
  background: "white",
  borderRadius: "20%",
  display: "flex",
  width: "100%",
  justifyContent: "center",
})
const GuessedWord = styled('p', {
  display: "flex",
  justifyContent: "space-around",
  margin: "0"
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

  // on page mount
  const inputRef = useRef(null)
  useEffect(() => {
    setSecret(pickWord())
    inputRef.current.focus()
  }, [])

  const resetRef = useRef(null)
  useEffect(() => {
    if (gameState === false) {
      resetRef.current.focus()
    } else {
      inputRef.current.focus()
    }
  }, [gameState])

  // TODO: adjust game logic for index information
  const compareWords = (s1, s2) => {
    const s1Letters = {}
    let exactMatch = 0
    let closeMatch = 0
    let scores = new Array(s1.length).fill("")

    if (s1 === s2) {
      setMessage(`Correct! Secret word is ${s1}`)
      setGameState(false)
      scores.fill("correct")
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
    if (str === "correct") {
      return "#47a603"
    } else if (str === "close") {
      return "#f2ac07"
    } else return ""
  }


  const updateList = () => {
    let gameScore = compareWords(secret, guess)
    if (gameState && guessList.length < 5) {
      setGuessList(guessList.concat({ word: guess, score: gameScore }))
    } else if (guessList.length === 5) {
      setMessage("Game over. Too many guesses")
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
  }

  const validGuess = () => {
    return guess.length === secret.length ? true : false
  }
  return (
    <Container>
      <Title>Generic Word Guessing Game</Title>
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
          disabled={!gameState}
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
        >Enter
          {/* <FontAwesomeIcon icon="fa-solid fa-turn-down-left" /> */}
          <i class="bi bi-arrow-right-circle-fill"></i>
          </SubmitButton>
      </form>
      <div>{message}</div>
      <WordList>
        {guessList.map((item, i) => {
          return (<GuessedWord key={i}>
            {item.word.split("").map((letter, j) => {
              return (<Letter key={j} css={{ backgroundColor: letterColorMatch(item.score[j]) }}>{letter}</Letter>)
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