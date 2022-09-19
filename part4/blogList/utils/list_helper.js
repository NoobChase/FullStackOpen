const dummy = (blogs) => {
    // ...
    return 1
  }
  
  const totalLikes = (blogs) => {
    let sumLikes = 0
    blogs.map(blog => {
        sumLikes = sumLikes+blog.likes
    })
    return sumLikes
  }
  const favoriteBlog = (blogs) => {
    let favoritedBlog = {}
    let mostLikes = -1
    blogs.map(blog => {
        if (blog.likes>= mostLikes) {
            mostLikes = blog.likes
            favoritedBlog = {
                title: blog.title,
                author: blog.author,
                likes: blog.likes
            }
        }
    })
    return favoritedBlog
  }
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
  }