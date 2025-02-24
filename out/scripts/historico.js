export class Historico {
    static updateHistory() {
        const historyDiv = document.querySelector('.history');
        if (!historyDiv) {
            return null;
        }
        historyDiv.innerHTML = '<h3>Histórico</h3>';
        const savedHistory = JSON.parse(localStorage.getItem('history') || '[]');
        if (savedHistory.length === 0) {
            const p = document.createElement('p');
            p.innerHTML = "Sem registros no histórico.";
            historyDiv.appendChild(p);
            return;
        }
        savedHistory.forEach((entry) => {
            const entryDiv = document.createElement('div');
            entryDiv.className = 'history-entry';
            if (entry.conta) {
                const contaP = document.createElement('p');
                contaP.innerHTML = `Conta: <br>${entry.conta}`;
                entryDiv.appendChild(contaP);
            }
            const resultP = document.createElement('p');
            resultP.innerHTML = `Resultado: ${entry.result}`;
            entryDiv.appendChild(resultP);
            historyDiv.appendChild(entryDiv);
            const hr = document.createElement('hr');
            historyDiv.appendChild(hr);
            hr.style.width = '100%';
            hr.style.border = '1px solid black';
            hr.style.display = 'flex';
            hr.style.margin = '.5rem';
        });
    }
    static clearHistory() {
        localStorage.removeItem('history');
        Historico.updateHistory();
    }
}
