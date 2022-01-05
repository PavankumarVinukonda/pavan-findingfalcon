import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
    <div className='notfound-container' >
        <h1 className="page-not-found" >PAGE NOT FOUND</h1>
        <Link to='/' className='link'>
        <button type='button' className='back-to-game' >Back to the game</button>
        </Link>
    </div>
)


export default NotFound