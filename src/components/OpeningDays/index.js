import { days } from "../../utils/constants";

export const OpeningDays = ({ title, checkedDays, setCheckedDays }) => {
  const handleChange = (e) => {
    const { checked, id } = e.target;
    if (checked) {
      setCheckedDays((prevCheckedDays) => [...prevCheckedDays, parseInt(id)]);
    } else {
      setCheckedDays((prevCheckedDays) =>
        prevCheckedDays.filter((day) => day !== parseInt(id))
      );
    }
  };

  return (
    <section>
      <h1>{title}</h1>
      {days.map((day, index) => (
        <div className="day-selector" key={day}>
          <input
            type="checkbox"
            id={index}
            onChange={handleChange}
            checked={checkedDays.includes(index)}
          />
          <label htmlFor={index}>{day}</label>
        </div>
      ))}
    </section>
  );
};

