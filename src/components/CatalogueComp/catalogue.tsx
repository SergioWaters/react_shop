import styles from "./style.module.scss";
import { CatItemComp, SortComp, FilterComp, IForm, PaginationComp } from "./";
import { Sku } from "../../types";
import { FC, useEffect, useMemo, useState } from "react";

interface props {
  catalogueArr: Sku[];
  categoriesArr: string[];
  toCart: FunctionStringCallback;
}

const defaultForm = {
  manufacturers: {},
  price_min: "",
  price_max: "",
};

const sortArr = ["Подешевле", "Подороже", "Алфавит А-Я", "Алфавит Я-А"];

export const CatalogueComp: FC<props> = ({
  catalogueArr,
  categoriesArr,
  toCart,
}) => {
  const [perPage] = useState(6);
  const [form, setForm] = useState<IForm>(defaultForm);
  const [error, setError] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [currPage, setCurrPage] = useState(1);
  const [catalogue, setCatalogue] = useState(catalogueArr || []);
  const [pickedCategory, setPickedCategory] = useState<string>("");
  const pages = useMemo(
    () => Math.ceil(catalogue.length / perPage),
    [catalogue.length, perPage]
  );

  useEffect(() => {
    if (catalogue.length === 0) return;
    const obj: { [key: string]: boolean } = {};

    let maxPrice = catalogue[0].price || 0;
    let minPrice = catalogue[0].price || 0;

    catalogue.forEach((sku) => {
      obj[sku.manufacturer] = form.manufacturers[sku.manufacturer] || false;
      if (sku.price > maxPrice) maxPrice = sku.price;
      if (sku.price < minPrice) minPrice = sku.price;
    });

    setForm((curr) => {
      return {
        ...curr,
        manufacturers: obj,
        price_max: maxPrice.toString(),
        price_min: minPrice.toString(),
      };
    });
  }, [catalogue.length]);

  const handleSortEmit = (key: string) => {
    if (!key || key === sortBy) setSortBy(key);
    switch (key) {
      case sortArr[0]:
        setCatalogue([
          ...catalogue.sort((cur, next) => cur.price - next.price),
        ]);
        break;
      case sortArr[1]:
        setCatalogue([
          ...catalogue.sort((cur, next) => next.price - cur.price),
        ]);
        break;
      case sortArr[2]:
        setCatalogue([
          ...catalogue.sort((cur, next) => {
            if (cur.brand.toLocaleLowerCase() > next.brand.toLocaleLowerCase())
              return 1;
            if (cur.brand.toLocaleLowerCase() < next.brand.toLocaleLowerCase())
              return -1;
            return 0;
          }),
        ]);
        break;
      case sortArr[3]:
        setCatalogue([
          ...catalogue.sort((cur, next) => {
            if (cur.brand.toLocaleLowerCase() > next.brand.toLocaleLowerCase())
              return -1;
            if (cur.brand.toLocaleLowerCase() < next.brand.toLocaleLowerCase())
              return 1;
            return 0;
          }),
        ]);
        break;
      default:
        setCatalogue(catalogueArr);
    }
  };

  const formSubmitHandler = (form: IForm) => {
    setError("Loading...");
    let newCatal: Sku[] | [] = catalogueArr;
    const checked = Object.entries(form.manufacturers).filter((m) => m[1]);

    newCatal = newCatal.filter((i) => {
      if (!!pickedCategory && !i.categories.includes(pickedCategory))
        return false;
      if (!!checked.length && !form.manufacturers[i.manufacturer]) return false;
      if (!!form.price_min && i.price < +form.price_min) return false;
      if (!!form.price_max && i.price > +form.price_max) return false;
      return true;
    });
    if (!!sortBy) {
      handleSortEmit(sortBy);
    }
    const timeout = setTimeout(() => {
      !newCatal.length ? setError("Nothing is found") : setError("");

      setCatalogue([...newCatal]);
      setCurrPage(1);
      clearTimeout(timeout);
    }, 500);
  };

  const formResetHandler = () => {
    formSubmitHandler(defaultForm);
    setForm(defaultForm);
    setError("");
  };

  const pickCategory = (category: string) => {
    if (category === pickedCategory) {
      setPickedCategory("");
      setCatalogue(catalogueArr);
    } else {
      setPickedCategory(category);
      setCatalogue(catalogueArr.filter((i) => i.categories.includes(category)));
    }
    // setForm(defaultForm);
  };

  const formOnChange = (f: IForm) => {
    setForm((curr) => {
      return { ...curr, ...f };
    });
  };

  return (
    <div className={styles.catalogue + " container"}>
      <div className={styles.heading}>
        <h1>Косметика и гигиена</h1>
        <SortComp cbFn={handleSortEmit} optionsArr={sortArr} />
      </div>
      <ul className={styles.categories}>
        {categoriesArr.map((c) => (
          <li
            onClick={() => pickCategory(c)}
            className={`${styles.categories__item}
              ${c === pickedCategory && styles.picked}
            `}
            key={c}>
            {!c.includes(" ") ? (
              <p>{c}</p>
            ) : (
              <>
                <p>{c.slice(0, c.indexOf(" "))}</p>
                <p>{c.slice(c.indexOf(" "), c.length)}</p>
              </>
            )}
          </li>
        ))}
      </ul>
      <div className={styles.catalogue__inner}>
        <div className={styles.catalogue__aside}>
          <FilterComp
            formProp={form}
            onSubmit={formSubmitHandler}
            onReset={formResetHandler}
            onChange={formOnChange}
          />
          <ul className={styles.categories}>
            {categoriesArr.map((c) => (
              <li
                onClick={() => pickCategory(c)}
                className={`${styles.categories__item} ${
                  c === pickedCategory ? styles.picked_aside : ""
                }
                `}
                key={c}>
                {c}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.catalogue__wrapper}>
          <div className={styles.catalogue__list}>
            {!!error && (
              <div className={styles.catalogue__error}>
                <h1>{error}</h1>
              </div>
            )}
            {!!catalogue.length &&
              catalogue
                .slice((currPage - 1) * perPage, currPage * perPage)
                .map((p) => <CatItemComp sku={p} key={p.art} emit={toCart} />)}
          </div>
          {!!catalogue.length && (
            <PaginationComp onClick={(n) => setCurrPage(n)} pages={pages} />
          )}
        </div>
      </div>
    </div>
  );
};
