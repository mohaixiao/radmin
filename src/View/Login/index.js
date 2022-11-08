import React, { Component } from 'react'
import TextValidator from '../../Components/TextValidator'
import { ValidatorForm } from 'react-form-validator-core';
import { Link } from 'react-router-dom'
import { message } from 'antd';

import { SaveLoginUserInfo, SaveLogoinToken } from '../../Common/Auth'
import { urlParamsToObject } from '../../Common/Helper'
import service from '../../Service';

import './login.scss'

export default class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      username: '18911112222',
      password: 'aicoder.com',
      code: '22222'
    }
  }

  // input受控绑定
  handleChange = (e) => {
    let newState = { [e.target.name]: e.target.value }
    this.setState(state => ({ ...state, ...newState }))
  }

  changeCode = (e) => {
    e.target.src = '/api/code?id=' + Date.now();
  }

  // 登录框label字体跳动
  componentDidMount() {
    const labels = document.querySelectorAll('.form-control label')

    labels.forEach(label => (
      label.innerHTML = label.innerText.split('')
        .map((letter, index) => `<span style="transition-delay:${index * 50}ms">${letter}</span>`)
        .join('')
    ))
  }

  handleSubmit = () => {
    let { history, location } = this.props;
    service.userLogin(this.state)
      .then(res => {
        if (res.data.code === 1) {
          // 保存用户登录信息
          SaveLoginUserInfo(res.data.user);
          // 保存token
          SaveLogoinToken(res.data.token)
          // 跳转到请求页面
          let url = '/home';
          // 判断当前请求地址是否有preurl
          if (location.search) {
            let params = urlParamsToObject(location.search);
            if (params && params.preurl) {
              url = params.preurl;
            }
          }
          console.log(url);
          history.push(url);
        } else {
          message.error('登录失败，请输入正确的用户名密码！')
        }
      })
  }



  render() {
    return (
      <div className='login'>
        <div className='top'>
          <div className='container'>
            <div className='logo-wrap'>
              <Link className="logo" to='/'></Link>
            </div>
          </div>
        </div>
        <div className='main-center'>
          <h1>Please Login</h1>
          <ValidatorForm
            onSubmit={this.handleSubmit}
          >
            <div className='form-control'>
              {/* <input name="username" value={this.state.username} onChange={this.handleChange} type="text" required /> */}
              <TextValidator
                className='input'
                name="username"
                value={this.state.username}
                onChange={this.handleChange}
                type="text"
                required
                validators={['required', 'matchRegexp:[0-9a-zA-Z]{6,12}']}
                errorMessages={['*密码是必填项！', '*请输入6-12位']}
              ></TextValidator>
              <label>Phone</label>
            </div>
            <div className='form-control'>
              {/* <input name='password' value={this.state.password} onChange={this.handleChange} type="password" required /> */}
              <TextValidator
                name='password'
                value={this.state.password}
                onChange={this.handleChange}
                type="password"
                required
                validators={['required', 'matchRegexp:[0-9a-zA-Z.]{6,20}']}
                errorMessages={['*密码是必填项！', '*请输入6-20位']}
              >
              </TextValidator>
              <label>Password</label>
            </div>
            <div className='form-control'>
              {/* <input name='code' value={this.state.code} onChange={this.handleChange} type="text" required /> */}
              <TextValidator
                name='code'
                value={this.state.code}
                onChange={this.handleChange}
                type="text"
                required
                validators={['required', 'matchRegexp:[0-9a-zA-Z]{5}']}
                errorMessages={['*验证码是必填项！', '*请输入5位']}
              >
              </TextValidator>
              <label>Code</label>
              <div className='code-img'>
                <img onClick={this.changeCode} src="/api/code" alt="" />
              </div>
            </div>
            <button class="btn" onClick={this.handleSubmit}>Login</button>
            <p class="text">Forget Password?<a href="#"> Find password</a></p>
          </ValidatorForm>
        </div>
        <div className="main-footer">
          Copyright © 2022 mohaixiao All Rights Reserved.
        </div>
      </div>
    )
  }
}


