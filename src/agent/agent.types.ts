export interface AgentApiService {
    loadAll(): Promise<Agent[]>
    save(agent: AgentData | Agent): Promise<Agent>
    delete(agent: Agent): Promise<void>
}

export type Agent = AgentData & Identifiable

export type AgentData = {
    name: string
    inn: string
    kpp: string
    address: string
}

export type Identifiable = {
    id: number
}