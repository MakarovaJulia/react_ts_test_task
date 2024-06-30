import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import styles from './index.module.sass';
import {IItem} from "../../mocks/ItemsMock";
import {useStores} from "../../utils/use-stores-hook";
import {GalleryCard} from "../GalleryCard";
import {Button} from "../ui/Button";
import Pagination from "../ui/Pagination/Pagination";

export const Gallery: React.FC = observer(() => {
  const { itemStore } = useStores();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(6);

  useEffect(() => {
    itemStore.loadFromLocalStorage();
  }, []);

  const handleRemoveItem = (id: string) => {
    itemStore.removeItem(id);
  };

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = itemStore.items.slice(firstItemIndex, lastItemIndex);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const nextPage = () => {
    if (currentPage < Math.ceil(itemStore.items.length / itemsPerPage)) {
      setCurrentPage(prev => prev + 1);
    }
  };
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.gallery_wrapper}>
        {currentItems.map((data: IItem) => (
          <GalleryCard
            key={data.id}
            price={data.price}
            description={data.description}
            image={data.image}
            name={data.name}
            id={data.id}
            onDelete={() => handleRemoveItem(data.id)}
          />
        ))}
      </div>
      <div className={styles.buttons_block}>
        <Button active={false} title='<' onClick={prevPage} mode='secondary'/>
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={itemStore.items.length}
          paginate={paginate}
          current={currentPage}
        />
        <Button active={false} title='>' onClick={nextPage} mode='secondary'/>
      </div>
    </div>
  );
});
