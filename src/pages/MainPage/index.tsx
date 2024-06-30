import React, {useEffect, useState} from "react";
import {observer} from "mobx-react";
import {BaseLayout} from "../../components/BaseLayout";

import styles from "./index.module.sass";
import {Gallery} from "../../components/Gallery";
import {IItem, itemsMock} from "../../mocks/ItemsMock";
import {ItemsForm} from "../../components/ItemForm";
import {Chat} from "../../components/Chat";

export const MainPage = observer(() => {
  const [isChatOpen, setIsChatOpen] = useState(true);

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(itemsMock));
  }, []);

  const items = JSON.parse(localStorage.getItem("items")!)

    return(
        <BaseLayout>
          <div className={styles.wrapper}>
            <div className={styles.gallery}>
              <Gallery/>
              {isChatOpen ?
                <div className={styles.chat}>
                  <Chat/>
                </div>
                :
                <div className={styles.chat}>
                  <ItemsForm/>
                </div>
              }
            </div>
          </div>
        </BaseLayout>
    )
})
