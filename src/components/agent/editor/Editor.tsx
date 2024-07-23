import React, {memo, useEffect, useRef, useState} from 'react'
import {Modal as FlowbiteModal} from "flowbite"
import {Agent, AgentData} from "../../../agent/agent.types";

type Props = {
    agent?: Agent
    show: boolean
    onSave: (agent: AgentData | Agent) => void
    onClose: () => void
}

export const Editor: React.FC<Props> = memo(({agent, show, onSave, onClose}) => {
    const view = useRef(null)
    const modalView = useRef<FlowbiteModal>(null)
    const [value, setValue] = useState<Agent | AgentData>(null)

    useEffect(() => {
        setValue(agent !== null ? {...agent} : {name: '', address: '', inn: '', kpp: ''})
    }, [agent]);

    useEffect(() => {
        modalView.current = new FlowbiteModal(view.current)
        modalView.current.updateOnHide(onClose)
    }, [view, onClose]);

    useEffect(() => {
        if (modalView.current != null) {
            show ? modalView.current.show() : modalView.current.hide()
        }
    }, [show, modalView])

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        event.stopPropagation();
        onSave(value);
    };

    return (
        <div ref={view} id="contragent-create-modal" tabIndex={-1} aria-hidden="true" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-center justify-center p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                            Контрагент
                        </h3>
                    </div>
                    <div className="p-4 md:p-5">
                        <form onSubmit={handleSubmit} className="space-y-4" action="#">
                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Наименование</label>
                                <input value={value?.name} onChange={e => setValue({...value, name: e.target.value})}
                                       type="text" name="name" id="name" placeholder="Иванов И.И." required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" />
                            </div>
                            <div>
                                <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Адрес</label>
                                <input value={value?.address} onChange={e => setValue({...value, address: e.target.value})}
                                       type="text" name="address" id="address" placeholder="ул. Яблочная, д. 156" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"  />
                            </div>
                            <div>
                                <label htmlFor="inn" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ИНН (11 цифр)</label>
                                <input value={value?.inn} onChange={e => setValue({...value, inn: e.target.value})}
                                       type="text" name="inn" id="inn" placeholder="12345678901" pattern="[0-9]{11}" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"  />
                            </div>
                            <div>
                                <label htmlFor="kpp" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">КПП (9 цифр)</label>
                                <input value={value?.kpp} onChange={e => setValue({...value, kpp: e.target.value})}
                                       type="text" name="kpp" id="kpp" placeholder="123456789" pattern="[0-9]{9}" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"  />
                            </div>
                            <div className="px-6 flex justify-between">
                                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Сохранить</button>
                                <button type="button" onClick={onClose} className="text-white bg-gray-500 hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-500 dark:hover:bg-gray-400 dark:focus:bg-gray-600">Отменить</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
})