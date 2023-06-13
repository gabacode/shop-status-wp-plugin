import Select from "react-select";
import { v4 as uuidv4 } from "uuid";

import { openingOptions } from "../../utils/constants";

export const OpeningTimes = ({ title, openingTimes, setOpeningTimes }) => {
  const handleChange = (index, field, value) => {
    setOpeningTimes((openingTimes) =>
      openingTimes.map((time, i) =>
        i === index
          ? {
              ...time,
              [field]: value,
              is_open: true,
            }
          : time
      )
    );
  };

  const handleAddOpeningTime = () => {
    setOpeningTimes((openingTimes) => [
      ...openingTimes,
      {
        id: uuidv4(),
        from: "09:00",
        to: "18:00",
        on_days: [],
      },
    ]);
  };

  const handleDeleteOpeningTime = (id) => {
    setOpeningTimes((openingTimes) =>
      openingTimes.filter((time) => time.id !== id)
    );
  };

  return (
    <section>
      <h1>{title}</h1>
      {openingTimes?.map((openingTime, index) => (
        <div key={openingTime.id} className="opening-time-selector">
          <input
            type="time"
            value={openingTime.from}
            onChange={(e) => handleChange(index, "from", e.target.value)}
          />
          <input
            type="time"
            value={openingTime.to}
            onChange={(e) => handleChange(index, "to", e.target.value)}
          />
          <Select
            isMulti
            placeholder="Seleziona i giorni"
            options={openingOptions}
            onChange={(selected) =>
              handleChange(
                index,
                "on_days",
                selected.map((s) => s.value)
              )
            }
            value={openingTime.on_days.map((day) => ({
              value: day,
              label: openingOptions.find((option) => option.value === day)
                .label,
            }))}
          />
          <button onClick={() => handleDeleteOpeningTime(openingTime.id)}>
            X
          </button>
        </div>
      ))}
      <div style={{ margin: "1rem 0rem" }}>
        <button onClick={handleAddOpeningTime}>Aggiungi orario</button>
      </div>
    </section>
  );
};

