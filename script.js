let subjects = [];

function calculateSGPA() {
    const marks = [];
    const credits = [];
    let totalPoints = 0;
    let totalCredits = 0;

    subjects.forEach(subject => {
        const mark = parseFloat(subject.mark.value);
        const credit = parseFloat(subject.credit.value);

        if(isNaN(mark) || isNaN(credit) || mark < 0 || credit <= 0) {
            alert("Please enter valid numbers");
            return;
        }

        let gradePoint = 0;
        if(mark >= 90) gradePoint = 10;
        else if(mark >= 80) gradePoint = 9;
        else if(mark >= 70) gradePoint = 8;
        else if(mark >= 60) gradePoint = 7;
        else if(mark >= 50) gradePoint = 6;
        else if(mark >= 45) gradePoint = 5;
        else if(mark >= 40) gradePoint = 4;

        marks.push(gradePoint);
        credits.push(credit);
        totalPoints += gradePoint * credit;
        totalCredits += credit;
    });

    if(totalCredits === 0) {
        alert("Please enter valid credits");
        return;
    }

    const sgpa = totalPoints / totalCredits;
    document.getElementById('result').innerHTML = 
        `Your SGPA is: <strong>${sgpa.toFixed(3)}</strong>`;
}

document.getElementById('add-subject').addEventListener('click', () => {
    const newSubject = document.createElement('div');
    newSubject.className = 'subject';
    newSubject.innerHTML = `
        <input type="number" class="mark-input">
        <input type="number" class="credit-input">
    `;
    document.getElementById('subject-container').appendChild(newSubject);
    subjects.push(newSubject);
});

document.getElementById('calculate').addEventListener('click', calculateSGPA);