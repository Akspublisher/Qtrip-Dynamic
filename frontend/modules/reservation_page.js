import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
try {
  let res = await fetch(config.backendEndpoint + "/reservations");
  return await res.json();
} catch (error) {
  console.log(error);
}
return null;  
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
    console.log(reservations);
    if (reservations.length !== 0) {
      document.getElementById("no-reservation-banner").style.display = "none";  
      document
        .getElementById("reservation-table-parent")
        .setAttribute("style", "display:block");
      let div = document.getElementById("reservation-table");
  
      div.innerHTML = "";
      reservations.forEach((item) => {
        let bookingTime = new Date(item.time);
        const optionsDate = { day: "numeric", month: "long", year: "numeric" };
        const optionsTime = {
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: true,
        };
        const formattedDate2 = bookingTime.toLocaleDateString(
          "en-IN",
          optionsDate
        );
        const formattedTime = bookingTime.toLocaleTimeString(
          "en-IN",
          optionsTime
        );
        let formattedBookingTime = `${formattedDate2}, ${formattedTime}`;
  
        const date = new Date(item.date);
        let formattedDate1 = `${String(date.getDate())}/${String(
          date.getMonth() + 1
        )}/${date.getFullYear()}`;
  
        let row = `
        <tr>
        <td scope="col">${item.id}</td>
        <td scope="col">${item.name}</td>
        <td scope="col">${item.adventureName}</td>
        <td scope="col">${item.person}</td>
        <td scope="col">${formattedDate1}</td>
        <td scope="col">${item.price}</td>
        <td scope="col">${formattedBookingTime}</td>
        <td scope="col" id='${item.id}'><a href='detail/?adventure=${item.adventure}'><button class='reservation-visit-button'>Visit Adventure</button></a></th>
        </tr>
      `;
        div.innerHTML += row;
      });
    } else {
      document.getElementById("no-reservation-banner").style.display = "block";
      document.getElementById("reservation-table-parent").style.display = "none";
    }
}

export { fetchReservations, addReservationToTable };
