import React from 'react'

function Title({ title, description }) {
  return (
    <div className='text-center mt-10 text-slate-700'>
      <h2 className='text-3xl sm:text-4xl font-bold'>{title}
      </h2>
      <p className='max-w-2xl mx-auto mt-4 font-medium text-slate-500 text-center'>{description}
      </p>
    </div>
  )
}

export default Title