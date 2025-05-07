const table = document.getElementById("comp-score-breakdown");
table.deleteRow(1);
const sheetBlocks = document.querySelectorAll("#sheet .sheet-content");

function addBreakRow(mission, max, count, score) {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${mission}</td>
        <td>${max}</td>
        <td>${count}</td>
        <td>${score}</td>
    `;
    table.appendChild(row);
}

sheetBlocks.forEach(block => {
    const mission = block.querySelector(".sheet-content-header")?.innerText || "Unnamed";

    addBreakRow(mission, 0, 0, 0);
});

function genprepare(){
    const detail = {
        comptitle: document.getElementById("comp-title").innerHTML,
        teamname: document.getElementById("team-name").value,
        // judge: document.getElementById("").value,
        round: document.getElementById("round").value,
        // date: document.getElementById("").value,
        // starttime: document.getElementById("").value,
        // endtime: document.getElementById("").value,
        score: document.getElementById("score").innerHTML,
        time: document.getElementById("secLabel").value + ":" + document.getElementById("tenLabel").value
    };

    const report = document.getElementById("report");

    report.removeAttribute("hidden");

    report.querySelector("#detail-comp-name").innerText = detail.comptitle;
    report.querySelector(".detail-team-name").innerText = detail.teamname;
    report.querySelector(".detail-round").innerText = detail.round;
    report.querySelectorAll(".detail-comp-score").forEach(sc => {
        sc.innerText = detail.score;
    });
    report.querySelectorAll(".detail-comp-time").forEach(tm => {
        tm.innerText = detail.time;
    });
}

async function genPDF(){
    genprepare();

    const gen = report;
    html2pdf().from(gen).save();
}

async function genJPEG() {
    genprepare();

    htmlToImage
    .toJpeg(report, {quality: 0.95})
    .then((dataUrl) => {
        const gen = document.createElement('a');
        gen.download = 'score-report.jpeg';
        gen.href = dataUrl;
        gen.click();
    })
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
    link.download = "score-report-a4.jpeg";
    link.href = jpegData;
    link.click();
}