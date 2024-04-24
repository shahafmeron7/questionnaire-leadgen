import { useEffect } from 'react';

export function useHistoryStack(dispatch, initialStep, state) {
    useEffect(() => {
        const handlePopState = (event) => {
            if (event.state && event.state.step) {
                dispatch({ type: "SET_CURRENT_QUESTION_CODE", payload: event.state.step });
            } else {
                // If no step in the history state, go to the initial step
                dispatch({ type: "SET_CURRENT_QUESTION_CODE", payload: initialStep });
            }
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, [dispatch]);

    const goToPrevious = (prevQuestionCode,newHistory) => {
        dispatch({ type: "SET_CURRENT_QUESTION_CODE", payload: prevQuestionCode });
        dispatch({ type: "SET_QUESTION_HISTORY", payload: newHistory });
        window.history.pushState({ step: prevQuestionCode }, `Question ${prevQuestionCode}`);
    };
    
    const goToNext = (nextQuestionCode) => {
        if(nextQuestionCode!=='loader'){
            dispatch({ type: "APPEND_TO_QUESTION_HISTORY", payload: nextQuestionCode });
            window.history.pushState({ step: nextQuestionCode }, `Question ${nextQuestionCode}`);
        }
        dispatch({ type: "SET_CURRENT_QUESTION_CODE", payload: nextQuestionCode });
    };

    return { goToNext, goToPrevious };
}
