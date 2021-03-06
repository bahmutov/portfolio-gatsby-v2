import CMS from 'netlify-cms-app'

// collection field partials
import { pages } from './fields/pages'
import { blog } from './fields/blog'

// editor components
import clearfix from './editor/clearfix'
import embed from './editor/embed'
import image from './editor/image'

// editor components
CMS.registerEditorComponent(clearfix)
CMS.registerEditorComponent(embed)
CMS.registerEditorComponent(image)

CMS.init({
  config: {
    site_url: 'https://ryanfiller.com',
    load_config_file: false,
    publish_mode: 'editorial_workflow',
    backend: {
      name: 'git-gateway',
      identity_url: 'https://www.ryanfiller.com/.netlify/identity',
      gateway_url: 'https://www.ryanfiller.com/.netlify/git/github',
      repo: 'ryanfiller/portfolio-gatsby-v2',
      branch: 'master',
      squash_merges: true,
      use_large_media_transforms_in_media_library: true
    },
    media_folder: 'static/images/uploads',
    public_folder: '/images/uploads',
    collections: [
      pages,
      blog
    ]
  }
})
