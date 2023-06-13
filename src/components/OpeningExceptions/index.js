import Select from "react-select";
import { Button, Dashicon, Flex } from "@wordpress/components";
import { v4 as uuidv4 } from "uuid";

import { openingStatus } from "../../utils/constants";

export const OpeningExceptions = ({
  title,
  openingExceptions,
  setOpeningExceptions,
}) => {
  const today = new Date().toISOString().split("T")[0];
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
        date: today,
        from: "09:00",
        to: "12:00",
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
      <Flex justify="start" align="center">
        <h1>{title}</h1>
        <Button
          isSmall
          variant="secondary"
          label="Add exception"
          icon={<Dashicon icon="plus" />}
          onClick={handleAddOpeningException}
        />
      </Flex>
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
            isSearchable={false}
            options={openingStatus}
            onChange={(selected) =>
              handleChange(index, "is_open", selected.value)
            }
            defaultValue={openingStatus.find(
              (status) =>
                status.value === openingException.is_open ?? openingStatus[0]
            )}
            value={openingException.is_open.value}
          />
          <Button
            isDestructive
            isSmall
            variant="secondary"
            label="Remove exception"
            icon={<Dashicon icon="minus" />}
            onClick={() => handleDeleteOpeningException(openingException.id)}
          />
          <Button
            isSmall
            variant="secondary"
            label="Add exception"
            icon={<Dashicon icon="plus" />}
            onClick={handleAddOpeningException}
          />
        </div>
      ))}
    </section>
  );
};

