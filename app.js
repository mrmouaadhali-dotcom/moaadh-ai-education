const stageFilter = document.getElementById("stageFilter");
const yearFilter = document.getElementById("yearFilter");
const subjectFilter = document.getElementById("subjectFilter");
const searchInput = document.getElementById("searchInput");
const examList = document.getElementById("examList");
const menuButton = document.getElementById("menuButton");
const mainNav = document.getElementById("mainNav");

menuButton?.addEventListener("click", () => mainNav.classList.toggle("open"));

function updateYears() {
  const stage = stageFilter.value;
  const oldYear = yearFilter.value;
  const years = stage === "ابتدائي" ? ["الأولى ابتدائي","الثانية ابتدائي","الثالثة ابتدائي","الرابعة ابتدائي","الخامسة ابتدائي"]
    : stage === "متوسط" ? ["الأولى متوسط","الثانية متوسط","الثالثة متوسط","الرابعة متوسط"]
    : stage === "ثانوي" ? ["الأولى ثانوي","الثانية ثانوي","الثالثة ثانوي"]
    : ["الأولى ابتدائي","الثانية ابتدائي","الثالثة ابتدائي","الرابعة ابتدائي","الخامسة ابتدائي","الأولى متوسط","الثانية متوسط","الثالثة متوسط","الرابعة متوسط","الأولى ثانوي","الثانية ثانوي","الثالثة ثانوي"];
  yearFilter.innerHTML = '<option value="">كل السنوات</option>' + years.map(y => `<option>${y}</option>`).join("");
  if (years.includes(oldYear)) yearFilter.value = oldYear;
}
stageFilter.addEventListener("change", updateYears);
updateYears();

// The data files are intentionally empty until verified educational materials are added.
fetch("./data/exams.json").then(r => r.ok ? r.json() : []).then(exams => {
  const list = Array.isArray(exams) ? exams : [];
  const render = () => {
    const stage = stageFilter.value, year = yearFilter.value, subject = subjectFilter.value;
    const q = searchInput.value.trim().toLocaleLowerCase("ar");
    const filtered = list.filter(e =>
      (!stage || e.stage === stage) && (!year || e.year === year) &&
      (!subject || e.subject === subject) &&
      (!q || `${e.title||""} ${e.subject||""} ${e.year||""} ${e.term||""}`.toLocaleLowerCase("ar").includes(q))
    );
    if (!filtered.length) {
      examList.className = "empty-state";
      examList.innerHTML = `<div class="empty-icon">📂</div><h3>${list.length ? "لا توجد نتائج مطابقة" : "المكتبة جاهزة لاستقبال الفروض"}</h3><p>${list.length ? "جرّب تغيير خيارات البحث." : "لم تُضَف ملفات موثّقة بعد. لن نعرض فروضًا وهمية على أنها رسمية."}</p>`;
      return;
    }
    examList.className = "exam-grid";
    examList.innerHTML = filtered.map(e => `<article class="exam-card"><span class="eyebrow">${e.stage||""} • ${e.year||""}</span><h3>${e.title||"فرض"}</h3><p>${e.subject||""} ${e.term ? "• "+e.term : ""}</p>${e.source ? `<small>المصدر: ${e.source}</small>` : ""}${e.file ? `<p><a href="${e.file}" target="_blank" rel="noopener">فتح الملف</a></p>` : ""}${e.solution ? `<p><a href="${e.solution}" target="_blank" rel="noopener">عرض الحل</a></p>` : ""}</article>`).join("");
  };
  [stageFilter, yearFilter, subjectFilter, searchInput].forEach(el => el.addEventListener("input", render));
  render();
}).catch(() => {
  examList.innerHTML = '<div class="empty-icon">📂</div><h3>المكتبة جاهزة لاستقبال الفروض</h3><p>لم تُضَف ملفات موثّقة بعد.</p>';
});

if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
  window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js").catch(() => {}));
}
