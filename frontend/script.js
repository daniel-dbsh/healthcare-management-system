document.addEventListener('DOMContentLoaded', fetchInvestments);

async function fetchInvestments() {
    try {
        const response = await fetch('http://localhost:3000/api/investments');
        const investments = await response.json();
        populateTable(investments);
    } catch (error) {
        console.error('Error fetching investments:', error);
        alert('Error fetching investments');
    }
}

function populateTable(investments) {
    const tableBody = document.querySelector('#investmentsTable tbody');
    tableBody.innerHTML = '';

    if (investments.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="7">No investments found</td></tr>';
        return;
    }

    investments.forEach(investment => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${investment.location}</td>
            <td>${investment.time}</td>
            <td>${investment.hospitalStay}</td>
            <td>${investment.mriUnits}</td>
            <td>${investment.ctScanners}</td>
            <td>${investment.hospitalBeds}</td>
            <td>
                <button onclick="deleteInvestment('${investment._id}')">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Add Investment
document.getElementById('addInvestmentForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const investment = {
        location: document.getElementById('location').value,
        time: document.getElementById('time').value,
        hospitalStay: document.getElementById('hospitalStay').value,
        mriUnits: document.getElementById('mriUnits').value,
        ctScanners: document.getElementById('ctScanners').value,
        hospitalBeds: document.getElementById('hospitalBeds').value,
    };

    if (!validateForm(investment)) {
        alert('All fields are required.');
        return;
    }

    try {
        await fetch('http://localhost:3000/api/investments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(investment),
        });
        alert('Investment added successfully');
        fetchInvestments();
    } catch (error) {
        console.error('Error adding investment:', error);
        alert('Error adding investment');
    }
});

// Update Investment
document.getElementById('updateInvestmentForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('updateId').value;
    const updatedInvestment = {
        location: document.getElementById('updateLocation').value,
        time: document.getElementById('updateTime').value,
        hospitalStay: document.getElementById('updateHospitalStay').value,
        mriUnits: document.getElementById('updateMriUnits').value,
        ctScanners: document.getElementById('updateCtScanners').value,
        hospitalBeds: document.getElementById('updateHospitalBeds').value,
    };

    if (!validateForm(updatedInvestment)) {
        alert('All fields are required.');
        return;
    }

    try {
        await fetch(`http://localhost:3000/api/investments/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedInvestment),
        });
        alert('Investment updated successfully');
        fetchInvestments();
    } catch (error) {
        console.error('Error updating investment:', error);
        alert('Error updating investment');
    }
});

// Delete Investment
async function deleteInvestment(id) {
    try {
        await fetch(`http://localhost:3000/api/investments/${id}`, {
            method: 'DELETE',
        });
        alert('Investment deleted successfully');
        fetchInvestments();
    } catch (error) {
        console.error('Error deleting investment:', error);
        alert('Error deleting investment');
    }
}

function validateForm(investment) {
    return Object.values(investment).every(value => value !== '');
}
