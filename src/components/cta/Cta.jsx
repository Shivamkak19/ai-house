import React from 'react'
import './cta.css'

const Cta = () => {
  return (
    <div className='site__cta' id="join">
      <div className='site__cta-content'>
        <h3 className="gradient__text"> Interested in joining AI @Princeton? Sign up for our listserv! </h3>
        <p> Send an email to <b>listserv@princeton.edu </b> from the email you want to be subscribed.
          <p> In the body of the email, type <b>SUB backprop</b>. </p>
          Make sure there is no subject/any other text in the body and then send the email.
          You should receive a response. </p>
      </div>
    </div>
  )
}

export default Cta