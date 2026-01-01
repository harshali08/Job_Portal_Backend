import { PrismaClient } from "@prisma/client";
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("Connected to database");
  } catch (error) {
    console.error("Error connecting to database:", error);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  try {
    await prisma.$disconnect();
    console.log("Disconnected from database");
  } catch (error) {
    console.error("Error disconnecting database:", error);
  }
};

export { prisma, connectDB, disconnectDB };
