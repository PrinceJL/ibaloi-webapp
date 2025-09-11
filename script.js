document.addEventListener("DOMContentLoaded", () => {
    const modalOverlay = document.getElementById("modal-overlay");
    const modalBox = document.getElementById("modal-box");
    const openModal = document.getElementById("modal-btn-open");
    const closeModal = document.getElementById("modal-btn-close");
    const submitBtn = document.getElementById("modal-btn-submit");
    const promptField = document.getElementById("modal-prompt");
    const inputField = document.getElementById("modal-input");
    const tableBody = document.getElementById("table-body");

    // Open modal
    openModal.addEventListener("click", () => {
        modalOverlay.classList.remove("opacity-0", "pointer-events-none");
        modalBox.classList.remove("opacity-0", "scale-95");
        modalBox.classList.add("opacity-100", "scale-100");
    });

    // Close modal
    closeModal.addEventListener("click", () => {
        modalOverlay.classList.add("opacity-0", "pointer-events-none");
        modalBox.classList.add("opacity-0", "scale-95");
        modalBox.classList.remove("opacity-100", "scale-100");
    });

    // Optional: close when clicking overlay
    modalOverlay.addEventListener("click", (e) => {
        if (e.target === modalOverlay) {
            closeModal.click();
        }
    });

    submitBtn.addEventListener("click", () => {
        input=getModalInput()
        
    });

    function setModalPrompt(text) {
        promptField.textContent = text;
    }

    function getModalInput() {
        return(inputField.value)
    }

    window.ModalAPI = {
        setModalPrompt,
        getModalInput,
    };

    /**
     * Get all column data from table
     * @param {number} colIndex - Column index (0-based)
     * @returns {Array<string>} - Array of column values
     */
    function getColData(colIndex) {
        return Array.from(tableBody.querySelectorAll("tr")).map(
            row => row.children[colIndex].textContent.trim()
        );
    }

    /**
     * Clear all rows in the table
     */
    function clearTable() {
        tableBody.innerHTML = "";
    }

    /**
     * Insert rows into the table
     * @param {Array<Array<string>>} data - Array of [col1, col2] rows
     */
    function insertToTable(data) {
        data.forEach(row => {
            const newRow = document.createElement("tr");
            newRow.className = "hover:bg-gray-50";
            newRow.innerHTML = `
            <td class="p-3 border-t">${row[0]}</td>
            <td class="p-3 border-t">${row[1]}</td>
            `;
            tableBody.appendChild(newRow);
        });
    }

    /**
     * Sort table by column index
     * Clears table, sorts data, reinserts
     * @param {number} colIndex - Column index (0 or 1)
     * @param {boolean} ascending - true for ascending, false for descending
     */
    function sortTable(colIndex = 0, ascending = true) {
        const rows = Array.from(tableBody.querySelectorAll("tr")).map(row => [
            row.children[0].textContent.trim(),
            row.children[1].textContent.trim()
        ]);

        rows.sort((a, b) => {
            return ascending
                ? a[colIndex].localeCompare(b[colIndex])
                : b[colIndex].localeCompare(a[colIndex]);
        });

        clearTable();
        insertToTable(rows);
    }

    // --- Example: Insert row from modal input ---
    submitBtn.addEventListener("click", () => {
        const value = inputField.value.trim();
        if (value) {
            insertToTable([[value, "New Data"]]);
            inputField.value = "";
            modal.classList.add("hidden");
        }
    });

    window.TableAPI = {
        getColData,
        clearTable,
        insertToTable,
        sortTable
    };
    
});
