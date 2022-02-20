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