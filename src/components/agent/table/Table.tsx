import React from "react";
import {Agent} from "../../../types/agent.types";
import {Row} from "./Row";

type Props = {
    agents: Agent[],
    onEdit: (agent: Agent) => void,
    onDelete: (agent: Agent) => void
}

export const Table: React.FC<Props> = ({agents, onEdit, onDelete}) => {
    return (
        <div className="relative overflow-x-auto max-w-screen-xl mx-auto p-4">
            <table className="w-full mx-auto p-4 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Наименование
                    </th>
                    <th scope="col" className="px-6 py-3">
                        ИНН
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Адрес
                    </th>
                    <th scope="col" className="px-6 py-3">
                        КПП
                    </th>
                    <th scope="col" className="px-6 py-3"></th>
                </tr>
                </thead>
                <tbody>
                {
                    agents.map(a => <Row key= {a.id} agent={a} onEdit={() => onEdit(a)} onDelete={() => onDelete(a)}/>)
                }
                </tbody>
            </table>
        </div>
    )
}