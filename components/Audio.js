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
import Category from './Category'

// 合适的降噪效果好的耳机，一些舒缓的背景环境音隔绝办公室杂音。
//我一直听的有
//soundrown  里面有海浪，下雨，咖啡厅之类的场景音效，立体音，品质非常好。
//Rainy Mood  这个里面有高品质立体音下雨音效。
//耳朵去旅行 里面音效非常多，还可自由组合播放。
//我一般撸代码时听上面的那些和缓的环境音，debug时听摇滚..

var NATURE_ID = 1 ;
var MUSIC_ID = 2 ;
var PIANO_ID = 3 ;
var GUQIN_ID = 4 ;
var SAKESI_ID = 5 ;
var GUITA_ID = 6 ;
var PLACE_ID = 7 ;
var TRANSPORTATION_ID = 8 ;

var g_conf = [
  { id: NATURE_ID, name: '自然', sub_id: [], sounds: []},
  { id: MUSIC_ID, name: '音乐', sub_id: [PIANO_ID, GUQIN_ID, SAKESI_ID, GUITA_ID], sounds: []},
  { id: PIANO_ID, name: '钢琴', sub_id: [], sounds: [], enable_random: true},
  { id: GUQIN_ID, name: '古琴', sub_id: [], sounds: []},
  { id: SAKESI_ID, name: '萨克斯', sub_id: [], sounds: []},
  { id: GUITA_ID, name: '吉他', sub_id: [], sounds: []},
  { id: PLACE_ID, name: '地方', sub_id: [], sounds: []},
  { id: TRANSPORTATION_ID, name: '交通工具', sub_id: [], sounds: []},
]

var g_source = [
  {id : 1, name : '山居吟', url:'yinxiao/山居吟-龚一.mp3', tag:[GUQIN_ID]},
  {id : 2, name : '第101次约会', url:'yinxiao/第101次约会.mp3', tag: [PIANO_ID]},
  {id : 3, name : '夜的钢琴曲1', url:'yinxiao/夜的钢琴曲1.mp3', tag: [PIANO_ID]},
  {id : 4, name : '夜的钢琴曲2', url:'yinxiao/夜的钢琴曲2.mp3', tag: [PIANO_ID]},
  {id : 5, name : '夜的钢琴曲3', url:'yinxiao/夜的钢琴曲3.mp3', tag: [PIANO_ID]},
  {id : 6, name : '夜的钢琴曲4', url:'yinxiao/夜的钢琴曲4.mp3', tag: [PIANO_ID]},
  {id : 7, name : '夜的钢琴曲5', url:'yinxiao/夜的钢琴曲5.mp3', tag: [PIANO_ID]},
  {id : 8, name : '夜的钢琴曲6', url:'yinxiao/夜的钢琴曲6.mp3', tag: [PIANO_ID]},
  {id : 9, name : '夜的钢琴曲7', url:'yinxiao/夜的钢琴曲7.mp3', tag: [PIANO_ID]},
  {id : 10, name : '夜的钢琴曲8', url:'yinxiao/夜的钢琴曲8.mp3', tag: [PIANO_ID]},
  {id : 11, name : '夜的钢琴曲9', url:'yinxiao/夜的钢琴曲9.mp3', tag: [PIANO_ID]},
  {id : 12, name : '夜的钢琴曲10', url:'yinxiao/夜的钢琴曲10.mp3', tag: [PIANO_ID]},
  {id : 13, name : '午夜的萨克斯', url:'yinxiao/午夜的萨克斯.mp3', tag: [SAKESI_ID]},
  {id : 14, name:'Midnight-Blues', url:'yinxiao/Midnight-Blues.mp3', tag: [GUITA_ID]},


  {id: 14, name:'柔和海浪', url:'yinxiao/柔和海浪.mp3', tag: [NATURE_ID]},
  {id: 15, name:'篝火声', url:'yinxiao/篝火声.wav', tag: [NATURE_ID]},
  {id: 16, name:'午夜虫鸣', url:'yinxiao/午夜虫鸣.mp3', tag: [NATURE_ID]},
  {id: 17, name: '晚上知了叫的声音', url:'yinxiao/晚上知了叫的声音.wav', tag: [NATURE_ID]},
  {id: 18, name: '下雨', url:'yinxiao/下雨.m4a', tag: [NATURE_ID]},
  {id: 19, name: '风声', url:'yinxiao/风声.WAV', tag: [NATURE_ID]},
  {id: 20, name: '鸟叫', url:'yinxiao/鸟叫.mp3', tag: [NATURE_ID]},
  {id: 21, name:'鸟叫2', url:'yinxiao/bird_chirping.mp3', tag: [NATURE_ID]},
  {id: 22, name:'海水加海鸥的声音',url:'yinxiao/海水加海鸥的声音.wav', tag: [NATURE_ID]},
  {id: 23, name:'沙滩海鸥',url:'yinxiao/沙滩海鸥.mp3', tag: [NATURE_ID]},

  
  {id: 23, name:'早晨6点的公交车站', url:'yinxiao/早晨6点的公交车站.wav', tag: [PLACE_ID]},
  {id: 24, name:'咖啡厅', url:'yinxiao/咖啡厅.mp3', tag: [PLACE_ID]},
  {id: 25, name:'寺庙念经', url:'yinxiao/和尚念经的声音.wav', tag: [PLACE_ID]},
  {id: 27, name:'西藏念经',url:'yinxiao/西藏念经.wav', tag: [PLACE_ID]},
  
  {id: 26, name:'火车车厢', url:'yinxiao/火车车厢.mp3', tag: [TRANSPORTATION_ID]},
  {id: 27, name:'火车经过', url:'yinxiao/火车经过.wav', tag: [TRANSPORTATION_ID], interval: 60},
  {id: 28, name:'轮船汽笛声', url:'yinxiao/轮船汽笛声.mp3', tag: [TRANSPORTATION_ID], interval: 60},

]



// var NATURE_TAG = {id: 1, name:} ;
// var MUSIC_TAG = {id: 2, name:'音乐'} ;
// var PIANO_TAG = {id: 3, name: '钢琴'} ;
// var GUQIN_TAG = {id: 4, name: '古琴'} ;
// var SAKESI_TAG = {id: 5, name: '萨克斯'} ;
// var GUITA_TAG = {id: 6, name: '吉他'} ;
// var PLACE_TAG = {id: 7, name: '地方'} ;
// var TRANSPORTATION_TAG = {id: 8, name: '交通工具'} ;



// var g_category = [] ;
// g_category[NATURE_TAG.id] = {} [] ;
// g_category[MUSIC_TAG.id] = [PIANO_TAG.id, GUQIN_TAG.id, SAKESI_TAG.id, GUITA_TAG.id] ;
// g_category[PLACE_TAG.id] = [] ;
// g_category[TRANSPORTATION_TAG.id] = [] ;





export default class extends Component {
    constructor(props) {
        super(props) ;

        var g_category = [] ;
        g_conf.forEach(v => g_category[v.id]=v) ;

        g_category.forEach(function(v, idx) {
            v.sub_id.forEach(vv => g_category[vv].inner = true) ;
            v.children = v.sub_id.map(vv => g_category[vv]) ;
        }) ;

        var g_outmost = g_category.filter(v => v.inner != true) ;

        g_source.forEach(function(v) {
          v.tag.forEach(vv => g_category[vv].sounds.push(v)) ;
        })
        
        console.log(g_category) ;

        this.state = {
          outmost_category : g_outmost,          
        }
    }

    

    componentDidMount() {
      
    }

    componentWillUnmount() {
      
    }



    render () { 
            let t = {children : this.state.outmost_category , id : 0} ;            

            return (
                <div>                    
                    <hr />
                    <Category id={0} children={this.state.outmost_category} sounds={[]} />
                </div>                
                )
    }
}
