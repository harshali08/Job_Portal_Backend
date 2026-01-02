import { prisma } from "../config/db.js";

const getAllCompanies = async (req, resp) => {
  const allCompanies = await prisma.company.findMany();
  return resp.status(200).json({
    status: "success",
    message: "Data fetched Successfully",
    data: allCompanies,
  });
};

const createCompany = async (req, resp) => {
  try {
    const {
      company_name,
      company_location,
      company_details,
      created_by,
      updated_by,
    } = req.body;

    if (!company_name || !company_location || !company_details) {
      return resp.status(400).json({
        status: "error",
        message: "Missing required fields",
      });
    }

    const companyExists = await prisma.company.findFirst({
      where: { company_name },
    });

    if (companyExists) {
      return resp.status(409).json({
        status: "error",
        message: "Company already present",
      });
    }

    const newCompany = await prisma.company.create({
      data: {
        company_name,
        company_location,
        company_details,
        created_by,
        updated_by,
      },
    });

    console.log(newCompany, "newCompany");

    return resp.status(201).json({
      status: "success",
      message: "Company created successfully",
      data: newCompany,
    });
  } catch (error) {
    return resp.status(500).json({
      status: "error",
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const updateCompany = async (req, resp) => {
  const { id } = req.params;
  try {
    const {
      company_name,
      company_location,
      company_details,
      created_by,
      updated_by,
    } = req.body;

    const companyExists = await prisma.company.findUnique({
      where: { id },
    });

    if (!companyExists) {
      return resp.status(409).json({
        status: "error",
        message: "Company doesn't exists",
      });
    }

    const newCompany = await prisma.company.update({
      where: { id: id },
      data: {
        company_name,
        company_location,
        company_details,
        updated_by: updated_by,
      },
    });

    return resp.status(201).json({
      status: "success",
      message: "Company updated successfully",
    });
  } catch (error) {
    return resp.status(500).json({
      status: "error",
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const getCompanyDetailsById = async (req, resp) => {
  const { id } = req.params;
  try {
    const companyExists = await prisma.company.findUnique({
      where: { id },
    });

    if (!companyExists) {
      return resp.status(404).json({
        status: "error",
        message: "Company not found",
      });
    }
    const comapnyDetails = await prisma.company.findUnique({ where: { id } });
    return resp.status(200).json({
      status: "success",
      message: "Data fetched Successfully",
      data: comapnyDetails,
    });
  } catch (error) {
    return resp.status(500).json({
      status: "error",
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const deleteCompany = async (req, resp) => {
  try {
    const { id } = req.params;
    const companyExists = await prisma.company.findUnique({
      where: { id },
    });

    if (!companyExists) {
      return resp.status(404).json({
        status: "error",
        message: "Company not found",
      });
    }

    await prisma.company.delete({ where: { id } });
    return resp.status(200).json({
      status: "success",
      message: "Company deleted successfuly",
    });
  } catch (error) {
    return resp.status(500).json({
      status: "error",
      message: "Something went wrong",
      error: error.message,
    });
  }
};

export {
  getAllCompanies,
  createCompany,
  updateCompany,
  getCompanyDetailsById,
  deleteCompany,
};
