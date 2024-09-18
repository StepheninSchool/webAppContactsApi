import express from 'express';
import multer from 'multer';

const router = express.Router();

//MULTERSETUP
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

// Get all contacts
router.get('/all', (req, res) => {
  res.send('All contacts');
});

// Get a contact by id
router.get('/:id', (req, res) => {
  const id = req.params.id;

  res.send('Contact by id' + id)

  //to-do:verify :id is a number

  // to do get contact record in database by id

  res.send('Contact by id ' + id);
});

// add a new contact
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

  res.json(contact);

  console.log('My new contact: ${firstName} ${lastName} ${fileName}')

  if(req.file){
    console.log('File Uploaded ' + req.file.filename);
  }

  res.send('Add a new contact')
});

// update a contact by id
router.put('/update/:id', upload.single('edit'),(req,res) => {
  const id = req.params.id;
  
  if(req.file){
    console.log('File uploaded ' + req.file.filename);
  }

// to-do: verify :id is a number

  res.send('Update a contact by id ' + id)
});

// delete a contact by id
router.delete('/delete/:id',(req,res) => {
  const id = req.params.id;

  //to-do: verify :id is a number
  res.send('Delete a contact by ' + id)

});

  
 
  

export default router;
