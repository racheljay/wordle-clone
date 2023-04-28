import { styled } from '@stitches/react';

export const Container = styled('div', {
    backgroundColor: "#313833",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100vh",
    margin: "0 auto",
    padding: "0rem 10rem"
})

export const Form = styled('form', {
    display: "flex",
    flexDirection: "column"
})

export const Guesses = styled('div', {
    color: "orange",
    fontFamily: "Yeseva One",
    fontSize: "1.2rem"
})

export const GuessedWord = styled('p', {
    display: "flex",
    justifyContent: "space-around",
    margin: "0"
})

export const Instructions = styled('p', {
    background: "AntiqueWhite",
    borderRadius: "1rem",
    color: "black",
    fontSize: "1.2rem",
    lineHeight: "1.7rem",
    padding: "1rem",
    position: "relative"
})

// https://css-tricks.com/how-to-stack-elements-in-css/
export const InstructionDismissButton = styled('button', {
    backgroundColor: "transparent",
    border: "none",
    borderRadius: "0.8rem",
    fontSize: "1.3rem",
    height: "2rem",
    minWidth: "2rem",
    right: "0",
    top: "0",
    position: "absolute",
    "&:hover": {
        background: "orange",
        color: "AntiqueWhite"
    }
})

export const Letter = styled('span', {
    alignItems: "center",
    background: "white",
    borderRadius: "20%",
    display: "flex",
    width: "100%",
    justifyContent: "center",
})

export const ResetButton = styled('button', {})

export const SubmitButton = styled('button', {
    fontSize: "1.5rem",
    height: "2rem"
})

export const Title = styled('h1', {
    color: "orange",
    fontFamily: "Yeseva One",
    fontSize: "2.7rem",
    margin: "0 auto",
    marginTop: "2rem"
})

export const WordInput = styled('input', {
    fontSize: "2rem",
    letterSpacing: "0.4rem",
    padding: "0.5rem",
    width: "10rem"

})

export const WordList = styled('div', {
    display: 'flex',
    flexDirection: "column-reverse",
    fontSize: "2.5rem",
    width: "12rem"
})