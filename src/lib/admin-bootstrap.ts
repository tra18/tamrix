import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/admin-password";

export async function bootstrapAdminUser(): Promise<void> {
  const count = await prisma.adminUser.count();
  if (count > 0) return;

  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD?.trim();

  if (!email || !password) {
    console.warn(
      "[admin] Aucun utilisateur admin — définissez ADMIN_EMAIL et ADMIN_PASSWORD pour créer le premier compte"
    );
    return;
  }

  await prisma.adminUser.create({
    data: {
      email,
      name: "Administrateur",
      passwordHash: await hashPassword(password),
      role: "SUPER_ADMIN",
    },
  });

  console.info(`[admin] Compte super-admin créé pour ${email}`);
}
