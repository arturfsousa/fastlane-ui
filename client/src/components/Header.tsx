import React from 'react'
import { Button, Input, Icon } from 'antd'
import { Link } from '@reach/router'

import logo from '../fastlane.svg'
import './Header.css'

const Header = () => (
  <header className="FastlaneUI-Header">
    <div className="FastlaneUI-Header__Logo">
      <Link to="/">
        <img
          src={logo}
          className="FastlaneUI-Header__Logo__Img"
          alt="Fastlane logo"
        />
      </Link>
    </div>
    <nav className="FastlaneUI-Header__Nav">
      <div className="FastlaneUI-Header__Nav__Search">
        <Input
          size="large"
          suffix={<Icon type="search" className="certain-category-icon" />}
        />
      </div>
      <div className="FastlaneUI-Header__Nav__Actions">
        <Button type="primary" size="large">
          <Link to="/enqueue">Enqueue new job</Link>
        </Button>
      </div>
    </nav>
  </header>
)

export default Header
