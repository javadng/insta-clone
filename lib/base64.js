const convertBase64 = file => {
  const reader = new FileReader();
  let base64String;

  reader.addEventListener("load", () => {
    //convert to base64 for sending to the database

    base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
  });

  reader.readAsDataURL(file);

  return { reader, base64String };
};

export default convertBase64;
