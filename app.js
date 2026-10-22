const stageFilter = document.getElementById("stageFilter");
const yearFilter = document.getElementById("yearFilter");
const subjectFilter = document.getElementById("subjectFilter");
const searchInput = document.getElementById("searchInput");
const examsList = document.getElementById("examsList");

let allExams = [];

async function loadExams() {
    try {
        const response = await fetch('exams.json');
        allExams = await response.json();
        displayExams(allExams);
    } catch (error) {
        console.error("Error loading exams:", error);
    }
}

function displayExams(exams) {
    examsList.innerHTML = "";
    if (exams.length === 0) {
        examsList.innerHTML = `
            <div style="text-align: center; padding: 40px; color: #64748b;">
                <p style="font-size: 1.2rem; font-weight: bold;">المكتبة جاهزة لاستقبال الفروض</p>
                <p style="font-size: 0.9rem;">لم نُضف ملفات موثقة بعد. لن نعرض فروضاً وهمية على أنها رسمية.</p>
            </div>
        `;
        return;
    }

    exams.forEach(exam => {
        const examCard = document.createElement("div");
        examCard.className = "exam-card";
        examCard.innerHTML = `
            <h3>${exam.title}</h3>
            <p>${exam.subject} - ${exam.year} - ${exam.term}</p>
            <a href="${exam.fileUrl}" target="_blank">تحميل</a>
        `;
        examsList.appendChild(examCard);
    });
}

function filterExams() {
    const stage = stageFilter.value;
    const year = yearFilter.value;
    const subject = subjectFilter.value;
    const search = searchInput.value.toLowerCase();

    const filtered = allExams.filter(exam => {
        const matchStage = !stage || exam.phase === stage;
        const matchYear = !year || exam.year === year;
        const matchSubject = !subject || exam.subject === subject;
        const matchSearch = !search || exam.title.toLowerCase().includes(search) || exam.subject.toLowerCase().includes(search);
        return matchStage && matchYear && matchSubject && matchSearch;
    });

    displayExams(filtered);
}

stageFilter.addEventListener("change", filterExams);
yearFilter.addEventListener("change", filterExams);
subjectFilter.addEventListener("change", filterExams);
searchInput.addEventListener("input", filterExams);

window.addEventListener("DOMContentLoaded", loadExams);
