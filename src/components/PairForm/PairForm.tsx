import { useEffect, useState, FC } from 'react';
import styles from './PairForm.module.css';

type PairFormProps = {
  codes: {
    [key: string]: string;
  };
  onAdd: (arg1: string, arg2: string) => void;
};

export const PairForm: FC<PairFormProps> = ({ codes, onAdd }) => {
  const [source, setSource] = useState('');
  const [target, setTarget] = useState('');
  const [data, setData] = useState([['', '']]);

  useEffect(() => {
    const entries = Object.entries(codes);

    if (entries.length) {
      setData(entries);
      setSource(entries[0][0]);
      setTarget(entries[0][0]);
    }
  }, [codes]);

  function addNewPair() {
    onAdd(source, target);
  }

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.header}>Add new pair</h1>
      <div className={styles.selectContainer}>
        <label htmlFor='source' className={styles.label}>
          Source
        </label>
        <select
          name='source'
          value={source}
          onChange={({ target }) => setSource(target.value)}
          className={styles.select}
        >
          {!!data &&
            data.map(([code, name]) => (
              <option key={code + name.slice(0, 10)} value={code} className={styles.option}>
                {code + ' - ' + name}
              </option>
            ))}
        </select>
      </div>
      <div className={styles.selectContainer}>
        <label htmlFor='target' className={styles.label}>
          Target
        </label>
        <select
          name='target'
          value={target}
          onChange={({ target }) => setTarget(target.value)}
          className={styles.select}
        >
          {!!data &&
            data.map(([code, name]) => (
              <option key={code + name.slice(0, 10)} value={code} className={styles.option}>
                {code + ' - ' + name}
              </option>
            ))}
        </select>
      </div>
      <button onClick={addNewPair} className={styles.addButton}>
        Add Pair
      </button>
    </div>
  );
};
