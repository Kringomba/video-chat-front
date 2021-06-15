import React, {createContext, useState} from 'react'

const defaultPopupContextValue = {
    showPopup: false,
    setShowPopup() {
    }
}

export const PopupContext = createContext(defaultPopupContextValue)

export const PopupContextLayout: React.FC = ({children}) => {
    const [showPopup, setShowPopup] = useState(false)

    return <PopupContext.Provider value={{
        showPopup, setShowPopup() {
            setShowPopup(!showPopup)
        }
    }}>
        {children}
    </PopupContext.Provider>
}