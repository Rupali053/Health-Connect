const mongoose = require("mongoose");
const Doctor = require("./models/Doctor"); // Adjust the path as needed

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://anuj1488be20:JoNxgQRoBHBPypgk@cluster0.9jnps.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const doctors = [
  {
    name: "Dr. David Anderson",
    specialization: "General Practitioner",
    diseases: ["flu", "asthma"],
  },
  {
    name: "Dr. John Smith",
    specialization: "Orthopedic",
    diseases: ["joint pain", "arthritis"],
  },
  {
    name: "Dr. Jane Doe",
    specialization: "Cardiologist",
    diseases: ["heart disease", "hypertension"],
  },
  {
    name: "Dr. Emily Davis",
    specialization: "Dermatologist",
    diseases: ["acne", "eczema"],
  },
  {
    name: "Dr. William Brown",
    specialization: "Pediatrician",
    diseases: ["pediatric care", "asthma"],
  },
  {
    name: "Dr. Ava Johnson",
    specialization: "Neurologist",
    diseases: ["migraine", "epilepsy"],
  },
  {
    name: "Dr. Liam Wilson",
    specialization: "Dentist",
    diseases: ["toothache", "gum disease"],
  },
  {
    name: "Dr. Noah Martinez",
    specialization: "Gastroenterologist",
    diseases: ["gastritis", "IBS"],
  },
  {
    name: "Dr. Olivia Garcia",
    specialization: "Gynecologist",
    diseases: ["menstrual issues", "pregnancy"],
  },
  {
    name: "Dr. Sophia Miller",
    specialization: "Oncologist",
    diseases: ["cancer", "tumors"],
  },
  {
    name: "Dr. Isabella Lee",
    specialization: "Psychiatrist",
    diseases: ["depression", "anxiety"],
  },
  {
    name: "Dr. Mia Martinez",
    specialization: "Ophthalmologist",
    diseases: ["vision problems", "cataracts"],
  },
  {
    name: "Dr. Elijah Anderson",
    specialization: "Endocrinologist",
    diseases: ["diabetes", "thyroid issues"],
  },
  {
    name: "Dr. Alexander Thomas",
    specialization: "Urologist",
    diseases: ["kidney stones", "UTI"],
  },
  {
    name: "Dr. Charlotte Jackson",
    specialization: "Allergist",
    diseases: ["allergies", "asthma"],
  },
  {
    name: "Dr. Amelia White",
    specialization: "Rheumatologist",
    diseases: ["rheumatoid arthritis", "lupus"],
  },
  {
    name: "Dr. Daniel Harris",
    specialization: "Physiatrist",
    diseases: ["chronic pain", "rehabilitation"],
  },
  {
    name: "Dr. James Clark",
    specialization: "Hematologist",
    diseases: ["anemia", "blood disorders"],
  },
  {
    name: "Dr. Henry Lewis",
    specialization: "Pulmonologist",
    diseases: ["COPD", "asthma"],
  },
  {
    name: "Dr. Lucas Walker",
    specialization: "Infectious Disease Specialist",
    diseases: ["HIV", "tuberculosis"],
  },
  {
    name: "Dr. Ella Young",
    specialization: "Internal Medicine",
    diseases: ["hypertension", "diabetes", "Flu"],
  },
  {
    name: "Dr. Scarlett King",
    specialization: "Geriatrician",
    diseases: ["dementia", "arthritis"],
  },
  // Add any additional doctors as needed
];

const seedDB = async () => {
  await Doctor.deleteMany(); // Clear existing doctors
  await Doctor.insertMany(doctors); // Insert new doctors
  console.log("Database seeded!");
};

seedDB().then(() => {
  mongoose.connection.close();
});
