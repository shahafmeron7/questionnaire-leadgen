import React from 'react';
import { ReactComponent as ClockIcon } from '../../images/form icons/clock.svg';
import { ReactComponent as LockIcon } from '../../images/form icons/lock.svg';
import { ReactComponent as TrustedIcon } from '../../images/form icons/trustedcheckmark.svg';
import styles from './FormIcons.module.css';
const FormIcons = () => {
    const icons = [
        {
            text: "Secure Form",
            Icon: LockIcon,
            alt: "lock icon"
        },
        {
            text: "Trusted Brands",
            Icon: TrustedIcon, 
            alt: "trust checkmark icon"
        },
        {
            text: "Takes 1 minute",
            Icon: ClockIcon,
            alt: "clock icon"
        }
    ];

    return (
        <div className={styles.formIconsContainer}>
            {icons.map((icon, index) => (
                <div key={index} className={styles.IconContainer}>
                    <icon.Icon aria-label={icon.alt} /> 
                    <p>{icon.text}</p>
                </div>
            ))}
        </div>
    );
};

export default FormIcons;
