import "./index.css";

// SendPage.js
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

import BackButton from "../../component/back-button";

const SendPage = () => {

	const [email, setEmail] = useState('');
	const [amountSend, setAmountSend] = useState('');

	const navigate = useNavigate()


	const handleUsernameChange = (e) => {
    setEmail(e.target.value);
  };

	const handleAmountChange = (e) => {
    setAmountSend(e.target.value);
  };


	const handleSubmit = async() => {
    try {
			const session = window.session
			const res = await fetch('http://localhost:4000/balance', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ amountSend, session, type: 'Send', email }),
			});

			const data = await res.json()
			


			if(res.ok) {
				window.location.assign(data.redirectUrl)
			} else {
        console.error('Failed to receive amount:', data.message, 'path: front/component/receive.41');
			}
			
		} catch(err) {
			console.log(err)
		}
  };

  return (
    <div className='send__page'>

      <div className="send__top">        
        <div className="send__bord">
					<BackButton />
					<h2 className="send__title">Send</h2>
					<div></div>
        </div>
      </div>

		  <form onSubmit={handleSubmit}>
        <div className='send__block'>
          <label className="send__item">
            <p className="send__text">Email</p>
            <input
              className="send__input"
              type="email"
              value={email}
              onChange={handleUsernameChange}
              required
            />
          </label>

          <label className="send__item">
            <p className="send__text">Sum</p>
            <input
              className="send__input"
              type="number"
              value={amountSend}
              onChange={handleAmountChange}
              required
            />            
          </label>
					
          <button type="submit" className="send__button send__button--text">Send</button>
        </div>
      </form>
    </div>
  );
};

export default SendPage;
