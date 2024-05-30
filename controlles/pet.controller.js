const Pet = require("../models/pet.model");
const fs = require("fs");
require("dotenv").config();

const getPets = async (req, res) => {
  try {
    const pets = await Pet.find({});
    res.status(200).json(pets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getPetsByType = async (req, res) => {
  try {
    const { slug } = req.params;
    const pets = await Pet.find({ type_of_pet: slug });
    res.status(200).json(pets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getSinglePet = async (req, res) => {
  const { slug } = req.params;
  const { type } = req.query; 
  console.log(slug);

  try {
    const query = { name: slug };
    if (type) {
      query.type_of_pet = type;
    }

    const pet = await Pet.find(query);
    console.log("Single Pet: ", pet);
    res.status(200).json(pet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const createPet = async (req, res) => {
  const pet = req.body;
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Please upload an image" });
    }
    pet.image_path = req.file.path;
    console.log(pet.image_path);
    const newPet = await Pet.create(pet);
    res.status(201).json(newPet);
    console.log(newPet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePet = async (req, res) => {
  try {
    const petId = req.params.id;
    const updatedData = req.body;

    if (req.file) {
      const imagePath = req.file.path;
      updatedData.image_path = imagePath;

      const pet = await Pet.findById(petId);

      const filePath = pet.image_path;
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Error removing file: ${err}`);
          return;
        }
  
        console.log(`File ${filePath} has been successfully removed.`);
      });
    }


    const updatedPet = await Pet.findByIdAndUpdate(petId, updatedData, {
      new: true,
    });

    if (!updatedPet) {
      return res.status(404).json({ message: "Pet not found" });
    }

    res.status(200).json(updatedPet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
const deletePet = async (req, res) => {
  const { id } = req.params;
  try {

    const pet = await Pet.findById(id);
    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }

    const filePath = pet.image_path;
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(`Error removing file: ${err}`);
        return;
      }

      console.log(`File ${filePath} has been successfully removed.`);
    });

    const deletePet = await Pet.findByIdAndDelete(id);
    console.log(deletePet);
    res.status(200).json(deletePet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  getPets,
  getPetsByType,
  getSinglePet,
  createPet,
  updatePet,
  deletePet,
};
