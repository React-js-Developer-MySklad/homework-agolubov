import './style.css';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import App from "./components/app";
import AgentApiServiceMock from "./agent/AgentApiServiceMock";

const agentApiServiceMock = new AgentApiServiceMock([
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

const rootElement = document.getElementById('root')
const root = createRoot(rootElement)

root.render(
    <StrictMode>
        <App agentService={agentApiServiceMock}/>
    </StrictMode>
)
