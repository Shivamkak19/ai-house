import React from 'react'
import './circle.css'

const Circle = ({ text, description, colorText, colorBG }) => {
    return (
        <div>
            <div className="site__circles-container__circle" style={{ backgroundColor: colorBG }}>
                <center>
                    <p>
                        <font color={colorText}>
                            {text}
                        </font>
                    </p>
                </center>
            </div >
            <p className="site__circles-description">
                <center>
                    <font color={colorText}>
                        {description}
                    </font>
                </center>
            </p>
        </div>
    )
}

export default Circle