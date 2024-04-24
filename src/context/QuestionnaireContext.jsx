import { createContext, useContext } from 'react';

const QuestionnaireContext = createContext();

export const useQuestionnaire = () => useContext(QuestionnaireContext);

export default QuestionnaireContext;
