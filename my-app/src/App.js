import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, FormControl } from "react-bootstrap";
import React, { useState } from "react";
function App() {
  const [error, setError] = useState(null);
  const [succes, setSucces] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [file, setFiles] = useState(null);
  const handler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:9000/fileupload",
        formData
      );
      if (res.status === 201) {
        setSucces(res.data.message);
        setData([res.data.file]);
        setError(null);
      } else {
        setError("File upload failed");
      }
    } catch (err) {
      console.error(err);
      setError("File upload failed");
      setSucces(null);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      {data.map((item) => (
        <div key={item.id} className="bg-[#FFFDF6] p-3 rounded-lg shadow-lg">
          <h2 className="text-[#626F47]">{item.name}</h2>
          <p>File Name: {item.filename}</p>
          <p>File Type: {item.mimetype}</p>
          <p>File Size: {item.size} bytes</p>
          <a
            href={`http://localhost:9000/uploads/${item.filename}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#626F47] underline"
          >
            View File
          </a>
        </div>
      ))}
      <section className=" bg-[#626F47] flex flex-col justify-center items-center h-screen text-[#FFFDF6]">
        <div>
          <Form onSubmit={handler}>
            <FormControl
              // value={file}
              type="file"
              name="file"
              onChange={(e) => setFiles(e.target.files[0])}
            />
            <Button
              className=" mt-3  w-full"
              variant="outline-dark"
              type="submit"
            >
              {loading ? "Uploading..." : "Upload File"}
            </Button>
          </Form>
        </div>
        <div>
          {error && (
            <p className="bg-red-500 mt-3 p-2 rounded-lg opacity-85">{error}</p>
          )}
          {succes && (
            <p className="bg-green-500 mt-3 p-2 rounded-lg opacity-85">
              {succes}
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

export default App;
