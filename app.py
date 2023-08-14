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
    puzzle_data = request.get_json()
    print(puzzle_data)
    for row in puzzle_data:
        for i in range(len(row)):
            if row[i] == '0':
                row[i]= 0
            else:
                row[i] = int(row[i])
    if checkp(puzzle_data) == True:
        return jsonify(message='puzzle has beeen solved')
    else:
        return jsonify(message='mistake made')

def checkPos(puzzle, row, col, num):
    for i in range(9):
        if puzzle[row][i] == num or puzzle[i][row] == num:
            return False
        if puzzle[3 * (row // 3) + i // 3][3 * (col // 3) + i % 3] == num:
            return False
    return True

def checkp(puzzle):
    for row in range(9):
        for col in range(9):
            if not checkPos(puzzle, row, col, puzzle[row][col]):
                return False
    return True
    
def solver(puzzle):
        for row in range(9):
            for col in range(9):
                if puzzle[row][col] == 0:
                    for num in range(1, 10):
                        if checkPos(puzzle, row, col, num):
                            puzzle[row][col] = num
                            if solver(puzzle):
                                return True
                            puzzle[row][col] = 0
                    return False
        return True

@app.route('/')
def index():
    puzzle = generate_puzzle()
    return render_template('index.html', puzzle = puzzle)

if __name__ == '__main__':
    app.run(debug=True)

    