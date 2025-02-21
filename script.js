document.addEventListener('DOMContentLoaded', () => {
    const subjectContainer = document.getElementById('subject-container');
    const addSubjectButton = document.getElementById('add-subject');
    const calculateButton = document.getElementById('calculate');
    const resultBox = document.getElementById('result');
    const printButton = document.getElementById('print'); 

    function calculateSGPA() {
        let totalPoints = 0;
        let totalCredits = 0;

        subjectContainer.querySelectorAll('.subject').forEach(subject => {
            const markInput = subject.querySelector('.mark-input');
            const creditInput = subject.querySelector('.credit-input');
            const mark = parseFloat(markInput.value);
            const credit = parseFloat(creditInput.value);

            if (isNaN(mark) || isNaN(credit) || mark < 0 || credit <= 0) {
                alert("Please enter valid numbers");
                return;
            }

            let gradePoint = 0;
            if (mark >= 90) gradePoint = 10;
            else if (mark >= 80) gradePoint = 9;
            else if (mark >= 70) gradePoint = 8;
            else if (mark >= 60) gradePoint = 7;
            else if (mark >= 50) gradePoint = 6;
            else if (mark >= 45) gradePoint = 5;
            else if (mark >= 40) gradePoint = 4;

            totalPoints += gradePoint * credit;
            totalCredits += credit;
        });

        if (totalCredits === 0) {
            alert("Please enter valid credits");
            return;
        }

        const sgpa = totalPoints / totalCredits;
        resultBox.innerHTML = `Your SGPA is: <strong>${sgpa.toFixed(3)}</strong>`;
    }

    function printResults() {
        const printContent = document.createElement('div');
        printContent.innerHTML = `
            <h2>SGPA Calculator Results</h2>
            <p>SGPA: ${resultBox.innerHTML}</p>
            <h3>Subjects:</h3>
            <ul>
                ${Array.from(subjectContainer.querySelectorAll('.subject')).map(subject => {
                    const mark = subject.querySelector('.mark-input').value;
                    const credit = subject.querySelector('.credit-input').value;
                    return `<li>Marks: ${mark}, Credits: ${credit}</li>`;
                }).join('')}
            </ul>
        `;
        printContent.style.cssText = 'font-family: Arial, sans-serif; padding: 20px; margin: 0;';

        window.print({
            printBackground: true,
            prompt: false,
            node: printContent
        });
    }

    addSubjectButton.addEventListener('click', () => {
        const newSubject = document.createElement('div');
        newSubject.className = 'subject';
        newSubject.innerHTML = `
            <input type="number" class="mark-input" placeholder="Enter Marks">
            <select class="credit-input">
                <option value="0">Credits</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
            <button class="delete-subject">X</button>
        `;
        newSubject.querySelector('.delete-subject').addEventListener('click', () => {
            subjectContainer.removeChild(newSubject);
        });
        subjectContainer.appendChild(newSubject);
    });

    calculateButton.addEventListener('click', calculateSGPA);
    printButton.addEventListener('click', printResults); 
});