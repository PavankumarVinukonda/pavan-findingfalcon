import {BrowserRouter,Switch, Route} from 'react-router-dom'

import Home from './components/Home'
import Intro from './components/intro';
import NotFound from "./components/Notfound"
import './App.css';

const App = () =>( 

    <BrowserRouter>
    <Switch>
    <Route exact path="/" component={Intro} />
    <Route exact path="/game" component={Home} />       
    <Route component={NotFound} />    
    </Switch>
    </BrowserRouter>
    )


export default App;
