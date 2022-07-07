import { Router } from 'express'
import authenticateUser from './_middlewares/authenticate-user.js'

const router = Router()

// API | AUTH
router.post('/api/auth/signup', (await import('./controllers/api/auth/signup.js')).default)
router.post('/api/auth/login', (await import('./controllers/api/auth/login.js')).default)
router.delete('/api/auth/logout', (await import('./controllers/api/auth/logout.js')).default)

// API | MY PROFILE | AUTH REQUIRED
router.get('/api/my/profile', authenticateUser('json'), (await import('./controllers/api/my/profile/show.js')).default)
router.put('/api/my/profile', authenticateUser('json'), (await import('./controllers/api/my/profile/update.js')).default)

// API | MY PREDICTIONS | AUTH REQUIRED
router.get('/api/my/predictions', authenticateUser('json'), (await import('./controllers/api/my/predictions/index.js')).default)
router.post('/api/my/predictions', authenticateUser('json'), (await import('./controllers/api/my/predictions/create.js')).default)
router.get('/api/my/predictions/:id', authenticateUser('json'), (await import('./controllers/api/my/predictions/show.js')).default)
router.put('/api/my/predictions/:id', authenticateUser('json'), (await import('./controllers/api/my/predictions/update.js')).default)
router.delete('/api/my/predictions/:id', authenticateUser('json'), (await import('./controllers/api/my/predictions/destroy.js')).default)

// API | PREDICTIONS
router.get('/api/predictions', (await import('./controllers/api/predictions/index.js')).default)
router.get('/api/predictions/new', (await import('./controllers/api/predictions/new.js')).default)
// router.get('/api/predictions/:id', (await import('./controllers/api/predictions/show.js')).default)

// API | NOT FOUND
router.use('/api', (await import('./controllers/api/not-found.js')).default)

// PAGES | AUTH
router.get('/auth/signup', (await import('./controllers/pages/auth/signup.js')).default)
router.get('/auth/login', (await import('./controllers/pages/auth/login.js')).default)

// PAGES | MY PROFILE | AUTH REQUIRED
router.get('/my/profile/edit', (authenticateUser('html'), await import('./controllers/pages/my/profile/edit.js')).default)

// PAGES | MY PREDICTIONS | AUTH REQUIRED
router.get('/my/predictions/new', authenticateUser('html'), (await import('./controllers/pages/my/predictions/new.js')).default)
router.get('/my/predictions/:id/edit', authenticateUser('html'), (await import('./controllers/pages/my/predictions/edit.js')).default)
router.get('/my/predictions/:id', authenticateUser('html'), (await import('./controllers/pages/my/predictions/show.js')).default)
router.get('/my/predictions', authenticateUser('html'), (await import('./controllers/pages/my/predictions/index.js')).default)

// PAGES | PREDICTIONS
router.get('/predictions', (await import('./controllers/pages/predictions/index.js')).default)
router.get('/predictions/new', (await import('./controllers/pages/predictions/new.js')).default)
// router.get('/predictions/:id', (await import('./controllers/pages/predictions/show.js')).default)

// PAGES | STATIC
router.get('/', (await import('./controllers/pages/static/home.js')).default)

// PAGES | NOT FOUND
router.use((await import('./controllers/pages/not-found.js')).default)

export default router
