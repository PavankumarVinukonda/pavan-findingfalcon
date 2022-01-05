import {Link} from 'react-router-dom'
import './index.css'



const Intro = () => (
    <div className='intro-bg' >
        <h1 className='heading' >FINDING FALCONE</h1>
            <h1 className='dynamictext' >King Shan has received intelligence that Al Falcone is in hiding in one of these 6 planets - DonLon, Enchai, Jebing,
Sapir, Lerbin & Pingasor. However he has limited resources at his disposal & can send his army to only 4 of these
planets</h1>
<Link to='/game' className='link' >
        <button className='play-button' >play game</button>
</Link>
    </div>
)


export default Intro