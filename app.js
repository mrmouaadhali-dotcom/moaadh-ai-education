const stageFilter = document.getElementById("stageFilter");
const yearFilter = document.getElementById("yearFilter");
const subjectFilter = document.getElementById("subjectFilter");
const searchInput = document.getElementById("searchInput");
const examsList = document.getElementById("examsList");

let allExams = [];

async function loadExams() {
    try {
        const response = await fetch('data/exams.json');
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
        examCard.innerHTML = `
            <div class="exam-item" style="border: 1px solid #e2e8f0; padding: 20px; border-radius: 12px; margin-bottom: 16px; display: flex; justify-content: space-between; align-items: center; background-color: #fff; box-shadow: 0 2px 4px rgba(0,0,0,0.02); direction: rtl;">
                <div style="text-align: right;">
                    <span style="font-size: 0.85rem; color: #3b82f6; font-weight: bold; background-color: #eff6ff; padding: 4px 8px; border-radius: 4px;">• ${exam.year || 'متوسط'}</span>
                    <h3 style="margin: 10px 0 5px 0; font-size: 1.25rem; color: #1e293b; font-weight: bold;">${exam.title}</h3>
                    <p style="margin: 0; font-size: 0.95rem; color: #64748b;">${exam.subject} • ${exam.term}</p>
                </div>
                <a href="${exam.fileUrl}" target="_blank" style="background-color: #3b82f6; color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 0.95rem; display: flex; align-items: center; gap: 8px; white-space: nowrap; box-shadow: 0 4px 6px rgba(59, 130, 246, 0.2);">
                    📄 تحميل الفرض
                </a>
            </div>
        `;
        examsList.appendChild(examCard);
    });
}

function filterExams() {
    const search = searchInput ? searchInput.value.toLowerCase() : "";
    
    // فلترة مرنة تعتمد على البحث بالاسم أو عرض كل شيء إذا كانت الخيارات فارغة
    const filtered = allExams.filter(exam => {
        return !search || exam.title.toLowerCase().includes(search) || exam.subject.toLowerCase().includes(search);
    });

    displayExams(filtered);
}

if(stageFilter) stageFilter.addEventListener("change", filterExams);
if(yearFilter) yearFilter.addEventListener("change", filterExams);
if(subjectFilter) subjectFilter.addEventListener("change", filterExams);
if(searchInput) searchInput.addEventListener("input", filterExams);

window.addEventListener("DOMContentLoaded", loadExams);
