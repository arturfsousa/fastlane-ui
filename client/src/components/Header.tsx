import React from 'react'
import { Autocomplete, Button, Icon } from '@shopify/polaris'
import { Link } from '@reach/router'

import logo from '../fastlane.svg'
import './Header.css'

const doSome = () => {}

const textField = (
  <Autocomplete.TextField
    label=""
    prefix={<Icon source="search" color="inkLighter" />}
    placeholder="Search"
    onChange={doSome}
  />
)

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
        <Autocomplete
          onSelect={doSome}
          selected={[]}
          options={[]}
          textField={textField}
        />
      </div>
      <div className="FastlaneUI-Header__Nav__Actions">
        <Link to="/enqueue">
          <Button primary={true}>Enqueue new job</Button>
        </Link>
      </div>
    </nav>
  </header>
)

export default Header
