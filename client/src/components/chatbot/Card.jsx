import React from 'react'

const Card = (props) => (
    <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'left' }}>
      <div className="card blue-grey darken-1">
        <div className="card-content white-text">
          <span className="card-title">{ props.payload.fields.header.stringValue }</span>
          <p>{ props.payload.fields.description.stringValue  }</p>
        </div>
        <div className="card-action">
          <a target="_blank" rel="noopener noreferer" href={ props.payload.fields.link.stringValue } >Learn more</a>
        </div>
      </div>
    </div>
  );
  
  export default Card;