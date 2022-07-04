import { Router } from 'express'
import authenticateUser from './_middlewares/authenticate-user.js'

const router = Router()

// API | AUTH
// router.post('/api/auth/signup', (await import('./controllers/api/auth/signup.js')).default)
// router.post('/api/auth/login', (await import('./controllers/api/auth/login.js')).default)
// router.delete('/api/auth/logout', (await import('./controllers/api/auth/logout.js')).default)

// API | MY PROFILE | AUTH REQUIRED
// router.get('/api/my/profile', authenticateUser('json'), (await import('./controllers/api/my/profile/show.js')).default)
// router.put('/api/my/profile', authenticateUser('json'), (await import('./controllers/api/my/profile/update.js')).default)

// PAGES | PREDICTIONS
// router.get('/predictions', (await import('./controllers/pages/predictions/index.js')).default)
router.get('/predictions/new', (await import('./controllers/pages/predictions/new.js')).default)
// router.get('/predictions/:id', (await import('./controllers/pages/predictions/show.js')).default)

// PAGES | STATIC
router.get('/', (await import('./controllers/pages/static/home.js')).default)

// PAGES | NOT FOUND
// router.use((await import('./controllers/pages/not-found.js')).default)

export default router
