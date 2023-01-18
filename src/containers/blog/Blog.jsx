import React from 'react'
import { Article } from '../../components'
import './blog.css'

const Blog = () => {
  return (
    <div className="site__blog section__padding" id="blog">
      <div className="site__blog-heading">
        <h1 className="gradient__text">Check out our blog posts...</h1>
      </div>
      <div className="site__blog-container">
        <div className="site__blog-container-groupA">
          <Article imgUrl={1}  date="" title=""/>
        </div>
        <div className="site__blog-container-groupB">
          <Article imgUrl={1} date="" title=""/>
          <Article imgUrl={1} date="" title=""/>
          <Article imgUrl={1} date="" title=""/>
          <Article imgUrl={1} date="" title=""/>
        </div>
      </div>
    </div>
  )
}

export default Blog