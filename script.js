const tbody = document.getElementById("output");

// Add loading row
tbody.innerHTML = `
  <tr id="loading">
    <td colspan="2">Loading...</td>
  </tr>
`;

function createPromise(name) {
  const delay = Math.random() * 2 + 1; // random 1-3 sec
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ name, time: delay });
    }, delay * 1000);
  });
}

const p1 = createPromise("Promise 1");
const p2 = createPromise("Promise 2");
const p3 = createPromise("Promise 3");

const startTime = performance.now();

Promise.all([p1, p2, p3])
  .then(results => {
    // remove loading row
    tbody.innerHTML = "";

    results.forEach((result, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>Promise ${index + 1}</td>
        <td>${result.time.toFixed(3)}</td>
      `;
      tbody.appendChild(row);
    });

    const totalTime = (performance.now() - startTime) / 1000;

    const totalRow = document.createElement("tr");
    totalRow.innerHTML = `
      <td>Total</td>
      <td>${totalTime.toFixed(3)}</td>
    `;
    tbody.appendChild(totalRow);
  });
