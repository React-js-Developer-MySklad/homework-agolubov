import {createContext, PropsWithChildren, useContext, useEffect, useState} from "react";
import {Agent, AgentContextType, AgentData} from "../types/agent.types";
import AgentService from "../services/AgentService";

export const AgentContext = createContext<AgentContextType | undefined>(undefined)

const agentService = new AgentService()

export const AgentProvider: React.FC<PropsWithChildren> = ({children}) => {
    const [agents, setAgents] = useState<Agent[]>([])

    useEffect(() => {
        agentService.loadAll().then(setAgents)
    }, [])

    const deleteAgent = async (agent: Agent) => {
        agentService.delete(agent)
            .then(() => setAgents(prevState => prevState.filter(a => a.id !== agent.id)))
    }

    const saveAgent = async (agent: AgentData | Agent) => {
        agentService.save(agent)
            .then(created => setAgents(prevState =>
                prevState.some((a) => a.id === created.id)
                    ? prevState.map((a) => (a.id === created.id ? created : a))
                    : [...prevState, created])
            )
    };

    return (
        <AgentContext.Provider value={{agents, deleteAgent, saveAgent}}>
            {children}
        </AgentContext.Provider>
    );
};

export const useAgentContext = () => {
    const context = useContext(AgentContext)

    if (context === undefined) {
        throw new Error('useAgentContext must be used within an AgentProvider')
    }

    return context
}