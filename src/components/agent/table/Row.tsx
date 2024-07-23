import React from "react";
import {Agent} from "../../../agent/agent.types";

type Props = {
    agent: Agent
    onEdit: () => void
    onDelete: () => void
}

export const Row: React.FC<Props> = ({agent, onEdit, onDelete}) => {
    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100" onDoubleClick={onEdit}>
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{agent.name}</th>
            <td className="px-6 py-4">{agent.inn}</td>
            <td className="px-6 py-4">{agent.address}</td>
            <td className="px-6 py-4">{agent.kpp}</td>
            <td>
                <button type="button"
                        className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-1 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                        onClick={onDelete}
                        onDoubleClick={e => {
                            e.stopPropagation()
                        }}
                >Удалить</button>
            </td>
        </tr>
    )
}