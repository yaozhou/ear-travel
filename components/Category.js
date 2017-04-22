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

		this.state = {
			random_play : false			
		}
	}

	defaultEndedListener(audio) {
      if (this.state.random_play) return ;
    
      audio.getAttribute('data-interval') == 0 ? audio.play() : 
      	setTimeout(() => audio.play(), audio.getAttribute('data-interval') * 1000) ;
    }

    randomEndedListener() {
      if (!this.state.random_play) return ;

      let idx = Math.floor(Math.random() * this.props.sounds.length) ;
      this.refs['audio_' + this.props.sounds[idx].id].play() ;
    }

	componentDidMount() {
		this.props.sounds.forEach(function(v) {
			this.refs['audio_' + v.id].addEventListener('ended', 
          		() => this.defaultEndedListener(this.refs['audio_' + v.id]), false) ;

        	this.refs['audio_' + v.id].addEventListener('ended', 
          		() => this.randomEndedListener(), false) ;
		}.bind(this))
	}

	category_play() {
      this.props.sounds.forEach(function(v) {
        this.refs['audio_' + v.id].pause() ;
      }.bind(this))
      //this.setState({random_play : true}) ;
      this.state.random_play = true ;
      this.randomEndedListener() ;
    }

    category_stop() {
      //this.setState({random_play : false}) ;
      this.state.random_play = false ;
      this.props.sounds.forEach(function(v) {
        this.refs['audio_' + v.id].pause() ;
      }.bind(this))
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


        return (
        		<div>
        		{audios}
        		{this.props.enable_random ? 
            	<Button onClick={this.category_play.bind(this)}>随机播放</Button> :	null }

            	{this.props.enable_random ? 
            	<Button onClick={this.category_stop.bind(this)}>随机播放停止</Button> :	null }
        		</div>
        	   )
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