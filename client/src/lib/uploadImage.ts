/**
 * Upload an image through the admin API backed by Replit Object Storage.
 * Returns the canonical /objects/<id> URL once saved and made public.
 */
export async function uploadAdminImage(file: File, adminPassword: string): Promise<string> {
  const allowed = ["image/jpeg", "image/png", "image/webp", "image/avif"];
  if (!allowed.includes(file.type)) {
    throw new Error("Tipo de archivo no permitido. Usa JPG, PNG, WEBP o AVIF.");
  }
  if (file.size > 5 * 1024 * 1024) {
    throw new Error("El archivo supera el limite de 5 MB.");
  }

  const form = new FormData();
  form.append("file", file, file.name);

  const res = await fetch("/api/admin/upload-image", {
    method: "POST",
    headers: {
      "x-admin-password": adminPassword,
    },
    body: form,
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || "No se pudo subir la imagen.");
  }

  const { url } = (await res.json()) as { url: string };
  return url;
}
