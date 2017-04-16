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
import Tabs from 'react-bootstrap/lib/Tabs'
import Tab from 'react-bootstrap/lib/Tab'

import Audio from './Audio'

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
        img_url : '/img/jiaoshi.jpg',
        channels : [
            {id : 1, name : '山居吟-龚一', audio_url : '/yinxiao/山居吟-龚一.mp3'},
            {id : 2, name : '柔和海浪', audio_url : '/yinxiao/柔和海浪.mp3'},
        ]
    },
    {
        id : 1,
        name: '下雨天的咖啡厅',
        desc : '在咖啡厅靠窗的座位上，安静地读一本书，看着雨水打在窗玻璃上',
        img_url : '/img/boli.jpg',
        channels : [
            {id : 1, name : '下雨', audio_url : '/yinxiao/下雨.m4a'},
            {id : 2, name : '咖啡厅', audio_url : '/yinxiao/咖啡厅.mp3'},
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

        return ( <Tabs defaultActiveKey={1} animation={false} id="noanim-tab-example">
                            <Tab eventKey={1} title="场景方案">
                                    {cards}
                            </Tab>
                            <Tab eventKey={2} title="自定义">
                                    < Audio />
                            </Tab>
                    </Tabs>
                )
    }
}