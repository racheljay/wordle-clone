import './App.css';
import { styled } from '@stitches/react';
import { fourLetterWords } from './data/four-letter-words'
import { useState, useEffect } from 'react';

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
const Word = styled('div', {
  fontSize: "30px"
})

const WordInput = styled('input', {

})

const SubmitButton = styled('button', {

})

function App() {

  const [secret, setSecret] = useState('')
  const [guess, setGuess] = useState('')
  const [message, setMessage] = useState('')

  const compareWords = (s1, s2) => {
    const s1Letters = {}
    let exactMatch = 0
    let closeMatch = 0

    if (s1 === s2) {
      setMessage(`Correct! Secret word is ${s1}`)
    } else {


      for (let i = 0; i < s1.length; i++) {
        let letter = s1[i]

        if (!(letter in s1Letters)) {
          s1Letters[letter] = 0
        }
        s1Letters[letter]++

        if (letter === s2[i]) {
          exactMatch++
        }
      }

      for (let i = 0; i < s2.length; i++) {
        if (s1[i] !== s2[i] && s1Letters[s2[i]] > 0) {
          closeMatch++
          s1Letters[s2[i]]--
        }
      }

      setMessage(`Right letter, right place: ${exactMatch}\nRight letter, wrong place: ${closeMatch}`)
    }
  }

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * fourLetterWords.length)
    const word = fourLetterWords[randomIndex]
    setSecret(word)
  }, [])

  const handleChange = (event) => {

    const onlyLetters = str => {
      const letters = /^[A-Za-z]+$/
      return str.match(letters)
    }

    // make input value is only updated with valid chars or empty string
    if (onlyLetters(event.target.value) || event.target.value === "") {
      setGuess(event.target.value.toUpperCase())
      console.log(guess)
    }
  }


  const handleClick = () => {
    if (guess.length === 4) {
      guess.toUpperCase()
      console.log(guess)
      compareWords(secret, guess)
    } else if (guess.length < secret.length) {
      console.log('guess is too short')
    }
  }

  const validGuess = () => {
    return guess.length === secret.length ? true : false
  }
  return (
    <Container>
      <Title>Wordle Clone</Title>
      <Word>{secret}</Word>

      <form
        onSubmit={(e) => e.preventDefault()}
      >
        <WordInput
          maxLength={secret.length}
          minLength={secret.length}
          onChange={handleChange}
          type="text"
          value={guess.toUpperCase()}
        ></WordInput>
        <SubmitButton
          type="submit"
          onClick={() => handleClick()}
          disabled={!validGuess()}
        >Check Word</SubmitButton>
      </form>

      <div>{message}</div>
    </Container>
  );
}

export default App;

/* Documentation on controlled components:
https://reactjs.org/docs/forms.html#controlled-components
*/