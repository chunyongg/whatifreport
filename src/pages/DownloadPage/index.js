import React from "react";
import { useState } from "react";
import Papa from 'papaparse';
import getProcessedData from "./util";

function DownloadPage() {
  const [filter, setFilter] = useState('');
  const [files, setFiles] = useState([]);

  const handleChangeText = (e) => {
    setFilter(e.target.value);
  }

  const submit = (e) => {
    e.preventDefault();
    const res = getProcessedData(files, filter);
    const finalCsv = Papa.unparse(res);
    const blob = new Blob([finalCsv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", "download.csv");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  const handleFileChange = (e) => {
    if (e.target.files) {
      Papa.parse(e.target.files[0], {complete: callback});
    }
  };

  const callback = (res) => {
    setFiles(res);
  }

  return (
    <div>
      <p>Download formatted csv</p>
      <input type="text" onChange={handleChangeText} />
      <input type="file" onChange={handleFileChange} />
      <button onClick={submit}>Submit</button>
    </div>
  );
}

export default DownloadPage;
