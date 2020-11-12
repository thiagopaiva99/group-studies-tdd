const request = require('supertest');
const app = require('../app')

describe('Application', () => {
    it('should up the server', async () => {
        const response = await request(app)
            .get('/');

        expect(response.status).toBe(200);
        expect(response.text).toBe('foi!')
    })
})

/**
 * id - opcional no save;
 * title;
 * content;
 * author;
 * tags;
 * createdAt
 */

describe('Article', () => {
    describe('Create', () => {
        it('should save article', async () => {
            const article = {
                title: 'Some Title',
                content: 'Some Content',
                author: 'Os Bonitos e o Thiaguin',
                tags: ['react', 'angular', 'frontend', 'tests'],
            }

            const response = await request(app)
                .post('/articles')
                .send(article)

            expect(response.status).toBe(201);
            expect(response.body).toStrictEqual({
                id: expect.any(Number),
                createdAt: expect.any(String),
                ...article
            })
        })

        it('should not save article with incorrect payload', async () => {
            const article = {
                content: 'Some Content',
                author: 'Os Bonitos e o Thiaguin',
                tags: ['react', 'angular', 'frontend', 'tests'],
            }

            const response = await request(app)
                .post('/articles')
                .send(article)
                
            expect(response.status).toBe(400);
            expect(response.body).toStrictEqual({
                error: 'Invalid payload'
            })
        })
    })

    describe('List', () => {})

    describe('Get By Id', () => {})

    describe('Update', () => {})

    describe('Delete', () => {})
})