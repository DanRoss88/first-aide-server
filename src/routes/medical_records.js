const express = require("express");
const mRRouter = express.Router();
const db = require("../config/config.db");
const {
  getUserAllergy,
  getUserCondition,
  getUserMedication,
  createUserAllergy,
  deleteUserAllergy,
  createUserMedication,
  deleteUserMedication,
  createUserCondition,
  deleteUserCondition,
} = require("../controllers/medical_records_controllers");

const getUserId = require("../helpers/getUserId");

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

// Create a new allergy
mRRouter.post("/allergies", (req, res) => {
  const { name, severity } = req.body;
  const userId = getUserId(req);

  createUserAllergy(userId, name, severity)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json({ error: "An error occurred" });
    });
});

// Delete user allergy by ID
mRRouter.delete("/allergies/:allergyId/", (req, res) => {
  const allergyId = req.params.allergyId;
  const userId = getUserId(req);

  deleteUserAllergy(allergyId, userId)
    .then((data) => {
      if (data === 0 || data === undefined) {
        return res.status(404).json({ error: "Allergy not found" });
      }
      res.sendStatus(200);
    })
    .catch((error) => {
      res.status(500).json({ error: "An error occurred" });
    });
});

// Create a new condition
mRRouter.post("/conditions", (req, res) => {
  const { name } = req.body;
  const userId = getUserId(req);

  createUserCondition(userId, name)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json({ error: "An error occurred" });
    });
});

// Delete user condition by ID
mRRouter.delete("/conditions/:conditionId", (req, res) => {
  const conditionId = req.params.conditionId;
  const userId = getUserId(req);

  deleteUserCondition(userId, conditionId)
    .then((data) => {
      if (data === 0 || data === undefined) {
        return res.status(404).json({ error: "Condition not found" });
      }
      res.sendStatus(200);
    })
    .catch((error) => {
      res.status(500).json({ error: "An error occurred" });
    });
});

// Create a new medication
mRRouter.post("/medications", (req, res) => {
  const { name } = req.body;
  const userId = getUserId(req);

  createUserMedication(userId, name)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json({ error: "An error occurred" });
    });
});

// Delete user medication by ID
mRRouter.delete("/medications/:medicationId", (req, res) => {
  const medicationId = req.params.medicationId;
  const userId = getUserId(req);

  deleteUserMedication(userId, medicationId)
    .then((data) => {
      if (data === 0 || data === undefined) {
        return res.status(404).json({ error: "Medication not found" });
      }
      res.sendStatus(200);
    })
    .catch((error) => {
      res.status(500).json({ error: "An error occurred" });
    });
});

module.exports = mRRouter;
