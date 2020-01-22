import config from 'dotenv'
import express from 'express'
import bodyParser from 'body-parser'
import bookRoutes from './server/routes/BookRoutes'
import authRoutes from './server/routes/AuthRoutes'
import blogRoutes from './server/routes/BlogRoutes'
import pageRoutes from './server/routes/PageRoutes'
import subscriptionRoutes from './server/routes/SubcriptionRoutes'
import newsletterRoutes from './server/routes/NewsletterRoutes'
import categoryRoutes from './server/routes/CategoryRoutes'

config.config()

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const port = process.env.PORT || 8000

app.use('/api/v1/books', bookRoutes)
app.use('/auth', authRoutes)
app.use('/api/v1/blogs', blogRoutes)
app.use('/api/v1/category', categoryRoutes)
app.use('/api/v1/page', pageRoutes)
app.use('/api/v1/subscription', subscriptionRoutes)
app.use('/api/v1/newsletter', newsletterRoutes)

//when a random route is inputed
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to this API.'
}))

app.listen(port, () => console.log(`Server is running on PORT ${port}`))

export default app
