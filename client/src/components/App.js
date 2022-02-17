import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Avatar,
  Button,
  Fab,
  Grid,
  Snackbar,
  Typography
} from '@mui/material'
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';

import HowTo from './HowTo';
import Footer from './Footer'



import { submitGuess } from '../resources/api';

const App = () => {

    const BLANK = '#606685';
    const CONTAINS = '#EAB309';
    const EXACT = '#62A854';

    const NEW_STATE = { 'state' : '11111' }

    const [guesses, setGuesses] = useState([NEW_STATE])
    const [answers, setAnswers] = useState([])
    const [snackbarSettings, setSnackbarSettings] = useState({
        severity : 'success',
        open : false,
        message : 'DEFAULT MESSAGE'
    })
    const [openHowToDialog, setOpenHowToDialog] = useState(false);
    const keyboard = useRef();

    const handleKeyPress = (e) => {
        const currentState = JSON.parse(JSON.stringify(guesses))
        let lastGuess = currentState.at(-1);

        // check if allowed key, then continue
        if(e.key === 'Backspace'){
            if(!lastGuess.word){
                return ''
            } else {
                const lastWordLen = lastGuess['word'].length - 1
                lastGuess.word = lastGuess.word.slice(0, lastGuess.word.length - 1);
                const currentGuessState = lastGuess['state'].split("")
                currentGuessState[lastWordLen] = '1'
                lastGuess.state = currentGuessState.join("")

                currentState[currentState.length-1] = lastGuess
                setGuesses(currentState)
            }
        } else if(e.key === 'Enter'){
            handleSubmit()
        } else if(e.key === 'Escape'){
            handleClearGuesses()
        } else if(e.key === 'ArrowDown'){
            handleAddRow()
        } else if(e.key === 'ArrowUp'){
            handleRemoveRow()
        } else if(e.key.length !== 1 || !isNaN(e.key)){
            return ''
        } else {
            if(!lastGuess.word){
                lastGuess.word = e.key.toUpperCase()
            } else {
                if(lastGuess.word.length === 5){
                    return ''
                }
                lastGuess.word += e.key.toUpperCase()
            }
            currentState[currentState.length-1] = lastGuess
            setGuesses(currentState)
        }   
    }
    
    const handleMobileKeyboard = (e, f) => {
        const key = {
            key : e
        }
        return handleKeyPress(key)
    }

    const handleClearGuesses = () => {
        setGuesses([{
            'state' : '11111'
        }])
        setAnswers([])
    }

    const handleAddRow = () => {
        const currentState = JSON.parse(JSON.stringify(guesses))
        
        const lastWord = currentState.at(-1)

        if(lastWord === undefined || lastWord.word === undefined || lastWord.word.length !== 5){
            return setSnackbarSettings({
                ...snackbarSettings,
                open : true,
                severity : 'error',
                message : `Can't add new row until current complete`
            })
        }

        currentState.push(NEW_STATE)
        setGuesses(currentState)
    }

    const handleRemoveRow = () => {
        const currentState = JSON.parse(JSON.stringify(guesses))

        if(currentState.length === 1){
            return setSnackbarSettings({
                ...snackbarSettings,
                open : true,
                severity : 'error',
                message : 'Cannot Remove First Row'
            })
        }

        currentState.pop()
        setGuesses(currentState)
    }

    const handleSubmit = async () => {
        try{    
            const test = await submitGuess(guesses)
            setAnswers(test.data.answers)
        } catch (e){
            return setSnackbarSettings({
                ...snackbarSettings,
                open : true,
                severity : 'error',
                message : e.response.data.error
            })
        }
    }

    const handleBackgroundColour = (guessIndex, charIndex) => {
        const index = guesses[guessIndex]['state'][charIndex]

        return index === '5' ? EXACT : index === '3' ? CONTAINS : BLANK
    }

    const handleRotateTile = (guessIndex, charIndex, char) => {
        let state = guesses[guessIndex]['state'][charIndex]
        if(!char || char === '_'){
            return setSnackbarSettings({
                ...snackbarSettings,
                open : true,
                severity : 'error',
                message : 'Cannot rotate blank tile'
            })
        }
        
        state = state === '5' ? '3' : state === '3' ? '1' : '5'

        const currentState = JSON.parse(JSON.stringify(guesses))

        const currentGuessState = currentState[guessIndex]['state'].split("")
        currentGuessState[charIndex] = state
        currentState[guessIndex]['state'] = currentGuessState.join("")

        setGuesses(currentState)
    }

    useEffect(() => {
        document.addEventListener("keydown", handleKeyPress);

        return function cleanup() {
            document.removeEventListener("keydown", handleKeyPress);
        };

    }, [handleKeyPress]);

    return (
        <Grid container direction='column' justify='center' sx={{ backgroundColor : '#300A24', height : '100%' }}>
            <Grid item container justifyContent='center' alignItems='center' justify='center' style={{ top: 0, position : 'sticky', backgroundColor : '#131313' }}>
                { /* Title */ }
                <Grid item style={{ align : 'center', color : '#FFFFFF', margin: '0.5em' }}> { /* Header */ }
                    <Typography variant='h4' align='center'>Wordle Solver</Typography>
                </Grid>
                { /* Guesses */ }
                <Grid item container align='center' sx={{ backgroundColor : '#131313' }}>
                    {guesses.map((guess, guessIndex) => {
                        return (
                            <Grid key={`guess_${guessIndex}`} item container justifyContent='center' direction='row'>
                                {guess['word'] !== undefined ?

                                    [0,1,2,3,4].map(index => {
                                        const test = typeof guess[index] === 'undefined';
                                        return (
                                            <Grid key={`${guess.word}_${index}`} item style={{ paddingTop : '1em', paddingBottom : '1em', paddingLeft : '0.5em' }}>
                                                <Avatar sx={{ bgcolor: handleBackgroundColour(guessIndex, index), width : '50px', height : '50px' }} variant="square" alt='___' src="/broken-image.jpg" onClick={() => handleRotateTile(guessIndex, index, guess['word'][index])}>
                                                    {test ? guess['word'][index] : '_'}
                                                </Avatar>
                                            </Grid>
                                        )
                                    })
                                
                                :

                                [0,1,2,3,4].map(index => {
                                    return (
                                        <Grid key={`blank_${index}`}  item style={{ paddingTop : '1em', paddingBottom : '1em', paddingLeft : '0.5em' }}>
                                            <Avatar sx={{ bgcolor: BLANK, width : '50px', height : '50px' }} variant="square" alt='___' src="/broken-image.jpg">
                                                _
                                            </Avatar>
                                        </Grid>
                                    )
                                })

                                }
                            </Grid>
                        )
                    })}
                    
                    <Grid item container direction='row' justifyContent='center' alignItems='center' sx={{ padding : '1em' }}>
                    <Grid item sx={{ padding : '0.5em' }}>
                        <Button variant='contained' onClick={handleClearGuesses}>Clear</Button>
                    </Grid>
                    <Grid item sx={{ padding : '0.5em' }}>
                        <Button variant='contained' onClick={handleAddRow}>+</Button>
                    </Grid>
                    <Grid item sx={{ padding : '0.5em' }}>
                        <Button variant='contained' onClick={handleSubmit}>Submit</Button>
                    </Grid>
                    </Grid>
                </Grid>
            </Grid>
            { /* Valid Words */ }
            <Grid item container align='center' justifyContent='space-around' direction='column' sx={{ backgroundColor : '#300A24', padding: '1em', overflow : 'hidden', width : '100%'}}> { /* Valid Words */ }
                <Grid item>
                    <Typography variant='h5' sx={{ color : '#FFFFFF'}}>Valid Words</Typography>
                </Grid>
                <Grid item container align='center' justifyContent='space-between' style={{ padding : '1em', paddingBottom : '1em', width : '100%'}} md={4}>
                {answers.map( ans => {
                    return (
                        <Grid key={ans} item container align='center' justifyContent='center' sx={{ border : 'solid 1px #ffffff', width : '100px', borderRadius: '25px', padding : '0.5em', margin : '0.5em'}}>
                            <Grid item sx={{ padding : '0.5em' }}>
                                <Typography variant='body' color='white'>{ans}</Typography>
                            </Grid>
                        </Grid>
                    )
                })}            
                </Grid>
            </Grid>
            { /* <Grid item sx={{ bottom : 0, width : '100%', position : 'fixed', display: { sm: 'none', xs: 'block' } }}>
                <Keyboard
                    keyboardRef={r => (keyboard.current = r)}
                    layoutName={'default'}
                    layout={{
                        default: [
                          "Q W E R T Y U I O P",
                          "A S D F G H J K L",
                          "{backspace} Z X C V B N M Enter",
                        ]
                    }}
                    onKeyPress={handleMobileKeyboard}
                />
            </Grid> */}
            { /* Footer */ }
            <Grid item  sx={{ display: { sm: 'block', xs: 'none' } }}>
                <Footer />
            </Grid>
            { /* Snackbar */ }
            <Grid item>
                <Snackbar open={snackbarSettings.open} autoHideDuration={6000} onClose={() => setSnackbarSettings({ ...snackbarSettings, open : false})} anchorOrigin={{ vertical: 'bottom', horizontal: 'center', }}>
                    <Alert onClose={() => setSnackbarSettings({ ...snackbarSettings, open : false})} severity={snackbarSettings.severity} sx={{ width: '100%' }}>
                        {snackbarSettings.message}
                    </Alert>
                </Snackbar>
            </Grid>
            <Grid item>
                <Fab color="primary" aria-label="help" size="small" style={{ position: 'absolute', bottom: 16, right: 16 }} onClick={() => setOpenHowToDialog(true)}>
                    <HelpOutlineOutlinedIcon />
                </Fab>
            </Grid>
            <HowTo open={openHowToDialog} setOpen={setOpenHowToDialog}/>
        </Grid>
    );
}

export default App;
