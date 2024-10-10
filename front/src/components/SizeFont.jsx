import React from 'react'
import plusIcon from '../assets/icons/plusIcon.svg';
import minusIcon from '../assets/icons/minusIcon.svg'
import { Minus, Plus } from 'lucide-react';

const SizeFont = () => {
  return (
    <div className='flex gap-3 justify-center items-center'>
        <p className='p-1 border-2 border-myCustomColor-primaryC rounded-full hover:bg-blue-500 hover:text-white transition-colors duration-300'>
          <Plus size={25} />
        </p>

        <p>A</p>
        <p className='p-1 border-2 border-myCustomColor-primaryC rounded-full hover:bg-blue-500 hover:text-white transition-colors duration-300'>
          <Minus size={25}/>
        </p>
    </div>
  )
}

export default SizeFont