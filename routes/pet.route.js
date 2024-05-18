const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();

const { getPets, getSinglePet, createPet, updatePet, deletePet } = require('../controlles/pet.controller')

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); 
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); 
    }
  });
  
const upload = multer({ storage: storage });

router.get('/', getPets);
router.get('/:slug', getSinglePet);
router.post('/',upload.single('image'), createPet);
router.put('/:id', updatePet);
router.delete('/:id', deletePet);
module.exports = router