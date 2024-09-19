import express from 'express';
import multer from 'multer';//IMPORT LIBRARIES - THESE MUST BE INSTALLED IN TERMINAL FIRST. INSTALL IN PROJECT FOLDER.


const router = express.Router();

// MULTERSETUP
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/'); // save uploaded files in `public/images` folder
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split('.').pop();// get file extension
    const uniqueFilename = Date.now() + '-' + Math.round(Math.random() * 1000) + '.' + ext; // generate unique filename - current timestamp + random number between 0 and 1000.
    cb(null, uniqueFilename);
  }
});
const upload = multer({ storage: storage});
// MULTERSETUP ENDS

router.get('/', (req, res) => {
  res.send('Contacts route test');
});

// GET ALL CONTACTS
router.get('/all', (req, res) => {
  res.send('All contacts');
});

// GET A CONTACT BY ID
router.get('/:id', (req, res) => {
  const id = req.params.id;

  //TO-DO: VERIFY :ID IS A NUMBER

  res.send('Contact by id  ' + id);
});

// ADD A NEW CONTACT
router.post('/create', upload.single('image'), (req,res) => {
  const { firstName, lastName, phone, email } = req.body;
  const fileName = req.file ? req.file.filename : null;

  const contact = {
    firstName: firstName,
    lastName: lastName,
    phone: phone,
    email: email,
    fileName: fileName,
  }

  // Use prisma to save new contact in database

  res.json(contact);
});
  

// UPDATE A CONTACT BY ID
router.put('/update/:id', upload.single('edit'),(req,res) => {
  const id = req.params.id;
  
  if(req.file){
    console.log('File uploaded ' + req.file.filename);
  }

  // TO-DO: VERIFY :ID IS A NUMBER

  res.send('Update a contact by id ' + id)
});

// DELETE A CONTACT BY ID
router.delete('/delete/:id',(req,res) => {
  const id = req.params.id;

  //to-do: verify :id is a number
  res.send('Delete a contact by ' + id)

});

  
 
  

export default router;
