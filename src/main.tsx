import './style.css';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import App from "./components/app";
import {AgentProvider} from "./hooks/useAgentContext";

const rootElement = document.getElementById('root')
const root = createRoot(rootElement)

root.render(
    <StrictMode>
        <AgentProvider>
            <App/>
        </AgentProvider>
    </StrictMode>
)
