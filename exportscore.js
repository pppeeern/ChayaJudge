const table = document.getElementById("comp-score-breakdown");
const missionBlocks = document.querySelectorAll("#sheet .sheet-content");
let filename;

function addBreakRow(mission, max, score) {
    const row = document.createElement("tr");
    row.className = "break";
    row.innerHTML = `
        <td>${mission}</td>
        <td>${max}</td>
        <td>${score}</td>
    `;
    table.appendChild(row);
}

function breakdownTable(){
    table.querySelectorAll("tr.break").forEach(row => row.remove());
    
    missionBlocks.forEach(block => {
        const title = block.querySelector(".sheet-content-header")?.innerText || "Unnamed";
        const maxscore = block.querySelector(".sheet-content-lists-title").getAttribute("max");
        const scoring = block.querySelectorAll(".sheet-input");
        let score = 0;
        
        scoring.forEach(input => {
            if (input.checked) score = parseInt(input.getAttribute("scoredata")) || 0;
        });

        addBreakRow(title, maxscore, score);
    });
}
function genprepare(){
    const sheet_date = new Date();

    const detail = {
        comptitle: document.getElementById("comp-title").innerHTML || "Competition",
        teamname: document.getElementById("team-name").value || "Anonymous",
        // judge: document.getElementById("").value,
        round: document.getElementById("round").value || 0,
        // date: document.getElementById("").value,
        // starttime: document.getElementById("").value,
        // endtime: document.getElementById("").value,
        score: document.getElementById("score").innerHTML || 0,
        time: document.getElementById("secLabel").value + ":" + document.getElementById("tenLabel").value || "00:00"
    };
    
    filename = `${detail.comptitle}_${detail.round}_${detail.teamname}.pdf`;

    const report = document.getElementById("report");

    report.removeAttribute("hidden");

    report.querySelector("#sheet-date").innerText = sheet_date.getDate() + "/" + (sheet_date.getMonth() + 1) + "/" + sheet_date.getFullYear();

    report.querySelector("#detail-comp-name").innerText = detail.comptitle;
    report.querySelector(".detail-team-name").innerText = detail.teamname;
    report.querySelector(".detail-round").innerText = detail.round;
    report.querySelectorAll(".detail-comp-score").forEach(sc => {sc.innerText = detail.score;});
    report.querySelectorAll(".detail-comp-time").forEach(tm => {tm.innerText = detail.time;});

    breakdownTable();
}

async function genPDF(){
    genprepare();

    await new Promise(resolve => requestAnimationFrame(() => setTimeout(resolve, 100)));

    const gen = report;

    await html2pdf()
    .from(gen)
    .set({ filename: filename })
    .save();

    report.setAttribute("hidden", "true");
}

async function genJPEG() {
    genprepare();
    

    await htmlToImage
    .toJpeg(report, {quality: 0.95})
    .then((dataUrl) => {
        const gen = document.createElement('a');
        gen.download = `${filename}.jpeg`;
        gen.href = dataUrl;
        gen.click();
    })

    report.setAttribute("hidden", "true");
}

async function genJPEGA4() {
    genprepare();

    const A4_WIDTH = 1240;
    const A4_HEIGHT = 1754;

    const report = document.getElementById("report");

    await new Promise((r) => setTimeout(r, 100));

    const contentDataUrl = await htmlToImage.toPng(report);

    const canvas = document.createElement("canvas");
    canvas.width = A4_WIDTH;
    canvas.height = A4_HEIGHT;

    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.src = contentDataUrl;

    await new Promise((resolve) => {
        img.onload = () => {
            const scale = Math.min(
                A4_WIDTH / img.width,
                A4_HEIGHT / img.height
            );
            const x = (A4_WIDTH - img.width * scale) / 2;
            const y = 0;
            ctx.fillStyle = "#fff";
            ctx.fillRect(0, 0, A4_WIDTH, A4_HEIGHT);
            ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
            resolve();
        };
    });

    const jpegData = canvas.toDataURL("image/jpeg", 0.95);
    const link = document.createElement("a");
    link.download = `${filename}.jpeg`;
    link.href = jpegData;
    link.click();

    report.setAttribute("hidden", "true");
}