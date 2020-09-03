let container = document.querySelector("#liste");
let temp = document.querySelector("template");
let retter;
let filter = "alle";
const popop = document.querySelector("#popop");


const link = "https://spreadsheets.google.com/feeds/list/17Dd7DvkPaFamNUdUKlrFgnH6POvBJXac7qyiS6zNRw0/od6/public/values?alt=json";

async function hentdata() {
    const respons = await fetch(link);
    retter = await respons.json();
    addEventListenersToButtons();
    visRetter();
}

function visRetter() {

    container.innerHTML = "";
    retter.feed.entry.forEach(retter => {

        if (filter == "alle" || filter == retter.gsx$kategori.$t) {


            const klon = temp.cloneNode(true).content;


            klon.querySelector(".titel").textContent = retter.gsx$navn.$t;

            klon.querySelector(".info").textContent = retter.gsx$kort.$t;

            klon.querySelector(".pris").textContent += retter.gsx$pris.$t;

            klon.querySelector("img").src = "imgs/small/" + retter.gsx$billede.$t + "-sm.jpg";

            klon.querySelector("article").addEventListener("click", () => visDetaljer(retter));


            container.appendChild(klon);
        }
    })
}

document.querySelector("#luk").addEventListener("click", () => popop.style.display = "none");

function visDetaljer(retter) {
    popop.style.display = "block";
    popop.querySelector(".navn").textContent = retter.gsx$navn.$t;
    popop.querySelector(".info").textContent = retter.gsx$kort.$t;
    popop.querySelector(".lang").textContent = retter.gsx$lang.$t;
    popop.querySelector(".pris").textContent = retter.gsx$pris.$t;
    popop.querySelector("img").src = "imgs/small/" + retter.gsx$billede.$t + "-sm.jpg";

}

function addEventListenersToButtons() {
    document.querySelectorAll(".filter").forEach((btn) => {
        btn.addEventListener("click", filterBTNs);
    })
}

function filterBTNs() {
    filter = this.dataset.kategori;
    document.querySelectorAll(".filter").forEach((btn) => {

        btn.classList.remove("valgt");
    })
    this.classList.add("valgt");
    visRetter();
}

hentdata()
