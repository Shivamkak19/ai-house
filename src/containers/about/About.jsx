import React from 'react'
import { Feature } from '../../components'

import './about.css'

const About = () => {
  return (
    <div className="site__about section__margin" id="about">
      <div className="site__about-heading">
        <h1 className="gradient__text2"> What we do @ Princeton </h1>
      </div>
      <div className="site__about-container">
        <Feature title="Reading Groups" text="We host weekly reading groups where we present and discuss new or interesting papers. " />
        <Feature title="Guest Speakers" text="We host professors and industry speakers to talk about their research/work in AI. " />
        <Feature title="Social Events" text="Get to know some other members of the undergraduate Princeton AI community during our social events! " />
        <Feature title="Resources" text="We have a plethora of shared resources to get you started in applying AI. " />
        <Feature title="Opportunities" text="We plan to provide opportunities to work with professors and companies on AI." />
        <Feature title="Guides" text="We will soon provide detailed guides of AI coursework at Princeton written by past students!" />
        <Feature title="Office Hours" text="We are partnered with the COS department to help streamline the process of getting introduced to AI professors at Princeton." />
      </div>
    </div>
  )
}

export default About