function isValidZipCode(zipCode) {
  const regex = /^\d{5}(?:-\d{4})?$|^(\d{3} \d{3})$/;
  return regex.test(zipCode) && !zipCode.includes("0000");
}
export const validateField = (type, val) => {
  console.log(type,val)
    switch (type) {
      case "email":
        return /^\S+@\S+\.\S+$/.test(val);
      case "zip_code":
        console.log('zip',val)
        return isValidZipCode(val);
      case "first_name":
      case "last_name":
      case "company_name":
          return val.trim().length >= 2;
        
      default:
        return true;
    }
  };
  