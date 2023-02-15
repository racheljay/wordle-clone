import './App.css';
import { styled } from '@stitches/react';
import { fourLetterWords } from './data/four-letter-words'
import { useState } from 'react';

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


// TODO: save chosen word in storage?
// make input for guess word
// limit to four chars
// write logic to compare guess word and secret word

function App() {
  const randomIndex = Math.floor(Math.random() * fourLetterWords.length)
  const word = fourLetterWords[randomIndex]
  const [guess, setGuess] = useState('')

  const handleClick = () => {
    if (guess.length === 4) {
      console.log(guess)
    } else if (guess.length < 4) {
      console.log('guess is too short')
    }
  }

  const validGuess = () => {
    return guess.length === 4 ? true : false
  }
  return (
    <Container>
      <Title>Wordle clone</Title>
      <Word>{word}</Word>
      <WordInput
        maxLength={4}
        minLength={4}
        onChange={e => {
          setGuess(e.target.value)
          console.log(guess)
        }}
        type="text"
      ></WordInput>
      <SubmitButton
        type="submit"
        onClick={() => handleClick()}
        disabled={!validGuess()}
      >Check Word</SubmitButton>
    </Container>
  );
}

export default App;
