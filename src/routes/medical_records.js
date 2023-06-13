const express = require("express");
const mRRouter = express.Router();
const db = require("../config/config.db");
const {
  getUserAllergy,
  getUserCondition,
  getUserMedication,
  deleteUserAllergy,
} = require("../controllers/medical_records_controllers");
// const {
//   getAllergiesByMedicalRecords,
//   createAllergy,
// deleteAllergy,
// } = require("../controllers/allergy_controllers");
// const {
//   getConditionsByMedicalRecords,
//   createCondition,
//   deleteCondition,
// } = require("../controllers/condition_controllers");
// const {
//   getMedicationsByMedicalRecords,
//   createMedication,
//   deleteMedication,
// } = require("../controllers/medication_controllers");
const getUserId = require("../helpers/getUserId");

////////////////////////////// MEDICAL RECORDS //////////////////////////////

// Display all medical records
// mRRouter.get("/", (req, res) => {
//   db.query("SELECT * FROM medical_records ")
//     .then((data) => {
//       res.json(data.rows);
//     })
//     .catch((error) => {
//       res.status(500).json({ error: "An error occurred" });
//     });
// });

/* 

Current: Retrieve user's medical record ID ->
{
  "id": 1,
  "users_id": 1, 
}
Fix: Should retrieve user's medical ID, then respond with all medical info associated with that ID

*/
mRRouter.get("/", async (req, res) => {
  try {
    const userId = getUserId(req);
    const fullMedicalInfo = {};

    const allergyPromise = getUserAllergy(userId)
      .then((data) => {
        fullMedicalInfo.allergies = data;
      })
      .catch((error) => {
        throw new Error("Fetch allergy error");
      });

    const conditionPromise = getUserCondition(userId)
      .then((data) => {
        fullMedicalInfo.conditions = data;
      })
      .catch((error) => {
        throw new Error("Fetch condition error");
      });

    const medicationPromise = getUserMedication(userId)
      .then((data) => {
        fullMedicalInfo.medications = data;
      })
      .catch((error) => {
        throw new Error("Fetch medication error");
      });

    await Promise.all([allergyPromise, conditionPromise, medicationPromise]);

    res.json(fullMedicalInfo);
  } catch (error) {
    res.status(500).json({ error: error.message || "An error occurred" });
  }
});

// UPDATE USER'S MEDICAL INFORMATION -> why would we wanna update medical record id...?
// mRRouter.post("/:medicalRecordId", (req, res) => {
//   const userId = getUserId(req);
//   const medicalRecordId = req.params.medicalRecordId;

//   updateUserMedicalInfo(userId, medicalRecordId)
//     .then((data) => {
//       res.json(data);
//     })
//     .catch((error) => {
//       res.status(500).json({ error: "An error occurred" });
//     });
// });

// ALLERGIES

// Get allergies by medical records ID
// Anyone other than user should not be able to access this route :(
// mRRouter.get("/allergies/:medicalRecordsId", (req, res) => {
//   const medicalRecordsId = req.params.medicalRecordsId;

//   getAllergiesByMedicalRecords(medicalRecordsId)
//     .then((data) => {
//       res.json(data);
//     })
//     .catch((error) => {
//       res.status(500).json({ error: "An error occurred" });
//     });
// });

// Create a new allergy
mRRouter.post("/allergies", (req, res) => {
  const { medicalRecordId, allergyName, allergySeverity } = req.body;

  createAllergy(medicalRecordId, allergyName, allergySeverity)
    .then((data) => {
      res.json(data);
      console.log("Allergy created");
    })
    .catch((error) => {
      res.status(500).json({ error: "An error occurred" });
    });
});

// Delete user allergy by ID
mRRouter.delete("/allergies/:allergyId/", (req, res) => {
  const allergyId = req.params.allergyId;
  const userId = getUserId(req);

  deleteAllergy(allergyId, medicalRecordsId)
    .then((data) => {
      res.json(data);
      console.log("Allergy deleted");
    })
    .catch((error) => {
      res.status(500).json({ error: "An error occurred" });
    });
});

// Edit user allergy by ID
// mRRouter.put('/allergies/:allergyId/:medicalRecordsId', (req, res) => {
//   const allergyId = req.params.allergyId;
//   const medicalRecordsId = req.params.medicalRecordsId;
//   const { allergyName, allergySeverity } = req.body;

//   editAllergy(allergyId, allergyName, allergySeverity, medicalRecordsId)
//     .then((data) => {
//       res.json(data);
//       console.log('Allergy edited');
//     })
//     .catch((error) => {
//       res.status(500).json({ error: 'An error occurred' });
//     });
// });

/////// CONDITIONS ///////

// Get conditions by medical records ID

mRRouter.get("/conditions/:medicalRecordsId", (req, res) => {
  const medicalRecordsId = req.params.medicalRecordsId;

  getConditionsByMedicalRecords(medicalRecordsId)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json({ error: "An error occurred" });
    });
});

// Create a new condition

mRRouter.post("/conditions", (req, res) => {
  const { medicalRecordId, conditionName } = req.body;

  createCondition(medicalRecordId, conditionName)
    .then((data) => {
      res.json(data);
      console.log("Condition created");
    })
    .catch((error) => {
      res.status(500).json({ error: "An error occurred" });
    });
});

// Delete user condition by ID

mRRouter.delete("/conditions/:conditionId/:medicalRecordsId", (req, res) => {
  const conditionId = req.params.conditionId;
  const medicalRecordsId = req.params.medicalRecordsId;

  deleteCondition(conditionId, medicalRecordsId)
    .then((data) => {
      res.json(data);
      console.log("Condition deleted");
    })
    .catch((error) => {
      res.status(500).json({ error: "An error occurred" });
    });
});

// Edit user condition by ID

// mRRouter.put('/conditions/:conditionId/:medicalRecordsId', (req, res) => {
//   const conditionId = req.params.conditionId;
//   const medicalRecordsId = req.params.medicalRecordsId;
//   const { conditionName } = req.body;

//   editCondition(conditionId, conditionName, medicalRecordsId)
//     .then((data) => {
//       res.json(data);
//       console.log('Condition edited');
//     })
//     .catch((error) => {
//       res.status(500).json({ error: 'An error occurred' });
//     });
// });

////// MEDICATIONS //////

// Get medications by medical records ID

mRRouter.get("/medications/:medicalRecordsId", (req, res) => {
  const medicalRecordsId = req.params.medicalRecordsId;

  getMedicationsByMedicalRecords(medicalRecordsId)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json({ error: "An error occurred" });
    });
});

// Create a new medication

mRRouter.post("/medications", (req, res) => {
  const { medicalRecordId, medicationName } = req.body;

  createMedication(medicalRecordId, medicationName)
    .then((data) => {
      res.json(data);
      console.log("Medication created");
    })
    .catch((error) => {
      res.status(500).json({ error: "An error occurred" });
    });
});

// Delete user medication by ID

mRRouter.delete("/medications/:medicationId/:medicalRecordsId", (req, res) => {
  const medicationId = req.params.medicationId;
  const medicalRecordsId = req.params.medicalRecordsId;

  deleteMedication(medicationId, medicalRecordsId)
    .then((data) => {
      res.json(data);
      console.log("Medication deleted");
    })
    .catch((error) => {
      res.status(500).json({ error: "An error occurred" });
    });
});

// Edit user medication by ID

// mRRouter.put('/medications/:medicationId/:medicalRecordsId', (req, res) => {
//   const medicationId = req.params.medicationId;
//   const medicalRecordsId = req.params.medicalRecordsId;
//   const { medicationName } = req.body;

//   editMedication(medicationId, medicationName, medicalRecordsId)
//     .then((data) => {
//       res.json(data);
//       console.log('Medication edited');
//     })
//     .catch((error) => {
//       res.status(500).json({ error: 'An error occurred' });
//     });
// });

module.exports = mRRouter;
