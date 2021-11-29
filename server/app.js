const express = require('express')
const path = require('path')

const app = express()

app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res, next) => {
    res.render('index')
})
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Running on http://localhost:${PORT}`))