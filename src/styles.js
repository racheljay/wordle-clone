import { styled } from '@stitches/react';

export const Container = styled('div', {
    backgroundColor: "#313833",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100vh",
    margin: "0 auto",
    padding: "0rem 10rem",
    // had to add relative positioning here to make
    // the z index on the button ::after not go behind everything
    position: 'relative',
    zIndex: "0"
})

export const Form = styled('form', {
    alignItems: "center",
    display: "flex",
    margin: "1rem",
})

export const Guesses = styled('div', {
    color: "orange",
    fontFamily: "Yeseva One",
    fontSize: "1.2rem",
    margin: "1rem"
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

export const ResetButton = styled('button', {
    background: "AntiqueWhite",
    border: "none",
    borderRadius: "0.4rem",
    boxShadow: "0px 3px 15px rgba(0,0,0,0.2)",
    fontSize: "1.2rem",
    padding: "0.5rem",
    position: "relative",
    "&:hover": {
        background: "rgb(230 215 190)"
    },
    "&::after": {
        content: `''`,
        display: 'block',
        background: "orange",
        position: 'absolute',
        top: '0.5rem',
        left: '0.5rem',
        width: "100%",
        height: "100%",
        borderRadius: 'inherit',
        zIndex: "-1",
        "&:active": {
            background: "yellow",
        },     
    },
    "&:active": {
        top: '0.5rem',
        left: "0.5rem",
        "&::after": {
            top: '0rem',
            left: "0rem"
        }
    },
})

export const SubmitButton = styled('button', {
    display: "none"
})

export const Title = styled('h1', {
    color: "orange",
    fontFamily: "Yeseva One",
    fontSize: "2.7rem",
    margin: "0 auto",
    marginTop: "2rem",
    textAlign: "center"
})

export const WordInput = styled('input', {
    backgroundColor: "transparent",
    border: "2px solid green",
    borderRadius: "0.7rem",
    color: "orange",
    fontSize: "2rem",
    letterSpacing: "0.4rem",
    outline: "none",
    padding: "0.5rem",
    placeHolder: "XXXX",
    width: "10rem"

})

export const WordList = styled('div', {
    display: 'flex',
    flexDirection: "column-reverse",
    fontSize: "2.5rem",
    width: "12rem"
})