export const isImage = (fileName) => {
  const validExtensions = ["jpg", "jpeg", "png"];
  const fileNameArr = fileName.split(".");
  const fileExtension = fileNameArr[fileNameArr.length - 1];
  return validExtensions.includes(fileExtension);
};
