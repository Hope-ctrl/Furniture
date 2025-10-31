import { useState } from 'react'
import logo from '../../images/furniture_logo.png'
import { FaBox, FaChevronUp, FaJediOrder, FaList, FaReceipt } from 'react-icons/fa6'
import { BiCategoryAlt, BiGridAlt } from "react-icons/bi"
import { BsBagCheck } from "react-icons/bs"
import { MdCategory } from "react-icons/md"
import { FaEdit } from 'react-icons/fa'

const Sidebar = ()=>{
    const buttonDetails = [
        {
            id: 1,
            tag: 'Dashboard',
            icon: <BiGridAlt/>
        },
        {
            id: 2,
            tag: 'Category', 
            icon: <MdCategory/>
        },
        {
            id: 3,
            tag: 'Orders',
            icon: <BsBagCheck/>
        }
    ]
    const [active, setActive] = useState(null)

    return(
        <div className=' bg-gradient-to-b from-gray-300 to-white w-[20%] h-[100vh] p-5 '>
            <img src={logo} alt="" className='w-[150px] ml-3 mb-7 mt-5 ' />
            <div className='flex flex-col gap-1 w-[80%] '>
                {
                    buttonDetails.map((item) => (
                        <button className={`px-4 py-2 text-left transition-colors text-[18px] duration-500 ease-in-out flex items-center gap-1  ${ item.id === active? ' rounded-full text-white border-none bg-gradient-to-b from-gray-600 to-black': 'bg-transparent'}`} onClick={()=>setActive(item.id)}>{item.icon}{item.tag}</button>
                    ))
                }
                <button className={` px-4 py-2 text-left text-[18px] rounded-full flex gap-1 justify-between items-center ${active === 4? 'border-2': 'border-none'} `} onClick={()=>{
                    if(active >= 4){
                        setActive(null);
                    }else{
                        setActive(4)
                    }
                }} ><p className='flex items-center gap-1 text-[18px] '><FaBox/> Product</p> <FaChevronUp className={`text-[14px] transition-all ease-in-out duration-500 ${ active >= 4? 'rotate-180': 'rotate-0' }`} /> </button>
                <div className={`transition-opacity duration-1000 ease-in-out ${active >= 4? 'opacity-100': 'opacity-0'}`}>
                    {
                    active >= 4 && 
                    <div className={`w-[200px] h-[100px] flex flex-col pl-4`}>
                    {
                        [{id: 5, tag: 'list', icon: <FaList/> }, {id:6, tag: 'edit', icon: <FaEdit/>}].map((item)=>(
                            <button className={`px-4 py-2 text-left transition-colors duration-500 flex gap-1 items-center ease-in-out capitalize ${ item.id === active? ' rounded-full text-white border-none bg-gradient-to-b from-gray-600 to-black': 'bg-transparent'} `} onClick={()=>setActive(item.id)}>{item.icon}{item.tag}</button>
                        ))
                    }
                    
                </div>
                }
                </div>
            </div>

        </div>
    )
}

export default Sidebar;