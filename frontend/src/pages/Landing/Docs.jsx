import React from 'react'
import SideBarDocs from '../../components/Docs/SideBarDocs'
import HeaderDocs from '../../components/Docs/HeaderDocs'
import { Outlet } from 'react-router'

function Docs() {
  return (
    <div>
      <SideBarDocs />
      <HeaderDocs />

      <div className='p-4'>
        <Outlet />
      </div>
    </div>
  )
}

export default Docs