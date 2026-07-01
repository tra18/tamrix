export async function register() {
  const { validateProductionEnv } = await import("@/lib/env-security");
  const { bootstrapAdminUser } = await import("@/lib/admin-bootstrap");
  validateProductionEnv();
  await bootstrapAdminUser();
}
