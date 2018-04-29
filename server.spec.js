import request from 'SuperTest'
import app from './server'

test('/top returns 200', () => {
  return request(app) // #A
    .get('/top') // #B
    .expect(200) // #C
    })

test('returns a 404 when page does not exist', () => {
  return request(app)
    .get('/does-not-exist') // #A
    .expect(404) // #B
  })

test('returns a 404 when page does not exist', () => {
  return request(app)
    .get('/does-not-exist')
    .expect(404)
    .expect(res => { // #A
      expect(res.text).toContain('<h1>404</h1>') // #B
    })
})
    