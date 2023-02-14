import './App.css';
import { styled } from '@stitches/react';
import {fourLetterWords} from './data/four-letter-words'

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

// TODO: save chosen word in storage?
// make input for guess word
  // limit to four chars
// write logic to compare guess word and secret word


const randomIndex = Math.floor(Math.random() * fourLetterWords.length)
const word = fourLetterWords[randomIndex]


function App() {
  return (
    <Container>
      <Title>Wordle clone</Title>
      <Word>{word}</Word>
    </Container>
  );
}

export default App;
