import {Link} from 'react-router-dom'

import './index.css'

const Header = props => {
    const {onClickReset} = props

    const onClikingRestButton = () => {
        onClickReset()
    }

    return(
    <nav className='nav-bar'>
        <div className='web-site-name-container' >
                <h1 className='heading' > Finding Falcone! </h1>
        </div>
        <div className='thumbnails-container' >
                <button type='button' className='resetButton' onClick={onClikingRestButton} >Reset</button>
                <h1 className='thumbnails' >|</h1>
                <a href='https://www.geektrust.in/dashboard' className='thumbnails' >Geek Trust Home</a>
        </div>
    </nav>
)}

export default Header