document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/api/investments')
      .then(response => response.json())
      .then(data => {
        const tableBody = document.querySelector('#investment-table tbody');
  
        data.forEach(item => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${item.hospitalName}</td>
            <td>${item.state}</td>
            <td>${item.country}</td>
            <td>${item.date}</td>
            <td>${item.investmentAmount}</td>
            <td>${item.hospitalStayLength}</td>
          `;
          tableBody.appendChild(row);
        });
      })
      .catch(error => console.error('Error fetching data:', error));
  });
  