import React from "react";

function VenueOwnerDashboard() {
  const venues = [
    {
      id: 1,
      name: "Royal Convention Hall",
      location: "Kochi",
      price: "₹15,000",
      status: "Approved",
    },
    {
      id: 2,
      name: "Dream Wedding Hall",
      location: "Thrissur",
      price: "₹25,000",
      status: "Pending",
    },
  ];

  const styles = {
    container: {
      background: "#f4f7fc",
      minHeight: "100vh",
      padding: "30px",
      fontFamily: "Arial, sans-serif",
    },

    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "30px",
    },

    title: {
      color: "#2c3e50",
      margin: 0,
    },

    button: {
      padding: "12px 20px",
      border: "none",
      borderRadius: "8px",
      backgroundColor: "#007bff",
      color: "#fff",
      fontSize: "16px",
      cursor: "pointer",
    },

    cards: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
      gap: "20px",
      marginBottom: "30px",
    },

    card: {
      background: "#fff",
      padding: "20px",
      borderRadius: "12px",
      textAlign: "center",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    },

    cardTitle: {
      color: "#666",
      marginBottom: "10px",
      fontSize: "16px",
    },

    cardValue: {
      fontSize: "30px",
      fontWeight: "bold",
      color: "#007bff",
    },

    tableContainer: {
      background: "#fff",
      padding: "20px",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    },

    table: {
      width: "100%",
      borderCollapse: "collapse",
    },

    th: {
      background: "#007bff",
      color: "#fff",
      padding: "12px",
    },

    td: {
      padding: "12px",
      textAlign: "center",
      borderBottom: "1px solid #ddd",
    },

    approved: {
      color: "green",
      fontWeight: "bold",
    },

    pending: {
      color: "orange",
      fontWeight: "bold",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Venue Owner Dashboard</h1>

        <button style={styles.button}>
          + Add Venue
        </button>
      </div>

      <div style={styles.cards}>
        <div style={styles.card}>
          <p style={styles.cardTitle}>Total Venues</p>
          <h2 style={styles.cardValue}>2</h2>
        </div>

        <div style={styles.card}>
          <p style={styles.cardTitle}>Approved Venues</p>
          <h2 style={styles.cardValue}>1</h2>
        </div>

        <div style={styles.card}>
          <p style={styles.cardTitle}>Pending Venues</p>
          <h2 style={styles.cardValue}>1</h2>
        </div>

        <div style={styles.card}>
          <p style={styles.cardTitle}>Total Bookings</p>
          <h2 style={styles.cardValue}>18</h2>
        </div>

        <div style={styles.card}>
          <p style={styles.cardTitle}>Revenue</p>
          <h2 style={styles.cardValue}>₹1,25,000</h2>
        </div>
      </div>

      <div style={styles.tableContainer}>
        <h2>My Venues</h2>

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Venue Name</th>
              <th style={styles.th}>Location</th>
              <th style={styles.th}>Price</th>
              <th style={styles.th}>Status</th>
            </tr>
          </thead>

          <tbody>
            {venues.map((venue) => (
              <tr key={venue.id}>
                <td style={styles.td}>{venue.name}</td>
                <td style={styles.td}>{venue.location}</td>
                <td style={styles.td}>{venue.price}</td>
                <td
                  style={{
                    ...styles.td,
                    ...(venue.status === "Approved"
                      ? styles.approved
                      : styles.pending),
                  }}
                >
                  {venue.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default VenueOwnerDashboard;