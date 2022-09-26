const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
    title: "The way of the noodle betch",
    author: "Pasta Man",
    url: "https://helloworld.com",
    likes: 20
    },
    {
    title: "Unmatched Pespicacity",
    author: "Andrew Tate",
    url: "https://HustlersUniversity.com",
    likes: 100000
    },
    {
    title: "testing",
    author: "me",
    url: "asdf",
    likes: 15
    }
    ]

    const nonExistingId = async () => {
        const blog = new Blog(
            {
                title: 'temp',
                author: "author",
                url: "temp.com",
                likes: 2})
        await blog.save()
        await blog.remove()
        return blog.id.toString()
    }
    const blogsInDb = async () => {
        const blogs = await Blog.find({})
        return blogs.map(blog=> blog.toJSON())
    }

    const usersInDb = async () => {
        const users = await User.find({})
        return users.map(u => u.toJSON())
      }

    module.exports = {
        initialBlogs, nonExistingId, blogsInDb, usersInDb
    }