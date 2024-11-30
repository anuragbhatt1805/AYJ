import { useSignals } from '@preact/signals-react/runtime'
import React from 'react'

const Swap : React.FC = () => {
    useSignals();
    
  return (
    <div>Swap</div>
  )
}

export default Swap