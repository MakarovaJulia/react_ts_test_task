import styles from './index.module.sass';
import {useRef, useState} from "react";
import {Button} from "../Button";
import can from "../../../assets/trash-svgrepo-com.svg";

export const DropFileInput = (props:any) =>{
    const [filePreview, setFilePreview] = useState<string>();
    const [isBtnShown, setIsBtnShown] = useState(false);

    const wrapperRef = useRef(null)

    const [fileList, setFileList] = useState<any>([])

    const onFileDrop = (e: any) => {
        const newFile = e.target.files[0];
        console.log(newFile);

        if (newFile) {
            const updateList = [...fileList, newFile];
            setFileList(updateList);

            const reader = new FileReader();
            reader.onload = () => {
                const base64String = reader.result as string;
                const base64Image = base64String.split(',')[1];
                props.onFileChange(base64Image);
                setFilePreview(base64String);
            };
            reader.readAsDataURL(newFile);
        }
    };

    const fileRemove = (file:any) => {
        const updateList = [...fileList]
        updateList.splice(fileList.indexOf(file), 1)
        setFileList(updateList)
        props.onFileChange(updateList)
        setIsBtnShown(false)
    }

    return(
        <>
            <div ref={wrapperRef}
                className={styles.drop_file_input}>
                <div className={styles.drop_file_input_label}>
                    <p>+ Upload</p>
                </div>
                <input className={styles.input} type='file' value='' onChange={onFileDrop}/>
            </div>
            {fileList.length > 0 ? (
                <div className={styles.drop_file_preview}>
                    {
                        fileList.map((item:any, index:any) => (
                            <div key={index} className={styles.item} onMouseEnter={()=> setIsBtnShown(true)} onMouseLeave={()=>setIsBtnShown(false)}>
                                <div className={styles.img}>
                                    <img src={filePreview} alt={item.name}/>
                                    {isBtnShown ?
                                      <button className={styles.delete_item} onClick={()=> fileRemove(item)}>
                                          <img className={styles.delete_icon} src={can} alt='DELETE'/>
                                      </button>
                                      :
                                      <></>
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
            ):null}
        </>
    )
}
