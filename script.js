document.addEventListener('DOMContentLoaded', () => {
    const subjectContainer = document.getElementById('subject-container');
    const addSubjectButton = document.getElementById('add-subject');
    const calculateButton = document.getElementById('calculate');
    const resultBox = document.getElementById('result');

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

    addSubjectButton.addEventListener('click', () => {
        const newSubject = document.createElement('div');
        newSubject.className = 'subject';
        newSubject.innerHTML = `
            <input type="number" class="mark-input" placeholder="Enter Marks">
            <input type="number" class="credit-input" placeholder="Enter Credits">
        `;
        subjectContainer.appendChild(newSubject);
    });

    calculateButton.addEventListener('click', calculateSGPA);
});