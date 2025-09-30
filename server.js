const bodyParser = require('body-parser')
const express = require('express')
const path = require('path')

const app = express()

// Servir arquivos estáticos
app.use(express.static('.'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Rota principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

// Rota para as páginas
app.get('/series.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'series.html'))
})

app.get('/linguagens.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'linguagens.html'))
})

// Configuração do Multer para uploads (mantida do código original)
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, './upload')
    },
    filename: function(req, file, callback){
        callback(null, `${Date.now()}_${file.originalname}`)
    }
})

const upload = multer({ storage: storage }).single('arquivo')

app.post('/upload', (req, res) => {
    upload(req, res, err => {
        if(err){
            return res.end('Ocorreu um erro')
        }
        res.end('Concluído com sucesso')
    })
})

app.listen(8080, () => console.log('Servidor executando na porta 8080...'))