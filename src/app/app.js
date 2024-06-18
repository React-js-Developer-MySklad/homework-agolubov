import html from "./app.html";
import './app.css'
import {ContragentsComponent, ContragentsApi} from "./contragents";

const rootElement = document.getElementById('root');
rootElement.innerHTML = html;

const api = new ContragentsApi([
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
])

const contragentsComponent = new ContragentsComponent(document.getElementById('table'), api)
const addButton = rootElement.querySelector("#contragent-create-button");
addButton.addEventListener("click", function() {
    contragentsComponent.startCreatingNew()
});

contragentsComponent.refresh()
