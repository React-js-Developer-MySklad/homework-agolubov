import React, {memo, useCallback, useContext, useEffect, useRef, useState} from 'react'
import {Modal as FlowbiteModal} from "flowbite"
import {Agent, AgentData} from "../../../types/agent.types";
import {createPortal} from "react-dom";
import {EditorForm} from "./EditorForm";

type Props = {
    agent?: Agent
    show: boolean
    onSave: (agent: AgentData | Agent) => void
    onClose: () => void
}

const stubAgent: AgentData = {
    name: '',
    address: '',
    inn: '',
    kpp: ''
}

export const Editor: React.FC<Props> = memo(({agent, show, onSave, onClose}) => {
    const view = useRef(null)
    const modalView = useRef<FlowbiteModal>(null)

    useEffect(() => {
        modalView.current = new FlowbiteModal(view.current)
        modalView.current.updateOnHide(onClose)
    }, [view, onClose]);

    useEffect(() => {
        if (modalView.current != null) {
            show ? modalView.current.show() : modalView.current.hide()
        }
    }, [show, modalView])

    const doSave = useCallback((toSave: AgentData) => {
        onSave({
            id: agent.id,
            ...toSave
        })
    }, [onSave])

    return createPortal(
        <div ref={view} id="contragent-create-modal" tabIndex={-1} aria-hidden="true" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-center justify-center p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                            Контрагент
                        </h3>
                    </div>
                    <div className="p-4 md:p-5">
                        <EditorForm agent={agent ? agent : stubAgent} doSave={doSave} doClose={onClose}/>
                    </div>
                </div>
            </div>
        </div>
    , document.body)
})