import json

# 5 = green
# 3 = yellow
# 1 = blank

with open('data/freqs.json', 'r') as json_file:
    freqs = json.loads(json_file.read())

with open('data/possible_wordle_words.txt', 'r') as words:
    all_words = words.read().splitlines()

def is_wordle_word(word):
    return word.lower() in all_words

# TODO what happens if word is rebut and guessed word is rebel?
def process_guesses(guesses):
    exact = []
    contains = []
    exclude = []

    for guess in guesses:
        for index, char in enumerate(guess['word']):
            char = char.lower()
            if guess['state'][index] == '5': #exact
                exact.append({
                    'letter' : char,
                    'index' : index
                })
            elif guess['state'][index] == '3': #contains
                contains.append({
                    'letter' : char,
                    'not_index' : index
                })
            else : # 1 exact
                if char not in exclude:
                    exclude.append(char)

    # check excludes
    existing_letters = [c['letter'] for c in exact] + [c['letter'] for c in contains]

    for index, char in enumerate(exclude):
        if char in existing_letters:
            exclude.pop(index)

    possible_words = []

    for word in all_words:
        # check exact letters first
        valid = True
        for char in exact:
            if word[char['index']] != char['letter']:
                valid = False
                break

        if not valid:
            continue

        # check excluded letters
        for char in exclude:
            if char in word:
                valid = False
                break
        
        if not valid:
            continue

        # check possible letters
        for char in contains:
            if char['letter'] not in word:
                valid = False
                break
            
            if word[char['not_index']] == char['letter']:
                valid = False
                break

        if valid:
            possible_words.append(word)

    # TODO order by probability

    return possible_words
