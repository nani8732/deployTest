const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());

const upload = multer({ dest: 'uploads/' });

app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, 'index.html'))
);

app.post('/predict', upload.single('doc'), (req, res) => {
    if (!req.file) return res.status(400).send('No file uploaded');

    const ext = path.extname(req.file.originalname).toLowerCase();

    let result =
        ['.jpg', '.jpeg', '.png'].includes(ext)
            ? "Image Analysis: Landscape Detected"
            : ext === '.txt'
            ? "Text Analysis: Positive Sentiment"
            : "Unsupported File Format";

    res.json({ file: req.file.filename, result });
});

app.listen(5000, () =>
    console.log('Server running at http://localhost:5000')
);