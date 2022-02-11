from flask import Flask, request, jsonify, Response, send_from_directory
from flask_cors import CORS, cross_origin
import re
import json

from wordle import is_wordle_word, process_guesses

app = Flask(__name__, static_folder='../client/build/static', template_folder="../client/build")
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route("/")
@cross_origin()
def hello_world():
    return send_from_directory(app.template_folder, 'index.html')

@app.route("/guess", methods = ['POST'])
@cross_origin()
def get_guesses():
    
    guesses = request.json

    if not isinstance(guesses, list):
        return Response(json.dumps({'error' : 'Request body not of type list'}), status=400, mimetype='application/json')
    
    for index, guess in enumerate(guesses):
        if 'word' not in guess or 'state' not in guess:
            return Response(json.dumps({'error' : f"Item at index {index} does not have 'word' or 'state' in the object."}), status=400, mimetype='application/json')
        
        if len(guess['word']) != 5 or len(guess['state']) != 5:
            return Response(json.dumps({'error' : f"Word {guess['word']} or State {guess['state']} is not 5 characters long."}), status=400, mimetype='application/json')
        
        if not guess['state'].isdigit() or not re.match('^[135]+$', guess['state']):
            return Response(json.dumps({'error' : f"State {guess['state']} (index {index}) should only contain 1, 3 or 5s."}), status=400, mimetype='application/json')

        if not is_wordle_word(guess['word']):
            return Response(json.dumps({'error' : f"{guess['word']} is not a Wordle word."}), status=400, mimetype='application/json')

    answers = process_guesses(guesses)

    return jsonify({
        'guesses' : guesses,
        'answers' : answers
    })

if __name__ == "__main__":
    app.run(debug=True)
