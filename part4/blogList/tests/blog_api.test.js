const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')


beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})
describe('JSON returned', () => {
    test('blogs are returned as json', async () => {
        await api
          .get('/api/blogs')
          .expect(200)
          .expect('Content-Type', /application\/json/)
      
      },100000)
      
      afterAll(() => {
        mongoose.connection.close()
      })
})
describe('Correct number of blogs returned', () => {
    test('x number of blogs returned',async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })
})
describe('adding blogs', () => {
    test('Can new blog be added', async () => {
        const newBlog = {
            title: "testing testing 1 2",
            author: "chase",
            url: "right here.com",
            likes: 40
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length+1)
        const contents = blogsAtEnd.map(x => x.title)
        expect(contents).toContain("testing testing 1 2")
    })
})
describe('Deleting blogs', () => {
    test('can we delete a blog', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)
        
        const contents = blogsAtEnd.map(r => r.title)
        expect(contents).not.toContain(blogToDelete.title)
    })
})
describe('Update blog', () => {
    test('can we update a blog', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]
        const update = {likes:72}
        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(update)
            .expect(200)
        const blogsAtEnd = await helper.blogsInDb()
        
        expect(blogsAtEnd[0].likes===72)
    })
})
//TESTING  USER API
//########################################################################
const bcrypt = require('bcrypt')
const User = require('../models/user')

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
      await User.deleteMany({})
  
      const passwordHash = await bcrypt.hash('sekret', 10)
      const user = new User({ username: 'root', passwordHash })
  
      await user.save()
    })
  
    test('creation succeeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb()
  
      const newUser = {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
        password: 'salainen',
      }
  
      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)
  
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
  
      const usernames = usersAtEnd.map(u => u.username)
      expect(usernames).toContain(newUser.username)
    })
    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
          username: 'root',
          name: 'Superuser',
          password: 'salainen',
        }
    
        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)
    
        expect(result.body.error).toContain('username must be unique')
    
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toEqual(usersAtStart)
      })
    test('check invalid username creation', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser1 = {
          username: 'ro',
          name: 'test1',
          password: 'password',
        }

        const result = await api    
            .post('/api/users')
            .send(newUser1)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    
        expect(result.body.error).toContain('username must be longer than 3 characters')
    
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toEqual(usersAtStart)

    })
    test('check invalid password creation', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser1 = {
            username: 'rooot',
            name: 'test2',
            password: 'pa',
        }
        const result = await api    
            .post('/api/users')
            .send(newUser1)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    
        expect(result.body.error).toContain('password must be longer than 3 characters')
    
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toEqual(usersAtStart)

    })
  })


afterAll (() => {
    mongoose.connection.close()
})
