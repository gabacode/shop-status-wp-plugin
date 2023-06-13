import { days } from "../../utils/constants";
import { CheckboxControl } from "@wordpress/components";

export const OpeningDays = ({ title, checkedDays, setCheckedDays }) => {
  const handleCheckboxChange = (index, checked) =>
    setCheckedDays((prevCheckedDays) =>
      checked
        ? [...prevCheckedDays, parseInt(index)]
        : prevCheckedDays.filter((day) => day !== parseInt(index))
    );

  const renderDays = [...days.slice(1), days[0]];

  const renderCheckbox = (innerDay) => {
    const dayIndex = days.indexOf(innerDay);
    return (
      <div key={innerDay}>
        <CheckboxControl
          label={innerDay}
          checked={checkedDays.includes(dayIndex)}
          onChange={(checked) => handleCheckboxChange(dayIndex, checked)}
        />
      </div>
    );
  };

  return (
    <section>
      <h1>{title}</h1>
      <div className="columns">
        {renderDays.map((_, index) =>
          index % 3 === 0 ? (
            <div className="column" key={index}>
              {renderDays.slice(index, index + 3).map(renderCheckbox)}
            </div>
          ) : null
        )}
      </div>
    </section>
  );
};

