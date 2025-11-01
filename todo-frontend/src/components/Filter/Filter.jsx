import { useState, useRef, useEffect } from "react";
import styles from "./Filter.module.css";
import { BsFillFilterSquareFill } from "react-icons/bs";

const Filter = ({ selectedDate, selectedStatus, setSelectedDate, setSelectedStatus }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  const statusList = ["Not started", "In progress", "Completed"];

  const handleStatusChange = (status) => {
    setSelectedStatus((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  const handleSelectAll = () => {
    if (selectedStatus.length === statusList.length) {
      setSelectedStatus([]);
    } else {
      setSelectedStatus([...statusList]);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.filters}>
      {/* Date Picker */}
      <input
        className={styles.input}
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />

      {/* Status Multi-select Dropdown */}
      <div className={styles.dropdown} ref={dropdownRef}>
        <div
          className={styles.dropdownHeader}
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          {selectedStatus.length === 0
            ? "Select Status"
            : selectedStatus.join(", ")}
        </div>

        {dropdownOpen && (
          <div className={styles.dropdownList}>
            <label className={styles.dropdownItem}>
              <input
                type="checkbox"
                checked={selectedStatus.length === statusList.length}
                onChange={handleSelectAll}
              />
              Select All
            </label>

            {statusList.map((status) => (
              <label key={status} className={styles.dropdownItem}>
                <input
                  type="checkbox"
                  checked={selectedStatus.includes(status)}
                  onChange={() => handleStatusChange(status)}
                />
                {status}
              </label>
            ))}
          </div>
        )}
      </div>
      <BsFillFilterSquareFill size={28} />
    </div>
  );
};

export default Filter;