import {Agent, AgentData, AgentApiService} from "./agent.types";

function* integerGenerator(start = 0): Generator<number, number, number> {
    let i = start;
    while (true) {
        yield i++;
    }
}

export default class AgentApiServiceMock implements AgentApiService {
    #contragents: Agent[] = []
    #idGenerator

    constructor(startData: AgentData[] = []) {
        this.#idGenerator = integerGenerator()
        startData.forEach(c => this.save(c))
    }

    loadAll(): Promise<Agent[]> {
        return Promise.resolve(this.#contragents)
    }

    save(agent: AgentData | Agent): Promise<Agent> {
        let contragent: Agent

        if (this.#isAgent(agent)) {
            contragent = agent as Agent
            this.#contragents = this.#contragents.map(item => item.id === contragent.id ? { ...item, ...contragent } : item);
        } else {
            contragent = {
                ...agent,
                id: this.#idGenerator.next().value
            };
            this.#contragents.push(contragent)
        }

        return Promise.resolve(contragent)
    }

    delete(agent: Agent): Promise<void> {
        this.#contragents = this.#contragents.filter(item => item.id !== agent.id)
        return Promise.resolve(undefined);
    }

    #isAgent(agent: AgentData | Agent): boolean {
        return (agent as Agent).id !== undefined
    }
}