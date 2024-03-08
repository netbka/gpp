export const useSlug = (text: String) => {
  const prohibitedChars = /[^a-z0-9\-_]+/gi;

  // Remove prohibited characters and convert to lowercase
  const slugText = text.toLowerCase().replace(prohibitedChars, "");

  // Replace multiple consecutive hyphens with a single hyphen
  const slug = slugText.replace(/-{2,}/g, "-");

  // Remove any leading or trailing hyphens
  return slug.trim("-");
};

export const parseSlugId = (val: String) => {
  try {
    return val.split("-")[0];
  } catch (error) {
    console.error(error);
    throw createError({
      statusCode: 500,
      statusMessage: "Нет такого занятия",
    });
  }
};
