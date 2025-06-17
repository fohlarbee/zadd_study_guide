import React from 'react'

type OutlineSectionItemProps = {
    title: string;
    desc: string;
    index: number;
}
const OutlineSectionItem = ({ title, desc, index }: OutlineSectionItemProps) => {
  return (
    <div className='flex md:items-center gap-2 border-sidebar-border border-muted-foreground last:border-none
    rounded-md hover:bg-muted-foreground/10 transition-all duration-300 mb-2 md:mb-0'>
      <div className={`${index === 2 || index === 4 ? 'bg-[#fff]' : 'bg-primary'} text-[#fff] rounded-full w-[30px] md:w-[50px] h-[30px]  md:h-[50px] justify-center items-center relative
      flex flex-col m-3 border border-sidebar shadow-md`}>
       <h2 className={`mt-auto mb-auto w-full text-center font-bold ${index === 2 || index === 4 ? 'text-primary' : 'text-[#fff]'}`}> {index}</h2>
      </div>
      <div>
        <h2 className='font-semibold text-sm md:text-lg'>{title}</h2>
        <p className='text-muted-foreground text-xs md:text-sm'>{desc}</p>
      </div>
    </div>
  )
}

export default OutlineSectionItem