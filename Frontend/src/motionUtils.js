export const defaultEasing = [0.87, 0, 0.13, 1];
export const contentEasing = [0.6, -0.05, 0.01, 0.99];

export const staggerOne = {
  animate: { transition: { staggerChildren: .1 } }
}

export const modalVariants = {
  hidden: { opacity: 0, top: "100%", transition: { duration: .6, ease: defaultEasing } },
  visible: { opacity: 1, top: "50%", transition: { duration: .8, ease: defaultEasing } }
}

export const modalOverlayVariants = {
  hidden: { opacity: 0, transition: { duration: .2, delay: .5 } },
  visible: { opacity: 1, transition: { duration: .2 } }
}

export const modalFadeInUpVariants = {
  initial: { y: 20, opacity: 0, transition: { duration: .8, ease: contentEasing } },
  animate: { y: 0, opacity: 1, transition: { duration: .8, ease: contentEasing } }
};

export const modalScaleUpVariants = {
  initial: { y: 20, scale: 0, opacity: 0, transition: { duration: .6, ease: contentEasing } },
  animate: { y: 0, scale: 1, opacity: 1, transition: { duration: .6, ease: contentEasing } }
};

export const modalScaleAndFadeInVariants = {
  hidden: { opacity: 0, scale: 1.1, transition: { duration: .8, ease: contentEasing } },
  visible: { opacity: 1, scale: 1, transition: { delay: .1, duration: .8, ease: contentEasing } }
}

export const welcomePageContentVariants = {
  animate: { transition: { staggerChildren: 0.25, delayChildren: 2.8 } }
};

export const welcomePageTextVariants = {
  initial: { y: -20, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: 0.7, ease: contentEasing } }
};

export const moviesPageContentVariants = {
  animate: { transition: { staggerChildren: 0.25, delayChildren: .75 } }
};

export const moviesPageTextVariants = {
  initial: { y: -20, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: 0.7, ease: contentEasing } }
};

export const moviesStaggerVariants = {
  initial: { y: -20, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: 0.7, ease: contentEasing } }
};

export const camVariants = {
  initial: { y: -20, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: 0.7, ease: contentEasing }}
};

export const sidebarVariants = {
  hidden: { opacity: 0, right: "-100%", transition: { duration: .6, ease: defaultEasing } },
  visible: { opacity: 1, right: "0%", transition: { duration: .8, ease: defaultEasing } }
}

// Reveal Transition

export const blackRevealBoxVariants = {
  initial: { height: "100vh", top: 0 },
  animate: { height: 0, transition: { when: "afterChildren", duration: 1.5, ease: defaultEasing }}
};

export const textContainerVariants = {
  initial: { opacity: 1, },
  animate: { opacity: 0, transition: { duration: 0.25, when: "afterChildren" } }
};

export const textVariants = {
  initial: { y: "50.5%" },
  animate: { y: "44.5%", transition: { duration: 1.5, ease: defaultEasing }}
};