var express = require('express');
const multer = require('multer');
var cors = require('cors');
const path = require('path'); 
require('dotenv').config()

var app = express();

// Configurar multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directorio donde se guardarán los archivos
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Guardar el archivo con la fecha y extensión original
  }
});

const upload = multer({ storage: storage });

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  console.log(req.file); // Imprimir información del archivo en la consola

  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
console.log(req.file.originalname);
  // Responder con información del archivo
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size // Tamaño en bytes
  });
});


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
