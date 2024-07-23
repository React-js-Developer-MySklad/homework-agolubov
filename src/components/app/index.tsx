import React, {useCallback, useState} from "react"
import {Agent, AgentData} from "../../types/agent.types"
import {Header} from "./header/Header"
import {Footer} from "./footer/Footer"
import AgentEditor from "../agent/editor"
import AgentTable from "../agent/table"
import {useAgentContext} from "../../hooks/useAgentContext";

const App: React.FC = () => {
    const { agents, deleteAgent, saveAgent } = useAgentContext()
    const [showModal, setShowModel] = useState({} as {agent?: Agent, show: boolean})

    const onDelete = useCallback(deleteAgent, [deleteAgent])
    const onSave = useCallback((agent: Agent | AgentData) => saveAgent(agent).then(() => closeModal()), [saveAgent])

    const showCreationModal = useCallback(() => {
        setShowModel({agent: null, show: true})
    }, [])

    const showEditModal = useCallback((agent: Agent) => {
        setShowModel({agent: agent, show: true})
    }, [])

    const closeModal = useCallback(() => {
        setShowModel({agent: null, show: false})
    }, [])

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