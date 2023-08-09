from flask import Flask, render_template
from dokusan import generators
import numpy as np
app = Flask(__name__)


def generate_puzzle():
    puzzle_flat = np.array(list(str(generators.random_sudoku(avg_rank=150))))
    puzzle = puzzle_flat.reshape(9,9)
    return puzzle


@app.route('/')
def index():
    puzzle = generate_puzzle()
    return render_template('index.html', puzzle = puzzle)

if __name__ == '__main__':
    app.run()

    