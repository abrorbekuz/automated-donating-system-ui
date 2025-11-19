import React from 'react'
import ReactDOM from 'react-dom'

// const Portal: React.FC<PortalProps> = ({ children }) => {
//   const container = document.createElement('div')

//   useEffect(() => {
//     document.body.appendChild(container)

//     return () => {
//       document.body.removeChild(container)
//     }
//   }, [container])

//   return ReactDOM.createPortal(<React.Fragment>{children}</React.Fragment>, container)
// }

const Portal = ({ children }: { children: React.ReactNode }) => {
  const portalRoot = document.getElementById('root')
  return portalRoot ? ReactDOM.createPortal(children, portalRoot) : null
}

export default Portal
