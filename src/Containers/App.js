import React, { Component } from 'react';
import CardList from '../Components/CardList';
import SearchBox from '../Components/SearchBox';
import Scroll from '../Components/Scroll';
import '../Containers/App.css';


class App extends Component {
	constructor() {
		super()
		this.state = {
			robots: [],
			searchfield: ''
		}
	}

	async componentDidMount(){
		const response = await fetch('https://jsonplaceholder.typicode.com/users')
		const users = await response.json();
		this.setState({robots:users});
	}

	onSearchChange = (event) => {
		this.setState({ searchfield : event.target.value })
		
	}

	render () {
		const filteredRobots = this.state.robots.filter(robot =>{
			return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase())
		})
		if(!this.state.robots.length){
			return <h1>LOADING</h1>
		}else {
		 return (
				<div className ='tc'>
					<h1 className='f1'>RoboFriends</h1>
					<SearchBox searchChange={this.onSearchChange}/>
					<Scroll>
					  <CardList robots = {filteredRobots} />
					</Scroll>
				</div>
	        );
	     } 
	}
}

export default App;