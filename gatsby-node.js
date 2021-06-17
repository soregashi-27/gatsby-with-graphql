/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

/**
 * ここで1ページあたりの投稿を2つ、特定の記事の詳細が見れるようにする
 * pathを作る感じ。
 *
 * ※振り返り用にコメントを残している
 */

const path = require("path")

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  const postTemplate = path.resolve("src/templates/blog-post.js")

  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            html
            id
            frontmatter {
              path
              title
              date
              author
            }
          }
        }
      }
    }
  `).then(res => {
    if (res.errors) {
      return Promise.reject(res.errors)
    }

    res.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.path,
        component: postTemplate,
      })
    })
  })
}

// Pull request前にコメントは削除

/**
 * 「Promiseを使った表示制御について」
 * エラーチェックの応答
 * エラーが発生した場合は、戻る
 * エラーがなければ問題なくデータを返す
 * ループ処理をする
 *
 */

// gatsby-node.jsを書き換える時は、必ずterminalを止めてから再度スタートさせること

/** htmlとIDとは？
 * html : text data
 * ID : UniqueなdataのID
 *
 *
 */
