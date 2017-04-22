 import React, { Component }  from 'react' ;
 import Tabs from 'react-bootstrap/lib/Tabs'
 import Tab from 'react-bootstrap/lib/Tab'
 import Image from 'react-bootstrap/lib/Image'
 import Modal from 'react-bootstrap/lib/Modal'
 import Button from 'react-bootstrap/lib/Button'
 import Form from 'react-bootstrap/lib/Form'
 import FormGroup from 'react-bootstrap/lib/FormGroup'
 import FormControl from 'react-bootstrap/lib/FormControl'
 import ControlLabel from 'react-bootstrap/lib/ControlLabel'
 import Checkbox from 'react-bootstrap/lib/Checkbox'
 import Panel from 'react-bootstrap/lib/Panel'
 import Col from 'react-bootstrap/lib/Col'
 import Well from 'react-bootstrap/lib/Well'
 import { query, store } from './state'

 class Category extends Component {

	constructor(props) {
		super(props) ;

		let r = Math.floor(Math.random() * this.props.sounds.length) ;		

		this.state = {
			random_play : false,
			cur_random_sound : this.props.sounds[r],
		}
	}

	

    endListener(audio) {    	
    	audio.getAttribute('data-interval') == 0 ? audio.play() : 
      			setTimeout(() => audio.play(), audio.getAttribute('data-interval') * 1000) ;    	
    }

    play_random_sound() {
    	let idx = Math.floor(Math.random() * this.props.sounds.length) ;
    	this.setState({cur_random_sound : this.props.sounds[idx]}) ;
		setTimeout(() => this.refs['random'].play(), 1000) ;
    }

	componentDidMount() {
		this.props.sounds.forEach(function(v) {
			this.refs['audio_' + v.id].addEventListener('ended', 
          		() => this.endListener(this.refs['audio_' + v.id]), false) ;
		}.bind(this))

		if (this.refs['random'] != undefined)
			this.refs['random'].addEventListener('ended', () => this.play_random_sound(), false) ;
	}

	render() {
      
      if (this.props.children.length == 0) { // only have sounds
        let audios = this.props.sounds.map(function(v, idx) {
          return (
              <Panel key={idx} header={v.name}> 
                <audio ref={"audio_"+v.id} src={v.url} controls preload="none" 
                    data-interval={v.interval ? v.interval : 0}></audio>
              </Panel>
              )
        }) ;

		if (this.props.enable_random) {
        	audios.push(
        		<Panel key={-1} header={'随机播放: 当前(' + this.state.cur_random_sound.name + ')'}>
        		<audio ref={"random"} src={this.state.cur_random_sound.url} controls preload="none"> </audio>
        		</Panel>
        	)
    	}

        return ( <div>
        		{audios}
        		</div>)
      }
      
      // have sub category
    	let children = this.props.children.map(function(v) {
        return (
            <Tab eventKey={v.id} title={v.name} key={v.id}>
            	<Category id={v.id} name={v.name} sounds={v.sounds} children={v.children} enable_random={v.enable_random} />
            </Tab>
          )
      })

      return (<Tabs defaultActiveKey={this.props.children[0].id} animation={false} key={this.props.id} id={'' + this.props.id}>
                 {children}
            </Tabs>)
    }
}


export default Category ;