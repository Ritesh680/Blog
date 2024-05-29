import {TabletDevice,ArrowDown} from 'akar-icons';

const NavLinks = () => {
  const Links = [{name:'National',link:''},{name:'International',link:''},{name:'business',link:''},{name:'entertainment',link:''},{name:'science/tech',link:''},{name:'sports',link:''},{name:'ians life',link:''},{name:'all stories',link:''},{name:'more1',link:''},{name:'more2',link:''}]
  return (
    <div className='flex bg-red-600 p-4 text-white gap-10'>
      <div className='flex items-center'>
<TabletDevice/>
        <span className='font-bold'>Live IANS</span>
      </div>
      <ul className='flex items-center gap-8'>
        {Links.slice(0,8).map((link, index) => (
          <li key={index} className='capitalize cursor-pointer'>{link.name.toUpperCase()}</li>
        ))}
        {Links.length>8 && <li className='flex items-center'><span>MORE</span><ArrowDown/></li>}
      </ul>
    </div>
  )
}

export default NavLinks