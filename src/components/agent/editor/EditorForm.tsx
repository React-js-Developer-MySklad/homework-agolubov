import React, {useCallback} from "react";
import {Field, Form} from "react-final-form";
import { AgentData} from "../../../types/agent.types";

type TextEditorProps = {
    fieldName: string,
    type: string,
    label: string,
    placeholder: string,
}

const TextEditor: React.FC<TextEditorProps> = ({fieldName, type, label, placeholder}) => {
    return (
        <div>
            <Field name={fieldName}>
                {props => {
                    console.log(props)
                    return (
                        <>
                            <label htmlFor={fieldName} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
                            <input type={type} name={fieldName} id={fieldName} placeholder={placeholder}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                   {...props.input}
                            />
                            {props.meta.error && <span className="text-red-500 text-xs mt-1">{props.meta.error}</span>}
                        </>
                    )
                }}
            </Field>
        </div>
    )
}


type Props = {
    agent: AgentData,
    doSave: (agent: AgentData) => void
    doClose: () => void
}

const RawForm: React.FC<Props> = ({agent, doSave, doClose}) => {
    const validate = useCallback((values: AgentData) => {
        const errors: Partial<AgentData> = {}

        if (!values.name || values.name.length === 0) {
            errors.name = 'Наименование обязательно'
        }

        if (!values.address || values.address.length === 0) {
            errors.address = 'Адрес обязателен'
        }

        if (!values.inn || values.inn.length === 0) {
            errors.inn = 'ИНН обязателен';
        } else if (!/^\d{11}$/.test(values.inn)) {
            errors.inn = 'ИНН должен содержать 11 цифр'
        }

        if (!values.kpp || values.kpp.length === 0) {
            errors.kpp = 'КПП обязателен';
        } else if (!/^\d{9}$/.test(values.kpp)) {
            errors.kpp = 'КПП должен содержать 9 цифр'
        }

        return errors
    }, [agent])

    return (
        <Form<AgentData> onSubmit={doSave} initialValues={agent} validate={validate}>
            {props => (
                <form onSubmit={props.handleSubmit} className="space-y-4" action="#">
                    <TextEditor fieldName='name' type='text' label='Наименование' placeholder='Иванов И.И.'/>
                    <TextEditor fieldName='address' type='text' label='Адрес' placeholder='ул. Яблочная, д. 156'/>
                    <TextEditor fieldName='inn' type='text' label='ИНН (11 цифр)' placeholder='12345678901'/>
                    <TextEditor fieldName='kpp' type='text' label='КПП (9 цифр)' placeholder='123456789'/>
                    <div className="px-6 flex justify-between">
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Сохранить</button>
                        <button type="button" onClick={doClose} className="text-white bg-gray-500 hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-500 dark:hover:bg-gray-400 dark:focus:bg-gray-600">Отменить</button>
                    </div>
                </form>
            )}
        </Form>
    )
}

export const EditorForm = React.memo(RawForm)