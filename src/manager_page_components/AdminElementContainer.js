import { motion } from "framer-motion";

function AdminElementContainer({ children, className, duration = 0.3 }) {

    return (
        <>
            <motion.div
                className={className}
                
            >
                {children}
            </motion.div>
        </>
    )
}
export default AdminElementContainer;