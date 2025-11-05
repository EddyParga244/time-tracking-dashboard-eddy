const button = document.querySelectorAll(".user-button");
const cards = document.querySelectorAll(".dashboard-card");

let data = null;

// Fetch data from json file
fetch("data.json")
    .then(response => {
        if (!response.ok) throw new Error("Error loading JSON");
        return response.json();
    })
    .then(jsonData => {
        data = jsonData;
        showData("weekly");
        console.log(data);
    })
    .catch(err => console.error("Error:", err));

// Button text to JSON
function btnTextToPeriod(btnOrText) {
    const t = (typeof btnOrText === 'string' ? btnOrText : (btnOrText?.textContent || '')).trim().toLowerCase();
    if (t.startsWith('d')) return 'daily';
    if (t.startsWith('w')) return 'weekly';
    return 'monthly';
}

// Show data
function showData(period) {
    if (!data) {
        console.warn('Data not yet loaded');
        return;
    }

    // Item search
    const map = new Map();
    data.forEach(item => {
        if (item && item.title) map.set(item.title.trim().toLowerCase(), item);
    });

    cards.forEach(card => {
        const nameEl = card.querySelector('.dashboard-card-name');
        const currentEl = card.querySelector('.current-time');
        const prevEl = card.querySelector('.previous-time');

        const titleKey = nameEl ? nameEl.textContent.trim().toLowerCase() : null;
        const item = titleKey ? map.get(titleKey) : null;

        if (item && item.timeframes && item.timeframes[period]) {
            const tf = item.timeframes[period];
            if (currentEl) currentEl.textContent = `${tf.current}hrs`;
            if (prevEl) prevEl.textContent = `Previous - ${tf.previous}hrs`;
        } else {
            if (currentEl) currentEl.textContent = '';
            if (prevEl) prevEl.textContent = '';
        }
    });
}

//Click button event
button.forEach(btn => {
    btn.addEventListener("click", () => {
        button.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        button.forEach(btn => btn.setAttribute('aria-checked', 'false')); // Reset all
        btn.setAttribute('aria-checked', 'true'); // Set active

        const period = btnTextToPeriod(btn);
        showData(period);
    });
});