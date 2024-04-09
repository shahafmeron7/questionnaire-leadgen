import React from 'react'
import clockIcon from '../../images/form icons/clock.svg'
import lockIcon from '../../images/form icons/lock.svg'
import trustedIcon from '../../images/form icons/trustedcheckmark.svg'
import styles from './FormIcons.module.css'
const FormIcons = () => {
    const icons = [
        {
            text:"Secure Form",
            src:lockIcon,
            alt:"lock icon"
        },
        {

            text:"Trusted Brands",
            src:trustedIcon,
            alt:"trust checkmark icon"
        },
        {

            text:"Takes 1 minutes",
            src:clockIcon,
            alt:"clock icon"
        }
    ]
  return (
    <div className={styles.formIconsContainer}>
        {icons.map((icon)=>(
            <div key={icon.alt} className={styles.IconContainer}>
                <img src={icon.src} alt={icon.alt} />
                <p>{icon.text}</p>
            </div>
        ))}
    </div>
  )
}

export default FormIcons