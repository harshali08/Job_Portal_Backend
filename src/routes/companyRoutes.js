import express from "express";
import {
  createCompany,
  deleteCompany,
  getAllCompanies,
  getCompanyDetailsById,
  updateCompany,
} from "../controllers/companyControllers.js";

const router = express.Router();

router.get("/all-companies", getAllCompanies);
router.post("/create-company", createCompany);
router.put("/update-company/:id", updateCompany);
router.delete("/delete-company/:id", deleteCompany);
router.get("/get-company-details/:id", getCompanyDetailsById);

export default router;
