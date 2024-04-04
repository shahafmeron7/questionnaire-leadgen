export const validateField = (type, val) => {
    switch (type) {
      case "email":
        return /^\S+@\S+\.\S+$/.test(val);
      case "zip_code":
        console.log('zip',val)
        return /^\d{5}(-\d{4})?$/.test(val);
      case "first_name":
      case "last_name":
      case "company_name":
          return val.trim().length >= 2;
        
      default:
        return true;
    }
  };
  