// src/context/questionnaire/utils/impressionUtils.js

export const buildEventData = (currentQuestion, flowID,flowName, action = null) => {
    const { step, code, text, type, subquestions } = currentQuestion;

    let questionsData;
    if (type === "details-question" || type === "form-type" || type==="form-result") {
      questionsData = subquestions.map((sub) => ({
        code: sub.code,
        text: sub.text,
      }));
    } else {
      questionsData = [{ code, text }];
    }
    const eventData = {
      context: {
        step,
        questions: questionsData,
        flow_id: flowID,
        flow_name: flowName,
      },
    };

    if (action) {
      eventData["action"] = action;
    }

    return eventData;
  };
export const sendImpressions = (data,eventName,stream,formID=null,tid=null)=>{
   
  // sendLeadgenImpression(data,eventName,stream,formID,'A');
  sendLeadgenImpression(data,eventName,stream,formID,tid);

  
}

function sendLeadgenImpression(data, eventName,stream,formID=null,tid=null) {
  var to_send = {
    extra: {
      extra_data: data,
      ...(formID !== null && { form: formID }),
      ...(tid !== null && { tid: tid })

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

  if (import.meta.env.PROD) {
    window.dispatchEvent(logEvent);
  }
  else{
      console.log(to_send)
  }
}
