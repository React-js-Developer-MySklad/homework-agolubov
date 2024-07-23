export type AgentContextType = {
    agents: Agent[]
    deleteAgent: (agent: Agent) => Promise<void>
    saveAgent: (agent: Agent | AgentData) => Promise<void>
}

export type Agent = AgentData & Identifiable

export type AgentData = {
    name: string
    inn: string
    kpp: string
    address: string
}

export type Identifiable = {
    id: string
}