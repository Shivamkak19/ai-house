import React from 'react'
import { Chrono } from "react-chrono";


import data from "./data";
import './timeline.css'

const Timeline = () => {
    return (
        <div className="site__timeline site__timeline__margin" id="timeline">
            <div className="site__timeline-heading">
                <h1 className="gradient__text_timeline"> Our Timeline of Events </h1>
            </div>
            <div className="site__timeline-container">
                <div style={{ width: "850px", height: "400px" }}>
                    <Chrono
                        items={data}
                        showAllCardsHorizontal
                        theme={{
                            primary: '#2590b0',
                            secondary: '',
                            cardBgColor: '#D6EAF8',
                            cardForeColor: '#00',
                            titleColor: '#ffffff',
                            titleColorActive: '#2E86C1',
                        }}
                        activeItemIndex={3}
                        hideControls
                        disableAutoScrollOnClick
                        borderLessCards
                        useReadMore={false}
                    />
                </div>
            </div>
        </div>

    )
}

export default Timeline