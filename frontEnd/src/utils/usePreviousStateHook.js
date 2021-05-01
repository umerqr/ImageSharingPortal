import {useEffect, useRef, } from 'react'

function usePreviousStateHook (value) {
    const ref = useRef()
    useEffect(() => {
        ref.current = value
    })
    return ref.current
}

export default usePreviousStateHook
