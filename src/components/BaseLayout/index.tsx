import React, {FC} from "react";
import styles from "./index.module.sass";

export interface IBaseLayout {
    children?: React.ReactNode
}

export const BaseLayout: FC<IBaseLayout> = ({children}) => {
    return (
      <div className={styles.wrapper}>
          {children}
      </div>
    )
}
