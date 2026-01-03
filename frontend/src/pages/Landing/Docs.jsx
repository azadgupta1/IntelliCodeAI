import React from 'react'
import HeaderDocs from '../../components/Docs/HeaderDocs'
import { Outlet } from 'react-router'

function Docs() {
  return (
    <div>
      <HeaderDocs />
      <div className='p-4'>
        <Outlet />
      </div>
    </div>
  )
}

export default Docs