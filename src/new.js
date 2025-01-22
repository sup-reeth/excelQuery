import React, { useState } from 'react';
import axios from 'axios';
import { CiSearch } from "react-icons/ci";
import "../src/App.css";

const GoogleSheetPNRFetcher = () => {
  const [pnrInput, setPnrInput] = useState('');
  const [pnrData, setPnrData] = useState(null);
  const [loading, setLoading] = useState(false);

  const spreadsheetId = '1Bj0Njm0qguT4aVlkB462aExnvJNXP9CbdA3w0N4iKtE'; // Replace with your Google Sheet ID
  const apiKey = 'AIzaSyDPnlG2WVD4CC90dZuTG-cR1FKoYi4Y7Vo'; // Replace with your Google Sheets API key
  const range = 'Sheet1!A:J'; // Adjust the range to match your sheet's range (e.g., columns A to D)

  const fetchPNRData = async () => {
    try {
      setLoading(true);

      // Fetch data from Google Sheets
      const response = await axios.get(
        `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`
      );

      // The values returned from Google Sheets API
      const rows = response.data.values;

      // If data is available, map it into a usable format
      if (rows && rows.length > 0) {
        console.log('rows', rows)
        // Assuming first row contains headers
        const headers = rows[0];

        // Map rows into objects
        const formattedData = rows.slice(1).map((row) => {
          return {
                   First_name: row[0],
                   Last_name: row[1],
                   Passport_number: row[2],
                   Address: row[3],
                   Date_of_vaccine: row[4],
                   Valid_until: row[5],
                   Details_of_vaccine: row[6],
                   Hospital_address: row[7],
                   Contact_number: row[8],
                   Pnr: row[9],
          };
        });

        // Filter by PNR
        const filteredData = formattedData.filter((data) =>
          // data.Pnr.toLowerCase().includes(pnrInput.toLowerCase())
        data.Pnr.toLowerCase() === pnrInput.toLowerCase()
        );

        setPnrData(filteredData);
      }
    } catch (error) {
      console.error('Error fetching data from Google Sheets:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=''>
      {/* <h1>PNR Lookup</h1>
      <input
        type="text"
        placeholder="Enter PNR"
        value={pnrInput}
        onChange={(e) => setPnrInput(e.target.value)}
      />
      <button onClick={fetchPNRData} disabled={loading}>
        {loading ? 'Loading...' : 'Fetch Data'}
      </button> */}
{/* <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#"><img src="https://www.rayntourism.com/RaynLogo.png" className='logo' /></a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
    <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Registration</a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Download certificate</a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Vaccine center</a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Schedule Appointment</a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">FAQ</a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Contact Us</a>
        </li>
    </ul>
  </div>
</nav> */}
<nav class="navbar navbar-expand-lg navbar-dark bgblack">
  <a class="navbar-brand" href="#">
  <img src="https://www.rayntourism.com/RaynLogo.png" className='logo' />
    </a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <a class="nav-link" href="#">Home</a>
      </li>
      <li class="nav-item active">
        <a class="nav-link" href="#">Registration</a>
      </li>
      <li class="nav-item active">
        <a class="nav-link" href="#">Download certificate</a>
      </li>
      <li class="nav-item active">
        <a class="nav-link" href="#">Vaccine center</a>
      </li>
      <li class="nav-item active">
        <a class="nav-link" href="#">Schedule Appointment</a>
      </li>
      <li class="nav-item active">
        <a class="nav-link" href="#">FAQ</a>
      </li>
      <li class="nav-item active">
        <a class="nav-link" href="#">Contact Us</a>
      </li>
    </ul>
  </div>
</nav>
<div className='bgImage pt-5'>
      <div class="form-group form-search mb-3">
        <input 
        class="form-control form-control-search" 
        type="text"
        placeholder="Enter PNR"
        value={pnrInput}
        onChange={(e) => setPnrInput(e.target.value)} 
        />
        <button onClick={fetchPNRData} disabled={loading} class="btn btn-black btn-submit">
            {/* <i class="icon-search icon-2x"></i> */}
            <CiSearch className='fontSize20' />
        </button>

    </div>
    {pnrData && pnrData.length > 0 ? (
        <div className='containers'>
          {pnrData.map((data, index) => (
            <div className='row mb-3 divContainer' key={index}>
                <div className='col-4 col-md-3 col-lg-3 text-break text-center p-3'>
                First Name
                <div>
                <strong>
                {data.First_name}
                </strong>
                </div>
                </div>
                <div className='col-4 col-md-3 col-lg-3 text-break text-center p-3'>
                Last Name
                <div>
                <strong>
                {data.Last_name}
                </strong>
                </div>
                </div>

                <div className='col-4 col-md-3 col-lg-3 text-break text-center p-3'>
                Passport Number
                <div>
                <strong>{data.Passport_number}</strong>
                </div>
                </div>
              
                <div className='col-4 col-md-3 col-lg-3 text-break text-center p-3'>
                Address
                <div>
                <strong>{data.Address}</strong>
                </div>
                </div>

                <div className='col-4 col-md-3 col-lg-3 text-break text-center p-3'>
                Date of Vaccine
                <div>
                <strong>{data.Date_of_vaccine}</strong>
                </div>
                </div>
                <div className='col-4 col-md-3 col-lg-3 text-break text-center p-3'>
                Valid Until
                <div>
                <strong>{data.Valid_until}</strong>
                </div>
                </div>
                <div className='col-4 col-md-3 col-lg-3 text-break text-center p-3'>
                Details of Vaccine
                <div>
                <strong>{data.Details_of_vaccine}</strong>
                </div>
                </div>
                <div className='col-4 col-md-3 col-lg-3 text-break text-center p-3'>
                Hospital Address
                <div>
                <strong>{data.Details_of_vaccine}</strong>
                </div>
                </div>
                <div className='col-4 col-md-3 col-lg-3 text-break text-center p-3'>
                Contact Number
                <div>
                <strong>{data.Contact_number}</strong>
                </div>
                </div>
                <div className='col-4 col-md-3 col-lg-3 text-break text-center p-3'>
                Pnr
                <div>
                <strong>{data.Pnr}</strong>
                </div>
                </div>
              {/* <strong>Date of Vaccine:</strong> {data.Date_of_vaccine} <br />
              <strong>Valid Until:</strong> {data.Valid_until} <br />
              <strong>Details of Vaccine:</strong> {data.Details_of_vaccine} <br />
              <strong>Hospital Address:</strong> {data.Hospital_address} <br />
              <strong>Contact Number:</strong> {data.Contact_number} <br />
              <strong>Pnr:</strong> {data.Pnr} <br /> */}
            </div>
          ))}
        </div>
      ) : (
        <div className='row m-0 justify-content-center'>No data found or enter a valid PNR.</div>
      )}
  </div>
    {loading ? 'Loading...' : ''}
      
    </div>
  );
};

export default GoogleSheetPNRFetcher;
