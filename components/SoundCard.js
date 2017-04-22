import React, { Component } from 'react' ;
import Image from 'react-bootstrap/lib/Image'
import Button from 'react-bootstrap/lib/Button'
import { store, query } from './state'
import Panel from 'react-bootstrap/lib/Panel'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper' ;
import FlatButton from 'material-ui/FlatButton';

const style = {
      height: 100,
      width: 400,
      margin: 40,
      textAlign: 'center',
      display: 'inline-block',
    };


export default class extends Component {
    constructor(props) {
        super(props) ;
        this.state = {

        }
    }

    on_play() {
        Object.keys(this.refs).forEach(function(v) {
                this.refs[v].addEventListener('ended', function() {                
                setTimeout(() => this.refs[v].play(), this.refs[v].getAttribute('data-interval')*1000) ;
                
            }.bind(this), false) ;
            this.refs[v].play() ;
        }.bind(this))        
    }

    on_stop() {
        Object.keys(this.refs).forEach(function(v) {
            this.refs[v].pause() ;
        }.bind(this))        
    }


    render() {
            let sound = this.props.sound ;
            let channels = sound.channels.map(function(v, idx) {
                        return (
                                
                                <audio key={idx} ref={'channel_'+idx} src={v.audio_url} 
                                        preload="none" data-interval={v.interval==null?0:v.interval}></audio>
                            )
                    }) ;

        return ( 
            <Paper style={style} zDepth={2}>
                    <Card>
                        <CardMedia>
                            <img src={sound.img_url}  />
                        </CardMedia>
                        <CardTitle title={sound.name} subtitle={sound.desc} />
                        <CardText>
                          评论内容
                        </CardText>
                        <CardActions>
                          <FlatButton label="播放" onTouchTap={this.on_play.bind(this)}/>
                          <FlatButton label="停止" onTouchTap={this.on_stop.bind(this)}/>
                        </CardActions>
                    </Card>
                    {channels}       
                    </Paper>
                    )
    }
}