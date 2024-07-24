import {Agent, AgentData} from "../types/agent.types";

export default class AgentService {
    #endpoint = "http://localhost:3000/agent"

    async loadAll(): Promise<Agent[]> {
        return await fetch(this.#url(null))
            .then(r => r.json())
    }

    async delete(agent: Agent): Promise<void> {
        return await fetch(this.#url(agent), {method: 'DELETE'})
            .then(() => undefined)
    }

    async save(agent: AgentData | Agent): Promise<Agent> {
        return await fetch(this.#url(agent), {
            method: this.#isAgent(agent) ? 'PUT' : 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(agent)
        }).then(r => r.json())
    }

    #url(agent: AgentData | Agent | undefined): string {
        if (!agent || !this.#isAgent(agent)) {
            return this.#endpoint
        }
        return `${this.#endpoint}/${(agent as Agent).id}`
    }

    #isAgent(agent: AgentData | Agent): boolean {
        return (agent as Agent).id !== undefined
    }
}

