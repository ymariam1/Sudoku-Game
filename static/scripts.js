document.addEventListener('DOMContentLoaded', function() {
    const resetForm = document.querySelector('form[name="reset-form"]');
    const puzzleTable = document.querySelector('table');

    resetForm.addEventListener('click', async function() {
        Event.preventDefault();
        try {
            const response = await fetch('/reset', { method: 'POST' });
            const puzzleData = await response.json();

            puzzleTable.innerHTML = '';
            for (const row of puzzleData) {
                const rowElement = document.createElement('tr');
                
                for (const cell of row) {
                    const cellElement = document.createElement('td');
                    if (cell === '0') {
                        inputElement.type = 'number';
                        inputElement.value = '';
                        inputElement.maxLength= '1'
                        inputElement.addEventListener('input', function() {
                            if (!/^[1-9]?@/.test(this.value)) {
                                this.value = '';
                            }
                        });
                    
                    cellElement.appendChild(inputElement);
                    }
                    else {
                        cellElement.textContent = cell;
                    }
                }
                puzzleTable.appendChild(rowElement);
                }

            }
            catch (error) {
                console.error('error resetting puzzle', error)
            }
    });
});
