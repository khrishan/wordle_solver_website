const axios = require('axios').default;

export const submitGuess = async (guesses) => {
    const url = `/guess`
    return await axios.post(url, guesses)
} 
