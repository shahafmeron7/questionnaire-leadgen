// src/context/questionnaire/utils/validationUtils.js
// export const validateResponse = (response) => {
//     // Logic to validate the response
//     return response !== ''; // Example validation
// };

function isValidZipCode(zipCode) {
    const regex = /^\d{5}(?:-\d{4})?$|^(\d{3} \d{3})$/;
    return regex.test(zipCode) && !zipCode.includes("0000");
  }
  function isValidPhone(phone) {
    return /^(?:\+?1[-.\s]?)?\(?([2-9]\d{2})\)?[-.\s]?([2-9]\d{2})[-.\s]?(?!\1{3})\d{4}$/.test(
      phone
    );
  }
  export const validateField = (type, val) => {
      switch (type) {
        case "email":
          return /^\S+@\S+\.\S+$/.test(val);
        case "zip_code":
          return isValidZipCode(val);
        case "first_name":
        case "last_name":
        case "company_name":
            return val.trim().length >= 2;
        case "phone":
          return isValidPhone(val);
        default:
          return true;
      }
    };