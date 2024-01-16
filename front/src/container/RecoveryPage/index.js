import BackButton from "../../component/back-button";
import "./index.css";

// RecoveryPage.js
import { Component } from 'react';
// import Form from '../../script/'

class RecoveryPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      disabled: false,
    };
  }

  handleChange = (e) => {
    this.setState({ email: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const { email, disabled } = this.state;

    const validateAll = (FIELD_NAME) => {
      Object.values(FIELD_NAME).forEach((name) => {
        const error = this.validate(name, this.value[name]);

        if (error) {
          this.setError(name, error);
        }
      });
    };

    if (disabled === true) {
      validateAll(this.FIELD_NAME);
    } else {
      this.setAlert('progress', 'Завантаження...');

      try {
        const res = await fetch('http://localhost:4000/recovery', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: this.convertData(),
        });

        const data = await res.json();

        if (res.ok) {
          this.setAlert('success', data.message);
          window.location.assign('http://localhost:3000/recovery-confirm');
        } else {
          this.setAlert('error', data.message);
        }
      } catch (error) {
        this.setAlert('error', error.message);
      }
    }

    console.log('Recovery email submitted:', email);
  };

  setAlert(type, message) {
    // Реалізуйте логіку відображення алерту
    console.log(`${type}: ${message}`);
  }

	
	convertData() {    
    return JSON.stringify({ email: this.state.email });
  }

  render() {
    const { email } = this.state;

    return (
      <div className="recovery__page">
        <div className="recovery__top">
          <BackButton />

          <div className="recovery__bord">
            <h2 className="recovery__title">Recover password</h2>
            <p className="recovery__description">Choose a recovery method</p>
          </div>
        </div>

        
        <form onSubmit={this.handleSubmit}>
					
          <label className="recovery__email">
            <p className="recovery__text">Email:</p>
            
            <input
              className="recovery__layout recovery__input--email"
              type="email"
              value={email}
              onChange={this.handleChange}
            />
          </label>

          <br />
          
          <button
            className="recovery__button recovery__button--text"
            type="submit"
            disabled={this.state.disabled}
          >
            Send code
          </button>
        </form>
      </div>
    );
  }
}

export default RecoveryPage;





