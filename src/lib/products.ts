export type Product = {
  id: number;
  title: string;
  artist: string;
  price: number;
  originalPrice: number;
  image: string;
  description: string;
  category: "painting" | "digital";
};

const paintings: Product[] = [
  {
    id: 1,
    title: "Morning Mist",
    artist: "SoftHue Studios",
    price: 32,
    originalPrice: 40,
    image: "/images/paintings/IMG_0585.jpg",
    category: "painting",
    description:
      "A serene landscape capturing the soft light of early morning through misty fields. Hand-painted with care on canvas, this piece brings a calm, meditative quality to any space.",
  },
  {
    id: 2,
    title: "Lavender Fields",
    artist: "SoftHue Studios",
    price: 32,
    originalPrice: 40,
    image: "/images/paintings/IMG_0586.jpg",
    category: "painting",
    description:
      "Vibrant purple lavender rows under a gentle sky. This original painting evokes the warmth and fragrance of summer in Provence, perfect for adding color and tranquility to your home.",
  },
  {
    id: 3,
    title: "Coastal Dawn",
    artist: "SoftHue Studios",
    price: 32,
    originalPrice: 40,
    image: "/images/paintings/IMG_0587.jpg",
    category: "painting",
    description:
      "The first light of day over the water, with soft reflections and a peaceful shoreline. An original canvas piece that brings the calm of the coast into your room.",
  },
  {
    id: 4,
    title: "Autumn Reflections",
    artist: "SoftHue Studios",
    price: 32,
    originalPrice: 40,
    image: "/images/paintings/IMG_0588.jpg",
    category: "painting",
    description:
      "Rich autumn colors reflected in still water. This hand-painted work celebrates the warmth and depth of fall, ideal for living rooms and cozy spaces.",
  },
];

const digitalPrints: Product[] = [
  {
    id: 10,
    title: "Neon Pulse",
    artist: "SoftHue Studios",
    price: 16,
    originalPrice: 20,
    image: "https://picsum.photos/seed/neon1/600/750",
    category: "digital",
    description:
      "Bold neon gradients and dynamic shapes. A high-quality digital art print that adds a modern, energetic vibe to any wall. Printed on premium paper.",
  },
  {
    id: 11,
    title: "Pixel Dreams",
    artist: "SoftHue Studios",
    price: 16,
    originalPrice: 20,
    image: "https://picsum.photos/seed/digital2/600/750",
    category: "digital",
    description:
      "Dreamy digital composition blending soft pixels and flowing forms. This print is perfect for bedrooms, offices, or creative spaces. Premium archival print.",
  },
  {
    id: 12,
    title: "Synth Wave",
    artist: "SoftHue Studios",
    price: 16,
    originalPrice: 20,
    image: "https://picsum.photos/seed/digital3/600/750",
    category: "digital",
    description:
      "Retro-inspired synth wave aesthetics with vibrant colors and geometric lines. A striking digital art print that stands out in any modern interior.",
  },
  {
    id: 13,
    title: "Digital Bloom",
    artist: "SoftHue Studios",
    price: 16,
    originalPrice: 20,
    image: "https://picsum.photos/seed/digital4/600/750",
    category: "digital",
    description:
      "Organic digital florals meeting abstract forms. A fresh, contemporary print that brings a touch of nature and artistry to your walls. Archival quality.",
  },
];

const allProducts = [...paintings, ...digitalPrints];

export function getProduct(id: number): Product | undefined {
  return allProducts.find((p) => p.id === id);
}

export function getAllProducts(): Product[] {
  return allProducts;
}

export { paintings, digitalPrints };
