import useMeasure from "react-use-measure";
import { motion, AnimatePresence } from "framer-motion";

export const ResizablePanel = ({ children }) => {
  let [ref, { height }] = useMeasure();

  return (
    <motion.div animate={{ height: height || "auto" }}>
      <AnimatePresence initial={false}>
        <div ref={ref}>{children}</div>
      </AnimatePresence>
    </motion.div>
  );
};
