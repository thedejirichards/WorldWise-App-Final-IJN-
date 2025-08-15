import type { ButtonProp } from "../types/types"
import styles from "./Button.module.css"
function Button({children, onClick, type}: ButtonProp) {
    return (
        <button onClick={onClick} className={`${styles.btn} ${styles[type]}`}>
            {children}
        </button>
    )
}

export default Button
