/**
 * Upload an image via the admin presigned-URL pipeline backed by Object Storage.
 * Returns the canonical /objects/<id> URL once finalized.
 */
export async function uploadAdminImage(file: File, adminPassword: string): Promise<string> {
  const allowed = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"];
  if (!allowed.includes(file.type)) {
    throw new Error("Tipo de archivo no permitido. Usa JPG, PNG, WEBP, AVIF o GIF.");
  }
  if (file.size > 5 * 1024 * 1024) {
    throw new Error("El archivo supera el límite de 5 MB.");
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "x-admin-password": adminPassword,
  };

  // 1) Request presigned URL
  const reqRes = await fetch("/api/admin/upload-url", {
    method: "POST",
    headers,
    body: JSON.stringify({
      name: file.name,
      size: file.size,
      contentType: file.type,
    }),
  });
  if (!reqRes.ok) {
    const data = await reqRes.json().catch(() => ({}));
    throw new Error(data.message || "No se pudo preparar la subida.");
  }
  const { uploadURL, rawURL } = (await reqRes.json()) as { uploadURL: string; rawURL: string };

  // 2) PUT file directly to GCS
  const putRes = await fetch(uploadURL, {
    method: "PUT",
    body: file,
    headers: { "Content-Type": file.type },
  });
  if (!putRes.ok) {
    throw new Error(`La subida a almacenamiento falló (${putRes.status}).`);
  }

  // 3) Finalize: set ACL to public, persist asset row, get canonical URL
  const finRes = await fetch("/api/admin/upload-finalize", {
    method: "POST",
    headers,
    body: JSON.stringify({
      rawURL,
      filename: file.name,
      size: file.size,
      contentType: file.type,
    }),
  });
  if (!finRes.ok) {
    const data = await finRes.json().catch(() => ({}));
    throw new Error(data.message || "No se pudo finalizar la subida.");
  }
  const { url } = (await finRes.json()) as { url: string };
  return url;
}
