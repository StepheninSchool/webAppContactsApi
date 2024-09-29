import express from 'express';
import multer from 'multer';
import { PrismaClient } from '@prisma/client';

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/'); // save uploaded files in `public/images` folder
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split('.').pop(); // get file extension
    const uniqueFilename = Date.now() + '-' + Math.round(Math.random() * 1000) + '.' + ext; // generate unique filename - current timestamp + random number between 0 and 1000.
    cb(null, uniqueFilename);
  }
});
const upload = multer({ storage: storage });

// Prisma setup
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

// Get all contacts
router.get('/all', async (req, res) => {
  const contacts = await prisma.contact.findMany();

  res.json(contacts);
});

// Get a contact by id
router.get('/get/:id', async (req, res) => {
  const id = req.params.id;

  // Validate id
  if (isNaN(id)) {
    res.status(400).send('Invalid contact id.');
    return;
  }

  const contact = await prisma.contact.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (contact) {
    res.json(contact);
  } else {
    res.status(404).send('Contact not found.');
  }
});

// Add a new contact
router.post('/create', upload.single('image'), async (req, res) => {
  const { firstName, lastName, phone, email, title } = req.body;
  const filename = req.file ? req.file.filename : null;

  // Validate inputs
  if (!firstName || !lastName || !phone || !email) {
    // to-do: delete uploaded file

    res.status(400).send('Required fields must have a value.');
    return;
  }

  // to-do: validate proper email, proper phone number, only .jpg/.png/.gig/, file size limit (5MB)

  const contact = await prisma.contact.create({
    data: {
      firstName: firstName,
      lastName: lastName,
      title: title,
      phone: phone,
      email: email,
      filename: filename,
    }
  });

  res.json(contact);
});

// UPDATE A CONTACT BY ID
router.put('/update/:id', upload.single('image'), async (req, res) => {
  const id = req.params.id;

  // capture the inputs

  const { firstName, lastName, phone, email, title } = req.body;
  const newFile = req.file ? req.file.filename : null;

  // validate the id

  if (isNaN(id)) {
    return res.status(400).send('Invalid contact ID.')
  }

  // validate required fields

  if (!firstName && !lastName && !phone && !email && !title && image) {
    return res.status(400).send('All fields must contain a value.')
  }

  // find the contact by id
  try {
    const contact = await prisma.contact.findUnique({
      where: { id: parseInt(id) },
    });

    if (!contact) {
      return res.status(404).send('Contact not found.');
    }

    // store the filename in a variable
    const oldFileName = contact.filename;

    // If a new file was uploaded, delete the old one
    if (newFile && oldFileName) {
      const oldFilePath = `public/images/${oldFilename}`;
      try {
        await FileSystem.unlink(oldFilePath); //delete the old file
        console.log(`Old file ${oldFilePath} delete successfully.`);
      } catch (error) {
        console.error(`Error deleting old file: ${error}`);
      }
    }

    // if file was uploaded, save that filename, and delete the old file. If not, save the old filename
    const updatedContact = await prisma.contact.update({
      where: { id: parseInt(id) },
      data: {
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        email: email,
        title: title,
        filename: newFile ? newFile : oldFileName, // save the new file if uploaded, otherwise keep the old name.
      },

    });

    // return the updated contact
    res.json(updatedContact);

  } catch (error) {
    console.error(`error updating contact: ${error}`);
    res.status(500).send('An error occurred while updating the contact.');
  }


  res.send('Update a contact by ' + id);
});

// Delete a contact id
router.delete('/delete/:id', async (req, res) => {
  const id = req.params.id;

  // verify id is a number
  if (isNaN(id)) {
    return res.status(400).send('Invalid contact ID.');
    }
  
  // Find the contact by id (if not found, return 404)
    try {
      const contact = await prisma.contact.findUnique({
        where: { id: parseInt(id) }
      });

      if (!contact){
        return res.status(404).send('Contact not found.');
      }
      
      //store the filename in a variable
      const oldFileName = contact.filename;

      //delete the image file (if there is one)
      if (oldFileName){
        const oldFilePath = 'public/images/${oldFileName}';
        try {
          //use the filesystem module from node to delete the file
          const fs = require('fs');
          fs.unlinkSync(oldFilePath); // delete the file;
          return res.status(200).end(`File ${oldFilePath} deleted successfully.`)
        } catch (error){
          console.error(`Error deleting file: ${error}`);
        }
      }

      //delete the record from the database with prisma
      await prisma.contact.delete({
        where: { id: parseInt(id) },
      });

      //send a message to confirm contact deleted
      res.send(`Contact with ID ${id} deleted successfully`);
    } catch (error) {
      console.error(`Error deleting contact: ${error}`);
      res.status(500).send('An error occrured while deleting the contact.');
    }
  
});


export default router;