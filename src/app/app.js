import html from "./app.html";
import './app.css'
import {ContragentsComponent} from "./contragents";

const rootElement = document.getElementById('root');
rootElement.innerHTML = html;

const contragentsComponent = new ContragentsComponent(document.getElementById('table'))
const addButton = rootElement.querySelector("#contragent-create-button");
addButton.addEventListener("click", function() {
    contragentsComponent.startCreatingNew()
});


const contragents = [
    {
        name: "1",
        address: "1",
        inn: "1",
        kpp: "1"
    },
    {
        name: "2",
        address: "2",
        inn: "2",
        kpp: "2"
    },
    {
        name: "3",
        address: "3",
        inn: "3",
        kpp: "3"
    }
]
contragentsComponent.setContragents(contragents)