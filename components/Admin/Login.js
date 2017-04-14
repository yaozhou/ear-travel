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
import Col from 'react-bootstrap/lib/Col'
import Well from 'react-bootstrap/lib/Well'
import { query, store } from '../state'

export default class extends Component {
    constructor(props) {
        super(props) ;

        this.state = {
        }
    }

    login() {
        let username = this.username_input.value.trim() ;
        let password = this.password_input.value.trim() ;

        console.log(`username: ${username} password : ${password}`) ;
        if (username == "" || password == "") {
            alert('账号或密码不能为空') ; return ;
        }

        query('/api/admin/login', {username : username, password : password}).then(function(ret) {            
            if (ret.code == 0)
                
                 window.location.href=ret.to ;
             else 
                alert('账号或密码错误') ;
        }) ;
    }

    render () {        
            return (
                <div>
                  <Col sm={9} />
                  <Col />
                  <Well>
                    <Form horizontal>
                    <FormGroup controlId="formHorizontalEmail">
                      <Col componentClass={ControlLabel} sm={3}>
                        账号
                      </Col>
                      <Col sm={9}>
                        <FormControl inputRef={ref => this.username_input = ref} type="text" placeholder="" />
                      </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalPassword">
                      <Col componentClass={ControlLabel} sm={3}>
                         密码
                      </Col>
                      <Col sm={9}>
                        <FormControl inputRef={ref => this.password_input = ref} type="password" placeholder="" />
                      </Col>
                    </FormGroup>

                    <FormGroup>
                      <Col smOffset={3} sm={9}>
                        <Button type="submit" onClick={this.login.bind(this)}>
                          登陆
                        </Button>
                      </Col>
                    </FormGroup>
                  </Form>                              
                  </Well>
                  </div>
                )

    }
}
