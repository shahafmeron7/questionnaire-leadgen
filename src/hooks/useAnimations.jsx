import {useRef } from "react"
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useQuestionnaire } from "@/context/QuestionnaireContext";


gsap.config({
    nullTargetWarn: false,
  })
  gsap.registerPlugin(useGSAP);
const useAnimations = () => {
    const {currentQuestionCode} = useQuestionnaire();
    const layoutRef = useRef(null);
    const tl = useRef();

    useGSAP(() => {

        tl.current = gsap.timeline()
          .fromTo(".animateItem", { opacity: 0, y: 100 }, { opacity: 1, y: 0, stagger: 0.02, duration: 0.05, ease: 'power2.inOut' })
          .fromTo(".animateTitleItem", { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.inOut' })
          .fromTo(".animateStaggerItem", { opacity: 0, y: 150 }, { opacity: 1, y: 0, stagger: 0.03, duration: 0.6, ease: "back.inOut(2)" });
        
      }, { scope: layoutRef, dependencies: [currentQuestionCode] });
    
  return layoutRef;    
}

export default useAnimations