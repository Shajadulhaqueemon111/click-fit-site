const express = require('express');
const multer = require('multer');
const cors = require('cors'); // Add this line
const app = express();
const path=require("path")
const PORT = process.env.PORT || 5000;



const bodyParser = require('body-parser'); // Add this line

// Use body-parser middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));
// Enable CORS middleware
app.use(cors());

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function(_req, _file, cb) {
        cb(null, './upload_images');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Upload endpoint
app.get("/",(req,res)=>{
    return res.render("home")
})
app.post('/upload', upload.single('profileImage'), (req, res) => {
    // Files are uploaded successfully
    console.log(req.body)
    console.log(req.file)
    return res.redirect("/")
});


// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
