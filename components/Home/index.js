import {Component} from 'react'
import Loader from "react-loader-spinner";
import './index.css'
import Header from '../Header'

const apiStatusConstants = {
    initial:'INITIAL',
    success:'SUCCESS',
    failure:'FAILURE',
    inProgress: 'INPROGRESS',
    fetchFailure:'FETCHFAILURE'
}

class Home extends Component {
    state = {
        apiStaus:apiStatusConstants.initial,
        planetsList:[],
        destination1:'Select',
        destination2:'Select',
        destination3:'Select',
        destination4:'Select',
        jwtToken:'',
        selectdPlanetsList:[],
        selectdVachiclsList:[],
        vachiclsList:[],
        timeTokwn:0,
        activePlanet:'',
        findedFalcon:'',      
    }

    // when the component mounts the getdata,gettoken,getvachilsapi is called
    componentDidMount() {
        this.getData()
        this.getToken()
        this.getVachiclsApi()
    }

    // api for to get the token

    getToken = async() => {
        
        const url = 'https://findfalcone.herokuapp.com/token'
        const options = {
            headers: { 
                Accept : 'application/json',
                'Content-Type': 'application/json' },
            method:'POST'
            
            
        }

        const response = await fetch(url,options)
        if (response.ok === true) {
        const responseData = await response.json()
        this.setState({
            jwtToken:responseData.token,
            apiStaus:apiStatusConstants.initial

        })} else {
            this.setState({
                apiStaus:apiStatusConstants.fetchFailure
            })
        }
    }

    // api to get the planets data

    getData = async () => {
        
        const url = `https://findfalcone.herokuapp.com/planets`
        const options = {
            method:'GET'
        }
        const response = await fetch(url,options)
        if (response.ok === true) {
            const planetsData = await response.json()
            
            this.setState({
                planetsList:[...planetsData]
            })
        } else {
            this.setState({
                apiStaus:apiStatusConstants.fetchFailure
            })
        }
        
        
    }

    // api to get the vachicle data

    getVachiclsApi = async () => {
        const url = `https://findfalcone.herokuapp.com/vehicles`
        const options = {
            method:'GET'
        
        }

        const response = await fetch(url,options)
        if (response.ok === true) {
        const responseData = await response.json();
        
        this.setState({
            vachiclsList:[...responseData]
        })
        } else {
            this.setState({
                apiStaus:apiStatusConstants.fetchFailure
            })
        }
    }

    // vapi to finding the falcon

    findTheFalconApi = async () => {
        const { selectdVachiclsList,selectdPlanetsList,jwtToken} = this.state
        this.setState({
            apiStaus:apiStatusConstants.inProgress
        })

        const url = "https://ﬁndfalcone.herokuapp.com/find"
        const options = {
            method:'POST',
            headers: { 
                'Accept' : 'application/json',
                'Content-Type': 'application/json' },
            
            body: JSON.stringify({
                'token':`${jwtToken}`,
                "planet_names": selectdPlanetsList,
                "vehicle_names" :selectdVachiclsList,
            })
        }
        const response = await fetch(url,options) 
            if (response.ok === true) {
            const responseData = await response.json()
            this.setState({
                findedFalcon:responseData,
                apiStaus:apiStatusConstants.success
            })
            } else {
            this.setState({
                findedFalcon:'Falcon Not Found',
                apiStaus:apiStatusConstants.failure
            })
            }
    }

    
    // for rendering the search container

    renderfalconSearchContainer = () => (
        <div className='falcon-search-container' >
            <h1 className='search-heading' >Select planets you want to search in:</h1>
        </div>
    )

    
    onChangeDestination1 =  event => {
        const {selectdPlanetsList} = this.state

        this.setState({
             destination1:event.target.value,
             selectdPlanetsList:[...selectdPlanetsList,event.target.value],
             activePlanet:event.target.value,
        })

        
    }

    onChangeDestination2 =  event => {
        const {selectdPlanetsList} = this.state
        this.setState({
             destination2:event.target.value,
             selectdPlanetsList:[...selectdPlanetsList,event.target.value],
             activePlanet:event.target.value,
        })
    }

    onChangeDestination3 =  event => {
        const {selectdPlanetsList} = this.state
        this.setState({
             destination3:event.target.value,
             selectdPlanetsList:[...selectdPlanetsList,event.target.value],
             activePlanet:event.target.value,
        })
    }

    onChangeDestination4 =  event => {
        const {selectdPlanetsList} = this.state
        console.log(selectdPlanetsList)
        this.setState({
             destination4:event.target.value,
             selectdPlanetsList:[...selectdPlanetsList,event.target.value],
             activePlanet:event.target.value,
        })
    }

    // event handeler to update the vachile data
    onChange = event => {

        
        const {planetsList, vachiclsList,activePlanet, selectdVachiclsList, timeTokwn}= this.state
        const newList = vachiclsList
        const vachileFilteredList = vachiclsList.filter(item => item.name === event.target.value )
        const planetFilteredList = planetsList.filter(item => item.name === activePlanet)
        
        if ((vachileFilteredList[0].max_distance) >= (planetFilteredList[0].distance)) {
            this.setState(prvState => ({
                timeTokwn: event.target.checked ? (prvState.timeTokwn + 50) : (prvState.timeTokwn - 50)
            })) 
            const modifiedVachileList = newList.map(item => item.name === event.target.value ?  
                (event.target.checked ? 
                ({
                name:item.name,
                total_no : item.total_no -1,
                speed:item.speed,
                max_distance:item.max_distance,
            }) : ({
                name:item.name,
                total_no : item.total_no +1,
                speed:item.speed,
                max_distance:item.max_distance,
            }))  :item)

            this.setState({
                vachiclsList:modifiedVachileList,
                selectdVachiclsList:[...selectdVachiclsList,event.target.value]
            })
        } else {
            event.target.checked = false
        }

        
        
        //console.log(modifiedVachileList)
        

        //console.log(selectdVachiclsList)
       
    }

    // this render the destination container
    renderDestinationContainer = () => {
        const { timeTokwn, planetList, vachiclsList, planetsList,destination1,destination2,destination3,destination4} = this.state
        //console.log(planetList)
        const destination1active = destination1 === 'Select'
        const destination2active = destination2 === 'Select'
        const destination3active = destination3 === 'Select'
        const destination4active = destination4 === 'Select'
        
        return(
        <div className='destination-container' >
             {/* desination 1 */}
                <div className='destination-cont-sub-cont' >
                        <h1 className='destination' >Destination 1</h1>
                        <select value={destination1}  className='select-dropdown' onChange={this.onChangeDestination1} >
                            <option value='Select' >Select</option>
                            {
                                planetsList.map(item => <option value={item.name} >{item.name}</option>)
                            }
                            
                            
                        </select>
                        {
                            destination1active ? null : (<ul className='vachils-container' > 
                                {
                                    vachiclsList.map(item => <li className='vachicle'>
                                         <input  value={item.name} onChange={this.onChange}  type='checkBox' className='checkbox' id="vachicleInput"  />
                                     <label htmlFor='vachicleInput' className='label-for-vachile-input'>{item.name} (<span>{item.total_no}</span>) </label>   
                                   
                                    
                                </li>)
                                }
                                
                             </ul>) 
                        }
                        
                        
                </div>

                {/* destination 2 */}

                <div className='destination-cont-sub-cont' >
                        <h1 className='destination' >Destination 2</h1>
                        <select value={destination2}   className='select-dropdown' onChange={this.onChangeDestination2} > 
                            <option value='Select' >Select</option>
                            {
                                planetsList.map(item => <option value={item.name} >{item.name}</option>)
                            }
                        </select>
                        {
                            destination2active ? null : (<ul className='vachils-container' > 
                                {
                                    vachiclsList.map(item => <li className='vachicle'>
                                         <input  value={item.name} onChange={this.onChange}  type='checkBox' className='checkbox' id="vachicleInput"  />
                                     <label htmlFor='vachicleInput' className='label-for-vachile-input'>{item.name} (<span>{item.total_no}</span>) </label>   
                                   
                                    
                                </li>)
                                }
                                
                             </ul>) 
                        }
                        
                </div>
                {/* destination 3 */}
                <div className='destination-cont-sub-cont' >
                        <h1 className='destination' >Destination 3</h1>
                        <select value={destination3} className='select-dropdown' onChange={this.onChangeDestination3} >
                            <option value='Select' >Select</option>
                            {
                                planetsList.map(item => <option value={item.name} >{item.name}</option>)
                            }
                            
                        </select>
                        {
                            destination3active ? null : (<ul className='vachils-container' > 
                                {
                                    vachiclsList.map(item => <li className='vachicle'>
                                         <input  value={item.name} onChange={this.onChange}  type='checkBox' className='checkbox' id="vachicleInput"  />
                                     <label htmlFor='vachicleInput' className='label-for-vachile-input'>{item.name} (<span>{item.total_no}</span>) </label>   
                                   
                                    
                                </li>)
                                }
                                
                             </ul>) 
                        }
                        
                        
                </div>
                {/* destination 4 */}
                <div className='destination-cont-sub-cont' >
                        <h1 className='destination' >Destination 4</h1>
                        <select value={destination4} className='select-dropdown' onChange={this.onChangeDestination4} >
                            <option value='Select' >Select</option>
                            {
                                planetsList.map(item => <option value={item.name} >{item.name}</option>)
                            }
                            
                        </select>
                        {
                            destination4active ? null : (<ul className='vachils-container' > 
                                {
                                    vachiclsList.map(item => <li className='vachicle'>
                                         <input  value={item.name} onChange={this.onChange}  type='checkBox' className='checkbox' id="vachicleInput"  />
                                     <label htmlFor='vachicleInput' className='label-for-vachile-input'>{item.name} (<span>{item.total_no}</span>) </label>   
                                   
                                    
                                </li>)
                                }
                                
                             </ul>) 
                        }
                        
                        
                </div>
                <h1 className='time-token' >Time token:<span>{timeTokwn}</span></h1>
        </div>
    )}

    // this funtion triggers the reset button clicks

    onClickReset = () => {
        
        window.location.reload()


    }

    // if the finding falcon api success this will be rendered

    onSuccesfullResponse = () =>{ 
        const {findedFalcon} = this.state
        return (
        <div className='success-response-container' >
            <h1 className='success-message' >Success! Congratulations on Finding Falcon. King Shan is Mighty Pleased</h1>
            <h1 className='time' >Time taken: 200</h1>
            <h1 className='planet' >Planet Found : <span>{findedFalcon.planet_name}</span></h1>
            <button type='button' className='statrt-again-button' onClick={this.onClickReset} >Start Again</button>
        </div>
        )
    }

    // if the api is fetching the loader will be displayed

    renderLoader = () => (
        <div className='loader-bg' >
                <Loader type='TailSpin' height={50} width={50} />
        </div>
    )
    
    // this renders the search container

    renderSearchContainer =() => (
        <div className='container' >
                {this.renderfalconSearchContainer()}
                {this.renderDestinationContainer()}

                <button className='find-falcon' type='button' onClick={this.findTheFalconApi} >
                    Find falcon
                </button>
                <div className='rules-container' >
                    <h1 className='rule'>Rules:</h1>
                    <img src="https://res.cloudinary.com/dvcurljig/image/upload/v1641345563/falcon/Screenshot_407_hqkcph.png" alt="rules" className='rules-img' />
                </div>
         </div>
    )

    // this renders the failure container when finding falcon api failures

    renderFailure = () => {
        const {findedFalcon} = this.state
        return (
            <div className='failure-view-container' >
                <h1 className='failure-text' >The Falcon is not Found</h1>
                <button type='button' onClick={this.onClickReset} className='reset-button' >PlayAgain</button>
            </div>
        )
    }

    // if the vachicle and planets api fails this render will be called
    rederFetchFail = () => (
        <div className='fetch-fail-container' >
                <h1 className='fail-heading' >Network Error</h1>
                <button type='button' onClick={this.onClickReset} className='reset-button' >Retry</button>
        </div>
    )
    
    // this render the data based on the condition using switch statement
    renderAll = () => {
        const {apiStaus} = this.state

        switch (apiStaus) {
            case apiStatusConstants.initial:
                return this.renderSearchContainer();
            case apiStatusConstants.inProgress:
                return this.renderLoader();
            case apiStatusConstants.success:
                return this.onSuccesfullResponse();
            case apiStatusConstants.failure:
                return this.renderFailure();
            case apiStatusConstants.fetchFailure:
                return this.fetchFailure();
            default:
                return null;
                
        }
    }

    render() {

        return (
            <div className='home-page-bg' >
                <Header onClickReset = {this.onClickReset} />
                {this.renderAll()}
            </div>
        )
    }
}

export default Home