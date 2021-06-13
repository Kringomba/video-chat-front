import React, {useCallback, useContext, useEffect, useRef} from 'react'
import './style.css'
import {PopupContext} from "../../contexts";

export const PopupLayout: React.FC = ({children}) => {
    const ref = useRef<HTMLDivElement>(null)
    const {setShowPopup} = useContext(PopupContext)

    const outside = useCallback((event: MouseEvent) => {
        // @ts-ignore
        if (ref.current && !ref.current.contains(event.target)) {
            setShowPopup()
        }
    }, [ref, setShowPopup])

    useEffect(() => {
        document.addEventListener('mousedown', (event) => outside(event));
        return () => {
            document.removeEventListener('mousedown', (event) => outside(event))
        };
    }, []);

    return <div className="popup-layout">
        <div ref={ref} className="content-layout">
            {children}
        </div>
    </div>
}
