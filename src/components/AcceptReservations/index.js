export const AcceptReservations = ({
  title,
  acceptReservations,
  setAcceptReservations,
}) => {
  return (
    <section>
      <h1>{title}</h1>
      <div>
        <input
          id="accept-reservations"
          type="checkbox"
          checked={acceptReservations}
          onChange={(e) => setAcceptReservations(e.target.checked)}
        />
        <label htmlFor="accept-reservations">Accetta prenotazioni</label>
      </div>
    </section>
  );
};

