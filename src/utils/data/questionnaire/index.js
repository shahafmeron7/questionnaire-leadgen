import {questionnaireDataA} from "./questionnaireDataA";
import {questionnaireDataB} from "./questionnaireDataB";

// const appVersion = import.meta.env.VITE_APP_VERSION;

 const questionnaireVariation = Math.random() <= 0.5 ? 'A' : 'B';
// const questionnaireVariation ='A';

// console.log("questionnaireVariation",questionnaireVariation)
let questionnaireData = questionnaireVariation === 'A' ?   questionnaireDataA : questionnaireDataB;
//  console.log(questionnaireData);

export { questionnaireData,questionnaireVariation};