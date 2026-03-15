import prisma from "../src/core/config/prisma.client.config";
import { hashPassword } from "../src/core/utils/bcrypt";

let adminRole = "";

const seedRole = async () => {
  const role = await prisma.role.upsert({
    where: { name: "Admin" },
    update: {},
    create: {
      name: "Admin",
      isSystem: true,
    },
  });
  adminRole = role.id;
};

const seedUser = async () => {
  const hashedPassword = await hashPassword("password123");
  await prisma.admin.upsert({
    where: { id: "user-admin-id" },
    update: {},
    create: {
      name: "John Doe",
      email: "user@gmail.com",
      roleId: adminRole,
      password: hashedPassword,
      id: "user-admin-id",
    },
  });
};

const main = async () => {
  try {
    await seedRole();
    await seedUser();
    console.log("Seeding completed successfully.");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await prisma.$disconnect();
  }
};

main().catch((error) => {
  console.error("Error in seeding script:", error);
  process.exit(1);
});
