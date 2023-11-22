import "./index.css";

import React from 'react';
import { Link } from 'react-router-dom';

const WelcomePage = () => {
  return (
    <div className="welcome__page">

				<div className="welcome__top">
					<div className="welcome__text">
						<h2 className="welcome__title">Hello!</h2>
						<p className="welcome__description">Welcome to bank app</p>
					</div>
					<div className="image__welcome">
						<img src="/png/money.png" alt="money" />
					</div>
				</div>

				<div>
					<div className="welcome__button--block">
						<Link to="/signup" className="welcome__button welcome__button--up">Sign Up</Link>
						<Link to="/signin" className="welcome__button welcome__button--in">Sign In</Link>
					</div>
				</div>

    </div>
  );
};

export default WelcomePage;
