// src/utils/imageLoader.ts

const images = import.meta.glob('../assets/*.{jpg,png,jpeg,gif}', {
  eager: true,
  import: 'default'
});

export const getImageByName = (fileName: string): string | undefined => {
    const modifiedName = fileName.replace(/\s+/g, "");
  const match = Object.entries(images).find(([path]) => path.includes(`${modifiedName}.png`));
  return match?.[1] as string;
};
