import React from 'react'
import Logo from '../../../assets/logo.svg'
import ButtonImage from '../../../assets/button_image.svg'

type Props = {
    onAdd: () => void;
}

export const Header: React.FC<Props> = props => {
    const { onAdd } = props
    return (
        <header>
            <nav className="bg-white">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <img src={Logo} alt="moysklad-logo"/>
                    <button className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center gap-2" onClick={onAdd}>
                        <img src={ButtonImage} alt=""/>
                        Добавить
                    </button>
                </div>
            </nav>
        </header>
    )
}