document.addEventListener('DOMContentLoaded', function() {
    const resetForm = document.querySelector('form[name="reset-form"]');
    const checkForm = document.querySelector('form[name="check-form"]');
    const puzzleTable = document.querySelector('table');

    resetForm.addEventListener('submit', async function(Event) {
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
                        const inputElement = document.createElement('input');
                        inputElement.type = 'number';
                        inputElement.value = '';
                        inputElement.maxLength= '1'
                        inputElement.min = 1;
                        inputElement.max = 9;
                        inputElement.addEventListener('input', function() {
                            if (!/^[1-9]?$/.test(this.value)) {
                                this.value = '';
                            }
                        });
                    cellElement.appendChild(inputElement);
                    }
                    else {
                        cellElement.textContent = cell;
                    }
                    rowElement.appendChild(cellElement);
                }
                puzzleTable.appendChild(rowElement);
                }

            }
            catch (error) {
                console.error('error resetting puzzle', error)
            }
    });
    checkForm.addEventListener('submit', async function(Event) {
        Event.preventDefault();

        const puzzleData = [];
        const rows = document.querySelectorAll('tr');
        for (const rowElement of rows){
            const cells = rowElement.querySelectorAll('td')
            const rowData = [];
            for (const cellElement of cells) {
                if (cellElement.children.length < 1){
                    rowData.push(cellElement.textContent);
                }
                else {
                    const inputElement = cellElement.querySelector('input');
                    if (inputElement.textContent === '') {
                        rowData.push('0')
                    }
                    else {
                        rowData.push(inputElement.value);
                    }
                }
            }
            puzzleData.push(rowData);
        }
        console.log(puzzleData)
        
        try {
            const response = await fetch('/check', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(puzzleData)
            });

            const numpyarrayData = await response.json();
            console.log(numpyarrayData);
        }
        catch (error) {
            console.error('error collecting data');
        }

    });
});
