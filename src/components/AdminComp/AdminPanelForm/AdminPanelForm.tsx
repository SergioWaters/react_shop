import { ChangeEvent, FC, MouseEvent, useRef, useState } from "react";
import styles from "./style.module.scss";
import { Sku } from "../../../types";

interface IProps {
  sku?: Sku;
  onSubmit: (arg0: Sku) => void;
  onDelete: (arg0: Sku) => void;
}

const defaultSku: Sku = {
  info: "",
  measureUnits: "",
  unitsCount: 0,
  art: "",
  manufacturer: "",
  brand: "",
  images: [],
  price: 0,
  pack: 0,
  categories: [],
  description: "",
  stock: 0,
};

export const AdminPanelForm: FC<IProps> = ({ sku, onSubmit, onDelete }) => {
  const [isAbleToEdit, setIsAbleToEdit] = useState(false);
  const [form, setForm] = useState<Sku>(sku || defaultSku);

  const imagesInputRef = useRef<HTMLInputElement>(null);
  const categoriesInputRef = useRef<HTMLInputElement>(null);

  const editBtnClickHandler = (e: MouseEvent) => {
    e.preventDefault();
    setIsAbleToEdit(!isAbleToEdit);
  };

  const deleteBtnClickHandler = (e: MouseEvent) => {
    e.preventDefault();
    onDelete(form);
  };

  const formChangeHandler = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const val = e.target.value;
    const name = e.target.name;
    if (!name) return;

    setForm((sku) => {
      return {
        ...sku,
        [name]: val,
      };
    });
  };

  const formSubmitHandler = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e.target);
    if (!form.art) return;
    setIsAbleToEdit(false);
    onSubmit(form);
  };

  const removeArrayChild = (
    e: MouseEvent,
    key: "categories" | "images",
    child: unknown
  ) => {
    e.stopPropagation();
    e.preventDefault();
    setForm((curr) => {
      return {
        ...curr,
        [key]: curr[key].filter((i) => i !== child),
      };
    });
  };

  const addArrayChild = (
    e: MouseEvent,
    key: "categories" | "images",
    child: string | undefined
  ) => {
    e.preventDefault();
    child &&
      setForm((curr) => {
        return {
          ...curr,
          [key]: [...curr[key], child],
        };
      });
  };

  return (
    <form
      className={`${styles.card}
          ${isAbleToEdit ? styles.editable : styles.non_editable}`}
      onChange={formChangeHandler}
      onSubmit={formSubmitHandler}>
      <div className={styles.part}>
        <p>
          <span> brand: </span>
          {form.brand}
        </p>
        <input type="text" name="brand" defaultValue={form.brand} required />
      </div>
      <div className={styles.part}>
        <p>
          <span> article: </span>
          {form.art}
        </p>
        <input type="text" name="art" defaultValue={form.art} required />
      </div>
      <div className={styles.part}>
        <span> categories: </span>
        {form.categories.map((i) => (
          <p key={i}>{i}</p>
        ))}
        <div className={styles.add_child_block}>
          <input
            type="text"
            name="categories"
            onChange={(e) => e.stopPropagation()}
            ref={categoriesInputRef}
          />
          <button
            onClick={(e) =>
              addArrayChild(e, "categories", categoriesInputRef.current?.value)
            }>
            Add category
          </button>
        </div>
      </div>
      <div className={styles.part}>
        <span> description: </span>
        <p>{form.description}</p>
        <input
          type="text"
          name="description"
          defaultValue={form.description}
          required
        />
      </div>
      <div className={styles.part}>
        <span> info: </span>
        <p>{form.info}</p>
        <input type="text" name="info" defaultValue={form.info} required />
      </div>
      <div className={styles.part}>
        <p>
          <span> manufacturer: </span>
          {form.manufacturer}
        </p>
        <input
          type="text"
          name="manufacturer"
          defaultValue={form.manufacturer}
          required
        />
      </div>
      <div className={styles.part}>
        <p>
          <span> measureUnits: </span>
          {form.measureUnits}
        </p>
        <input
          type="text"
          name="measureUnits"
          defaultValue={form.measureUnits}
          required
        />
      </div>
      <div className={styles.part}>
        <p>
          <span> pack: </span>
          {form.pack}
        </p>
        <input type="text" name="pack" defaultValue={form.pack} required />
      </div>
      <div className={styles.part}>
        <p>
          <span> price: </span>
          {form.price}
        </p>
        <input type="text" name="price" defaultValue={form.price} required />
      </div>
      <div className={styles.part}>
        <p>
          <span> stock: </span>
          {form.stock}
        </p>
        <input type="text" name="stock" defaultValue={form.stock} />
      </div>
      <div className={styles.part}>
        <span> images: </span>
        {form.images.map((i) => (
          <div className={styles.images} key={i}>
            <img src={i} height="100" />
            <button
              onClick={(e) => removeArrayChild(e, "images", i)}
              className={styles.images_delete_btn}>
              &times;
            </button>
            <p>{i}</p>
          </div>
        ))}
        <div className={styles.add_child_block}>
          <input
            type="text"
            name="images"
            onChange={(e) => e.stopPropagation()}
            ref={imagesInputRef}
          />
          <button
            onClick={(e) =>
              addArrayChild(e, "images", imagesInputRef.current?.value)
            }>
            Add link
          </button>
        </div>
      </div>
      <div className={styles.part}>
        <span> thumbnail: </span>
        <p>{form.thumbnail}</p>
        {form.thumbnail && (
          <img src={form.thumbnail} height="100" width="100" />
        )}
      </div>
      <div className={styles.buttons}>
        <button className={styles.edit_btn} onClick={editBtnClickHandler}>
          Edit
        </button>
        <button className={styles.edit_btn} onClick={deleteBtnClickHandler}>
          Delete
        </button>
        <button className={styles.submit_btn} type="submit">
          Submit changes
        </button>
      </div>
    </form>
  );
};
