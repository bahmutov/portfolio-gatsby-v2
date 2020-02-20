import React from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'

import Posts from '../components/posts'

export const query = graphql`
  query WorkshopPage {
    mdx(frontmatter: { name: { eq: "workshop" } } ) {
      frontmatter {
        name
        title
      }
    }

    allMdx(
      sort: { order: DESC, fields: [frontmatter___meta___date]},
      filter: {
        fields: {contentType: { eq: "workshop" }},
        frontmatter: { options: { published: { eq: true } } }
      },
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            meta {
              excerpt
              date
              categories
              tags
            }
          }
        }
      }
    }
  }
`

const WorkshopPage = (props) => {
  return (
    <main>
      <h1>workshop</h1>
      <Posts posts={props.data.allMdx.edges} />
    </main>
  )
}

WorkshopPage.propTypes = {
  data: PropTypes.object.isRequired
}

export default WorkshopPage
