import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
// import html2pdf from 'html2pdf.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'react-bootstrap';
import "./App.css";
import { CiSearch } from "react-icons/ci";
import { RiFileExcel2Line } from "react-icons/ri";

function App() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);

  const handleFileUpload = (event) => {
    handleFileChange(event)
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const arrayBuffer = e.target.result;
      const wb = XLSX.read(arrayBuffer, { type: 'array' });

      // Assuming you are working with the first sheet
      const ws = wb.Sheets[wb.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(ws);
      setData(jsonData);
      setResult(jsonData)
    };

    reader.readAsArrayBuffer(file);
  };

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const handleQuerySearch = () => {
    const filteredData = data.filter((item) =>
      item.Pnr && item.Pnr.toString().toLowerCase().includes(query.toLowerCase())
    );
    setResult(filteredData);
  };

  // Function to export the result to PDF
  const exportToPDF = () => {
    const doc = new jsPDF('l', 'mm','a4',true);

    // Create a table from the result
    const tableHtml = `
      <table style="width:100%; border: 1px solid black;">
        <thead>
          <tr>
            <th style="border: 1px solid black; padding: 5px;">First Name</th>
            <th style="border: 1px solid black; padding: 5px;">Last Name</th>
            <th style="border: 1px solid black; padding: 5px;">Passport Number</th>
            <th style="border: 1px solid black; padding: 5px;">Address</th>
            <th style="border: 1px solid black; padding: 5px;">Date of Vaccine</th>
            <th style="border: 1px solid black; padding: 5px;">Valid Until</th>
            <th style="border: 1px solid black; padding: 5px;">Details of Vaccine</th>
            <th style="border: 1px solid black; padding: 5px;">Hospital Address</th>
            <th style="border: 1px solid black; padding: 5px;">Contact Number</th>
            <th style="border: 1px solid black; padding: 5px;">Pnr</th>
          </tr>
        </thead>
        <tbody>
          ${result
            .map(
              (row) => `
            <tr>
              <td style="border: 1px solid black; padding: 5px;">${row.First_name}</td>
              <td style="border: 1px solid black; padding: 5px;">${row.Last_name}</td>
              <td style="border: 1px solid black; padding: 5px;">${row.Passport_number}</td>
              <td style="border: 1px solid black; padding: 5px;">${row.Address}</td>
              <td style="border: 1px solid black; padding: 5px;">${row.Date_of_vaccine}</td>
              <td style="border: 1px solid black; padding: 5px;">${row.Valid_until}</td>
              <td style="border: 1px solid black; padding: 5px;">${row.Details_of_vaccine}</td>
              <td style="border: 1px solid black; padding: 5px;">${row.Hospital_address}</td>
              <td style="border: 1px solid black; padding: 5px;">${row.Contact_number}</td>
              <td style="border: 1px solid black; padding: 5px;">${row.Pnr}</td>
            </tr>
          `
            )
            .join('')}
        </tbody>
      </table>
    `;

    // Add the table HTML to the PDF document
    doc.html(tableHtml, {
      callback: function (doc) {
        doc.save('search_result.pdf');
      },
      margin: [20, 20, 20, 20],
      html2canvas: { scale: 0.3 },
    });
  };

  const [fileName, setFileName] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  return (
    <div className="App px-2 py-4">
      <div className='example1 mb-5'>
      <div className='d-flex inside'>
        <button type="button" className="btn btn-outline-success mx-2">Registration  code</button>
        <button type="button" className="btn btn-outline-success mx-2">Download certificate</button>
        <button type="button" className="btn btn-outline-success mx-2">Find vaccine centres</button>
        <button type="button" className="btn btn-outline-success mx-2">Schedule Appointment</button>
        <button type="button" className="btn btn-outline-success mx-2">FAQ</button>
        <button type="button" className="btn btn-outline-success mx-2">Contact Us</button>
      </div>
      </div>
      
      <div className='d-flex'>
      <div className="file-upload-container">
      <input
        type="file"
        id="file-upload"
        onChange={handleFileUpload}
        className="file-upload-input"
      />
      <label htmlFor="file-upload" className="file-upload-label">
        <span className="upload-icon">
        <RiFileExcel2Line />
        </span>
        {fileName ? fileName : 'Click to Select'}
      </label>
      {fileName && (
        <p className="file-name">Selected file: {fileName}</p>
      )}
    </div>

      </div>
      <div className='d-flex justify-content-end my-2'>
        <div className='position-relative'>
      <input
        type="text"
        value={query}
        onChange={handleQueryChange}
        placeholder="Search by Pnr"
        className='px-3 inputradius'
      />
      {/* <button onClick={handleQuerySearch}>Search</button> */}
      <CiSearch className='searchIcon' onClick={handleQuerySearch}></CiSearch>

        </div>
      </div>

      {/* Display search result */}
      <div className='mb-3 py-4'>
      {result ? (
        <div className='borders table-responsive'>
          {/* Table to display the search results */}
          <table class="table table-striped">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Passport Number</th>
                <th>Address</th>
                <th>Date of Vaccine</th>
                <th>Valid Until</th>
                <th>Details of Vaccine</th>
                <th>Hospital Address</th>
                <th>Contact Number</th>
                <th>Pnr</th>
              </tr>
            </thead>
            <tbody>
              {result.map((row, index) => (
                <tr key={index}>
                  <td>{row.First_name}</td>
                  <td>{row.Last_name}</td>
                  <td>{row.Passport_number}</td>
                  <td>{row.Address}</td>
                  <td>{row.Date_of_vaccine}</td>
                  <td>{row.Valid_until}</td>
                  <td>{row.Details_of_vaccine}</td>
                  <td>{row.Hospital_address}</td>
                  <td>{row.Contact_number}</td>
                  <td>{row.Pnr}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {result.length === 0 && (
                <div className='row m-0 justify-content-center'>
                  No Records
                </div>
                )}
          {/* <button ></button> */}
        </div>
      ):(
        <div className='borders table-responsive'>
          {/* Table to display the search results */}
          <table class="table table-striped">
            <thead>
              <tr>
              <th>First Name</th>
                <th>Last Name</th>
                <th>Passport Number</th>
                <th>Address</th>
                <th>Date of Vaccine</th>
                <th>Valid Until</th>
                <th>Details of Vaccine</th>
                <th>Hospital Address</th>
                <th>Contact Number</th>
                <th>Pnr</th>
              </tr>
            </thead>
            <tbody className=''>
              {data.map((row, index) => (
                <tr key={index}>
                  <td>{row.First_name}</td>
                  <td>{row.Last_name}</td>
                  <td>{row.Passport_number}</td>
                  <td>{row.Address}</td>
                  <td>{row.Date_of_vaccine}</td>
                  <td>{row.Valid_until}</td>
                  <td>{row.Details_of_vaccine}</td>
                  <td>{row.Hospital_address}</td>
                  <td>{row.Contact_number}</td>
                  <td>{row.Pnr}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {data.length === 0 && (
                <div className='row m-0 justify-content-center'>
                  No Records
                </div>
                )}
          {/* <button ></button> */}
        </div>
      )}

      </div>
      {data.length > 0 && (<div className='d-flex p-2' style={{justifyContent: 'right'}}>
          <Button variant="success" onClick={exportToPDF}>Export to PDF</Button>
          </div>)}
    </div>
  );
}

export default App;
