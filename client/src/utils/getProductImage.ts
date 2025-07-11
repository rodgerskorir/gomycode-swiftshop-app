const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export function getProductImage(image: string[] | string | undefined): string {
  if (!image) return "/assets/images/default.png";

  if (typeof image === "string") return image;

  if (Array.isArray(image) && image.length > 0) {
    const img = image[0];
    return img.startsWith("http")
      ? img
      : `${BASE_URL}/${img.replace(/^\/+/, "")}`;
  }

  return "/assets/images/default.png";
}
