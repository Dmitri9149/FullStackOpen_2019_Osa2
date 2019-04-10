import React from 'react'

const Filter = ({ heading, value, onChange, filteringWarning}) => {
    
    return (
        <div>
            {heading}
            <input 
            value = {value}
            onChange = {onChange}
            />
            <div>
                {filteringWarning}
            </div>

        </div>
    )
  }


export default Filter