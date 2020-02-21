module.exports = {
  siteMetadata: {
    title: 'ryanfiller.com',
    siteUrl: 'https://www.ryanfiller.com',
    author: '@ryanfiller_',
    headshot: 'https://www.ryanfiller.com/images/uploads/headshot_2017.jpg',
    description: 'The blog and porfolio of Ryan Filler',
    about: 'I am a designer, developer, illustrator, and maker living and working in Memphis, Tennessee. This is my blog and portfolio.'
  },

  plugins: [

    // SEO related plugins plugins
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap', 
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'ryanfiller.com',
        short_name: 'ryanfiller.com',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'static/images/gatsby-icon.png'
      }
    },

    // build related plugins
    'gatsby-plugin-netlify-cache',

    // CMS / content related plugins
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        manualInit: true,
        enableIdentityWidget: false,
        modulePath: `${__dirname}/src/cms/cms.js`
      }
    },

    // data related plugins
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/static/images`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/src/content/`
      }
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.mdx', '.md', '.markdown'],
        defaultLayouts: {
          content: require.resolve('./src/components/layout/markdown.js')
        }
        // gatsbyRemarkPlugins: [],
      }
    },

    // design / render related plugins
    'gatsby-plugin-preact',
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        cssLoaderOptions: {
          camelCase: false // to use BEM syntax
        }
      }
    },
    {
      resolve: 'gatsby-plugin-layout',
      options: {
        component: require.resolve('./src/components/layout/page')
      }
    },

    // syndication plugins
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                siteUrl
                author
                headshot
                description
                about
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.meta.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ "content:encoded": edge.node.html }],
                })
              })
            },
            query: `
              {
                allMdx(
                  limit: 25,
                  filter: {
                    fields: {contentType: { eq: "blog" }},
                    frontmatter: { options: { published: { eq: true } } }
                  },
                  sort: { order: DESC, fields: [frontmatter___meta___date]},
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
                      rawBody
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Your Site's RSS Feed",
            // optional configuration to insert feed reference in pages:
            // if `string` is used, it will be used to create RegExp and then test if pathname of
            // current page satisfied this regular expression;
            // if not provided or `undefined`, all pages will have feed reference inserted
            match: "^/blog/",
            // optional configuration to specify external rss feed, such as feedburner
            link: "https://feeds.feedburner.com/gatsby/blog",
          },
        ],
      },
    },
  ]
}
