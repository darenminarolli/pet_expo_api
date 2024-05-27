const Pet = require("../models/pet.model");
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
  const name = req.query.name;
  console.log(slug);
  try {
    const pet = await Pet.find({ type_of_pet: slug, name: name });
    console.log('Single Pet: ',pet)
    res.status(200).json(pet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createPet = async (req, res) => {
  const pet = req.body;
  try {
    // if (!req.file) {
    //   return res.status(400).json({ message: "Please upload an image" });
    // }
    pet.image_path = req.file.path;
    const newPet = await Pet.create(pet);
    res.status(201).json(newPet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePet = async (req, res) => {
  const { id } = req.params;
  const pet = req.body;
  console.log(id, req.body);
  try {
    const updatedPet = await Pet.findByIdAndUpdate(id, pet, { new: true });
    res.status(200).json(updatedPet);
  } catch (error) {
    res.stats(500).json({ message: error.message });
  }
};
const deletePet = async (req, res) => {
  const { id } = req.params;
  try {

    const deletePet = await Pet.findByIdAndDelete(id);
    console.log(deletePet);
    res.status(200).json(deletePet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = { getPets, getPetsByType, getSinglePet, createPet, updatePet, deletePet };
