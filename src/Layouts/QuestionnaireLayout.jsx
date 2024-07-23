import React from "react";
import styles from './QuestionnaireLayout.module.css'
import useIsWideScreen from "@/hooks/useIsWideScreen";

import { useQuestionnaire } from "@/context/QuestionnaireContext.jsx";
const QuestionnaireLayout = React.forwardRef(({ children,bgColor }, ref) => {
  const { questionnaireStarted,currentQuestionCode } = useQuestionnaire();
  const isEmailStep = currentQuestionCode ==="email";
  const {isWideScreen,isTabletScreen,isDesktopScreen} = useIsWideScreen();
  const mobileStyle = {
    // height: "80vh",
    // minHeight: "100%",
    // overflowY: "scroll",
    // paddingBottom:" 80px", 
    backgroundColor:bgColor,
    paddingTop:"0px"
  }
  const isFormResultMobile = currentQuestionCode === "form_result" && !isWideScreen;
  const isFormResultAndTablet = currentQuestionCode === "form_result" && !isTabletScreen && isWideScreen;
  const isFormResultAndDesktop = currentQuestionCode === "form_result" && isDesktopScreen;
  
  return (
    <div ref={ref}  className={styles.questionnaireLayout} style={ questionnaireStarted&& !isWideScreen ? mobileStyle : {backgroundColor:bgColor}}>
      {/* <div className={styles.questionnaireWrapper} style = { isEmailStep && !isWideScreen ? {paddingTop:"44px",width:"100%"}: !isWideScreen ? {width:"100%"} :{}}> */}
      <div className={`${styles.questionnaireWrapper} ${isFormResultAndTablet ? styles.styleFormResult : ''} ${isFormResultAndDesktop ? styles.formResultDesk : ''}
      ${isFormResultMobile ? styles.styleMobileForm : ''}
      `}>
        
      <div className={styles.questionnaireContent}>

      {children}
      </div>
      </div>
    </div>
  );
});


export default QuestionnaireLayout;
