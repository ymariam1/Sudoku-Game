from flask import Flask, render_template, request, jsonify
from dokusan import generators
import numpy as np
app = Flask(__name__)


def generate_puzzle():
    puzzle_flat = np.array(list(str(generators.random_sudoku(avg_rank=150))))
    puzzle = puzzle_flat.reshape(9,9)
    return puzzle.tolist()

puzzle_data = generate_puzzle()

@app.route('/reset', methods=['POST'])
def reset():
    global puzzle_data
    puzzle_data = generate_puzzle()
    return jsonify(puzzle_data)

@app.route('/check', methods=['POST'])
def Check_puzzle():
    try:
        puzzle_data = np.array(request.get_json())
        return jsonify(puzzle_data.tolist())
    except Exception as e:
        return jsonify(error=str(e)), 500



@app.route('/')
def index():
    puzzle = generate_puzzle()
    return render_template('index.html', puzzle = puzzle)

if __name__ == '__main__':
    app.run(debug=True)

    