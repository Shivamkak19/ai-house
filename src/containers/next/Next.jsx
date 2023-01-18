import React from 'react'
import { Circle } from '../../components'

import './next.css'

const Next = () => {
  return (
    <div className="site__next section__margin" id="next">
      <div className="site__next-heading">
        <h1 className="gradient__text2"> What we have planned </h1>
      </div>
      <div className="site__next-container">
        <Circle text="Kickoff 2022-2023" description="Our first kickoff event for new members and the class of 2026!" colorText='#fff' colorBG='#D35400' />
        <Circle text="AI Tiger Trek" description="Want to meet AI leaders in industry, research, and entrepreneurship? AI Tiger Trek is just for you!" colorText='#fff' colorBG='#B03A2E' />
        <Circle text="AI Course Guide" description="A guide to courses and resources at Princeton focused on AI." colorText='#fff' colorBG='#2E86C1' />
        <Circle text="Speaker Series" description="We're aiming to invite professors, engineers, and other experts in AI to come talk and give opportunities." colorText='#fff' colorBG='#1E8449' />
      </div>
    </div>
  )
}

export default Next