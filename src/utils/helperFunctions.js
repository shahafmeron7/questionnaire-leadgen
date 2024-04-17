
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

  export const sendImpressions = (data,eventName,stream,formID=null)=>{
   
    sendLeadgenImpression(data,eventName,stream,formID);
    
  }

  export function sendLeadgenImpression(data, eventName,stream,formID=null) {
    var to_send = {
      extra: {
        extra_data: data,
        ...(formID !== null && { form: formID })
      },
      event: eventName,
      api: "sonary.com",
      stream: stream,
    };
    let logEvent = new CustomEvent("ry_send_log", {
      detail: to_send,
      bubbles: true,
      composed: false,
    });
    // console.log(to_send)
     window.dispatchEvent(logEvent);
  }
  