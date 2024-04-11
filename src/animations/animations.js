export const defaultVariants = {
  initial: { y: 50, opacity: 0 },
  enter: { y: 0, opacity: 1, transition: { duration: 0.3, ease: "easeInOut" } },
  exit: { opacity: 0, transition: { duration: 0.2, ease: "easeOut" } },
};
export const slideUpListVariant = {
  initial: (index) => ({ y: 50, opacity: 0 }),
  enter: (index) => ({
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
      delay: index * 0.1, // Delay each item based on its index
    },
  }),
  exit: {
    opacity: 0, // Using an array to specify keyframes for opacity
    transition: { duration: 0.2, ease: "easeOut" }, // Specifying the keyframe timings
  },
};
export const slideUpBoxVariant = {
  initial: { y: 200, opacity: 0 },
  animate: (index) => ({
    y: 0,
    opacity: 1,
    transition: {
      y: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        delay: index * 0.1, // Delay based on the index
      },
      opacity: {
        duration: 0.8,
        delay: index * 0.1, // Apply the same delay for opacity to keep the animation synchronized
      },
    },
  }),
  exit: {
    opacity: 0,
    transition: { duration: 0.5, ease: "easeOut", delay: 0.1 }, // You can adjust the exit delay here if needed
  },
};
