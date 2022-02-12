const axios = require('axios').default;

const apiURL = 'http://localhost:5000'

export const submitGuess = async (guesses) => {
    const url = `${apiURL}/guess`
    return await axios.post(url, guesses)
} 
