import React from 'react'

function HeaderDocs() {
  return (
    <div className='fixed top-0 left-74 right-0 bg-gray-100 h-20 flex justify-between items-center '>
        <div className='ml-5'>
            <input 
                type="text" 
                placeholder='Search...'
                onChange={(e) => onSearch(e.target.value)}
                className='bg-white m-4 h-10 w-50 rounded-sm p-1'
            />
        </div>

        <div className='mr-5'>
            <button className='bg-blue-600 text-white rounded-sm p-2'>Get Started</button>
        </div>
        


    </div>
  )
}

export default HeaderDocs