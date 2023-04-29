import { motion } from "framer-motion";
import React from "react";

interface SpinnerDivProps {
    children: React.ReactNode;
}

const SpinnerDiv: React.FC<SpinnerDivProps> = ({ children }) => {
    return (
        <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
            {children}
        </motion.div>
    );
};

export default SpinnerDiv;
