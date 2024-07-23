import React, {useEffect, useState} from "react"
import {Agent, AgentApiService, AgentData} from "../../agent/agent.types"
import {Header} from "./header/Header"
import {Footer} from "./footer/Footer"
import AgentEditor from "../agent/editor"
import AgentTable from "../agent/table"

type Props = {
    agentService: AgentApiService
}

const App: React.FC<Props> = ({agentService}) => {
    const [agents, setAgents] = useState([] as Agent[])
    const [showModal, setShowModel] = useState({} as {agent?: Agent, show: boolean})

    useEffect(() => {
        agentService.loadAll().then(setAgents)
    }, [])

    const onDelete = (agent: Agent) => {
        agentService.delete(agent)
            .then(() => agentService.loadAll())
            .then(setAgents)
    }

    const onSave = (agent: Agent | AgentData) => {
        console.log("saving", agent)
        agentService.save(agent)
            .then(() => closeModal())
            .then(() => agentService.loadAll())
            .then(setAgents)
    }

    const showCreationModal = () => {
        setShowModel({agent: null, show: true})
    }

    const showEditModal = (agent: Agent) => {
        setShowModel({agent: agent, show: true})
    }

    const closeModal = () => {
        setShowModel({agent: null, show: false})
    }

    return (
        <>
            <Header onAdd={showCreationModal} />
            <AgentTable agents={agents} onEdit={showEditModal} onDelete={onDelete}/>
            <AgentEditor {...showModal} onClose={closeModal} onSave={onSave}/>
            <Footer/>
        </>
    )
}

export default App