import React from 'react'

const Filter = ({ heading, value, onChange }) => {
    return (
        <div>
            {heading}
            <input 
            value = {value}
            onChange = {onChange}
            />
        </div>
    )
  }


export default Filter