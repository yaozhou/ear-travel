import React, { Component } from 'react' ;
import Image from 'react-bootstrap/lib/Image'
import Button from 'react-bootstrap/lib/Button'
import { store, query } from './state'
import Panel from 'react-bootstrap/lib/Panel'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper' ;
import FlatButton from 'material-ui/FlatButton';
import SoundCard from './SoundCard'

const style = {
      height: 100,
      width: 400,
      margin: 20,
      textAlign: 'center',
      display: 'inline-block',
    };

var sounds = [
    {
        id : 1,
        name: '海边古琴',
        desc : '在海边的礁石上，为你弹奏一曲，天高云淡',
        img_url : '/img/guqin.jpg',
        channels : [
            {id : 1, name : '山居吟-龚一', audio_url : '/yinxiao/山居吟-龚一.mp3'},
            {id : 2, name : '柔和海浪', audio_url : '/yinxiao/柔和海浪.mp3'},
        ]
    },
    {
        id : 1,
        name: '海边古琴2',
        desc : '在海边的礁石上，为你弹奏一曲，天高云淡2',
        img_url : '/img/guqin.jpg',
        channels : [
            {id : 1, name : '山居吟-龚一', audio_url : '/yinxiao/山居吟-龚一.mp3'},
            {id : 2, name : '柔和海浪', audio_url : '/yinxiao/柔和海浪.mp3'},
        ]
    },

] ;

export default class extends Component {
    constructor(props) {
        super(props) ;
        this.state = {

        }
    }

    componentDidMount() {
        query('/api/sounds_all', {}).then(function(ret) {
            console.log(ret) ;
        })
    }

    render() {

        var cards = sounds.map(function(v, idx) {
            return (
                    <SoundCard key={idx} sound={v} />
                )
        })

        return ( <div>
                    {cards}
                </div>)
    }
}