import React, { useState } from "react";
import styles from "./index.module.scss";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: "", date: "" });
  const [showModal, setShowModal] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const handleAddEvent = () => {
    if (newEvent.title && newEvent.date) {
      const event = {
        id: Date.now(),
        title: newEvent.title,
        date: formatDate(newEvent.date),
        color: "#a3d8f4", 
      };
      setEvents([...events, event]);
      setNewEvent({ title: "", date: "" });
      setShowModal(false);
    }
  };

  const handleDeleteEvent = (id) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };


  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getMonthName = (date) => {
    return date.toLocaleString("default", { month: "long" });
  };

  const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
  const calendarDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className={styles["box"]}>

<div className={styles.calendarContainer}>
      <h1 className={styles.title}>My Calendar</h1>


      <div className={styles.monthHeader}>
        <button onClick={handlePrevMonth} className={styles.navButton}>
          &lt;
        </button>
        <h2>
          {getMonthName(currentDate)} {currentDate.getFullYear()}
        </h2>
        <button onClick={handleNextMonth} className={styles.navButton}>
          &gt;
        </button>
      </div>

      <div className={styles.calendarGrid}>
        {calendarDays.map((day) => {
          const date = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const dayEvents = events.filter((event) => event.date === formatDate(date));
          return (

           
            <div key={day} className={styles.calendarDay}>
              <div className={styles.dayHeader}>{day}</div>
              {dayEvents.map((event) => (
                <div
                  key={event.id}
                  className={styles.event}
                  style={{ backgroundColor: event.color }}
                >
                  <span>{event.title}</span>
                  <button
                    onClick={() => handleDeleteEvent(event.id)}
                    className={styles.deleteButton}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          );
        })}
      </div>

      <button onClick={() => setShowModal(true)} className={styles.addEventButton}>
        + Add Event
      </button>

      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Add New Event</h2>
            <input
              type="text"
              placeholder="Event Title"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              className={styles.input}
            />
            <input
              type="date"
              value={newEvent.date}
              onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
              className={styles.input}
            />
            <div className={styles.modalButtons}>
              <button onClick={handleAddEvent} className={styles.saveButton}>
                Save
              </button>
              <button
                onClick={() => setShowModal(false)}
                className={styles.cancelButton}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>

    </div>


  );
};

export default Calendar;