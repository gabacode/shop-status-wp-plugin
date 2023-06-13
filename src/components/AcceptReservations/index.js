import { ToggleControl } from "@wordpress/components";

export const AcceptReservations = ({
  title,
  acceptReservations,
  setAcceptReservations,
}) => {
  const toggleAcceptReservations = () => {
    setAcceptReservations(!acceptReservations);
  };

  return (
    <section>
      <h1>{title}</h1>
      <small>
        Questo campo abilita o disabilita la possibilità di prenotare un tavolo
      </small>
      <ToggleControl
        checked={acceptReservations}
        label={acceptReservations ? "ON" : "OFF"}
        onChange={toggleAcceptReservations}
      />
    </section>
  );
};

