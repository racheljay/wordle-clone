import './App.css';
import {
  Container, Title, WordInput, SubmitButton,
  ResetButton, WordList, Letter, GuessedWord,
  Instructions, Guesses, Form,
  InstructionDismissButton
} from "./styles"
import { fourLetterWords } from './data/four-letter-words'
import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'

function App() {
  const maxChances = 5
  
  const getGuessesLeft = () => {
    let sessionGuessesLeft = JSON.parse(sessionStorage.getItem("guessesLeft"))
    if(sessionGuessesLeft) {
      return sessionGuessesLeft
    } else {
      return maxChances
    }
  }

  const [showInstructions, setShowInstructions] = useState(true)
  const [secret, setSecret] = useState('') // TODO save to session storage
  const [guess, setGuess] = useState('')
  const [message, setMessage] = useState('')
  const [guessList, setGuessList] = useState([]) // TODO save to session storage
  const [gameState, setGameState] = useState(true) // TODO save to session storage
  const [guessesLeft, setGuessesLeft] = useState(getGuessesLeft)

  const pickWord = () => {
    const randomIndex = Math.floor(Math.random() * fourLetterWords.length)
    return fourLetterWords[randomIndex]

  }

  const inputRef = useRef(null)
  // on page mount
  useEffect(() => {
    // check session storage
    let sessionSecret = sessionStorage.getItem("secret")
    let sessionGuessesLeft = JSON.parse(sessionStorage.getItem("guessesLeft"))
    // console.log({sessionSecret})
    if (!sessionSecret || sessionSecret === "") {
      setSecret(pickWord())
    }
    if (sessionGuessesLeft) {
      setGuessesLeft(JSON.parse(sessionGuessesLeft))
    }

    inputRef.current.focus()
  }, [])

  // handle session storage
  useEffect(() => {
    let sessionSecret = sessionStorage.getItem("secret")
    let sessionGuessList = sessionStorage.getItem("guessList")
    let sessionGuessesLeft = sessionStorage.getItem("guessesLeft")

    console.log(sessionSecret, sessionGuessList, sessionGuessesLeft)

    if (!sessionSecret) {
      sessionStorage.setItem("secret", `${secret}`);
    } else {
      setSecret(sessionSecret)
    }

    console.log(guessesLeft)

    sessionStorage.setItem("guessesLeft", `${guessesLeft}`)

    // if(sessionGuessList === null) {
    //   sessionStorage.setItem("guessList", JSON.stringify(guessList))
    // } else {
    //   setGuessList(JSON.parse(sessionGuessList))
    // }

    // if(!sessionGuessesLeft) {
    //   sessionStorage.setItem("guessesLeft", JSON.stringify(guessesLeft))
    // } else {
    //   setGuessList(JSON.parse(sessionGuessesLeft))
    // }
  }, [secret, guessesLeft, guessList])

  const resetRef = useRef(null)
  // handle focus shift based on game state
  useEffect(() => {
    if (gameState === false) {
      resetRef.current.focus()
    } else {
      inputRef.current.focus()
    }
  }, [gameState])

  const compareWords = (secret, guess) => {
    const secretLetters = {}
    let exactMatch = 0
    let closeMatch = 0
    // Init scores array with blank string for each letter
    let scores = new Array(secret.length).fill("")

    // Early exit logic for perfect match
    if (secret === guess) {
      setMessage(`Correct! Secret word is ${secret}`)
      setGameState(false)
      scores.fill("correct")
    } else {
      for (let i = 0; i < secret.length; i++) {
        let letter = secret[i]

        // Turn secret letter string into object for comparison
        if (!(letter in secretLetters)) {
          secretLetters[letter] = 0
        }
        secretLetters[letter]++

        // If there is a perfect match:
        if (letter === guess[i]) {
          scores[i] = "correct"
          // take one from secretLetter obj so that
          // perfect matches don't go towards close guesses.
          secretLetters[letter]--
          exactMatch++
        }
      }

      // handle right letter wrong spot matches
      for (let i = 0; i < guess.length; i++) {
        // letters don't match, but guess letter is in secret word
        // and not accounted for yet
        if (secret[i] !== guess[i] && secretLetters[guess[i]] > 0) {
          closeMatch++
          scores[i] = "close"
          // remove guess from secret letters so we don't count it again
          secretLetters[guess[i]]--
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
    let sessionGuessList = sessionStorage.getItem("guessList")
    let sessionGuessesLeft = sessionStorage.getItem("guessesLeft")

    let gameScore = compareWords(secret, guess)
    // adding a guess to the list
    if (gameState && guessList.length < maxChances) {
      // if(!sessionGuessList) {
      setGuessList(guessList.concat({ word: guess, score: gameScore }))
      // sessionStorage.setItem("guessList", guessList)
      // }
      // if (!sessionGuessesLeft) {
      setGuessesLeft(guessesLeft - 1)
      // }
    }
    // end game if max guesses are guessed
    // add one to length to get ahead of state synch
    if (guessList.length + 1 === maxChances) {
      setGameState(false)
      setMessage(`Game Over! Secret word was ${secret}!`)
    }
  }

  const handleSubmit = () => {
    if (guess.length === secret.length) {
      guess.toUpperCase()
      updateList()
      setGuess("")
    } else if (guess.length < secret.length) {
      console.log('guess is too short')
    }
  }

  const handleReset = () => {
    sessionStorage.clear()
    setGuess("")
    setMessage("")
    setGuessList([])
    setGameState(true)
    setSecret(pickWord())
    setGuessesLeft(maxChances)
  }

  const validGuess = () => {
    return guess.length === secret.length ? true : false
  }
  return (
    <Container>
      <Title>Generic Word Guessing Game</Title>
      {showInstructions && <Instructions>
        Welcome to a generic word guessing game! Guess the <i>secret</i> word by typing your answer into the box below. Hit enter when you are ready to submit your guess.
        A list of your previous guesses will appear below. If a letter is green: Congrats! That letter is in the correct spot in the <i>mystery word</i>. If the letter is orange
        do not despair! You are close! Your letter is in the word, but it's in the wrong spot! Try again! So close! But be careful, you only get {guessesLeft} guesses so you must pay attention
        to the letters that are not in the <i>mystery word</i>.
        <InstructionDismissButton
          onClick={() => setShowInstructions(false)
          }><FontAwesomeIcon icon={faX} /></InstructionDismissButton>
      </Instructions>}
      <Guesses>Guesses Left: {guessesLeft}</Guesses>
      <h2>{secret}</h2>
      <ResetButton
        autoFocus={!gameState}
        onClick={handleReset}
        ref={resetRef}
      >
        New Game</ResetButton>
      <Form
        onSubmit={e => e.preventDefault()}
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
          onClick={() => handleSubmit()}
          disabled={!validGuess()}
        >
        </SubmitButton>
      </Form>
      {message && <Instructions>{message}</Instructions>}
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