import React from 'react'

const Layout = ({children, ...props}) => {
  return (
    <div>{...props, children}</div>
  )
}

export default Layout