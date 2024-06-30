import styles from "./index.module.sass";
import {IItem} from "../../mocks/ItemsMock";
import can from '../../assets/trash-svgrepo-com.svg'
import {FC, useState} from "react";
import {observer} from "mobx-react";


export const GalleryCard: FC<IItem & { onDelete: (id: string) => void }> = observer((props) => {
  const [isBtnShown, setIsBtnShown] = useState(false);

    const {
      onDelete,
      id,
      image,
      name,
      description,
      price
    } = props;

    return (
        <div  className={styles.itemCard}>
          <div className={styles.cardTop} onMouseEnter={()=> setIsBtnShown(true)} onMouseLeave={()=>setIsBtnShown(false)}>
            <img
              className={styles.image}
              src={image}
              alt={name + ', фотография'}
            />
            {isBtnShown ?
              <button className={styles.delete_item} onClick={() => onDelete(id)}>
                <img className={styles.delete_icon} src={can} alt='DELETE'/>
              </button>
              :
              <></>
            }
          </div>
          <div className={styles.cardBottom}>
            <div className={styles.descBlock}>
              <h3>{name}</h3>
              <h3>{price} ₽</h3>
            </div>
            <p className={styles.desc}>{description}</p>
          </div>
        </div>
    )
})
