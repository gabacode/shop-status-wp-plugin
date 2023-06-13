import Select from "react-select";
import { v4 as uuidv4 } from "uuid";

import { openingStatus } from "../../utils/constants";

export const OpeningExceptions = ({
  title,
  openingExceptions,
  setOpeningExceptions,
}) => {
  const handleChange = (index, field, value) => {
    setOpeningExceptions((openingExceptions) =>
      openingExceptions.map((exception, i) =>
        i === index
          ? {
              ...exception,
              [field]: value,
            }
          : exception
      )
    );
  };

  const handleAddOpeningException = () => {
    setOpeningExceptions((openingExceptions) => [
      ...openingExceptions,
      {
        id: uuidv4(),
        date: "2023-02-14",
        from: "09:00",
        to: "18:00",
        is_open: true,
      },
    ]);
  };

  const handleDeleteOpeningException = (id) => {
    setOpeningExceptions((openingExceptions) =>
      openingExceptions.filter((exception) => exception.id !== id)
    );
  };

  return (
    <section>
      <h1>{title}</h1>
      {openingExceptions?.map((openingException, index) => (
        <div key={openingException.id} className="opening-time-selector">
          <input
            type="date"
            value={openingException.date}
            onChange={(e) => handleChange(index, "date", e.target.value)}
          />
          <input
            type="time"
            value={openingException.from}
            onChange={(e) => handleChange(index, "from", e.target.value)}
          />
          <input
            type="time"
            value={openingException.to}
            onChange={(e) => handleChange(index, "to", e.target.value)}
          />
          <Select
            options={openingStatus}
            onChange={(selected) =>
              handleChange(index, "is_open", selected.value)
            }
            defaultValue={openingStatus.find(
              (status) =>
                status.value === openingException.is_open ??
                openingStatus[0]
            )}
            value={openingException.is_open.value}
          />
          <button
            onClick={() => handleDeleteOpeningException(openingException.id)}
          >
            X
          </button>
        </div>
      ))}
      <button onClick={handleAddOpeningException}>Aggiungi eccezione</button>
    </section>
  );
};

