import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, FormControl, FormLabel } from "react-bootstrap";
import React, { useState } from "react";
function App() {
  const [id, setFiDsetIdles] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const [file, setFiles] = useState(null);
  const handler = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("file", file);
    await axios
      .post("http://localhost:4000/fileupload", formdata)
      .then((res) => {
        console.log("File sent!", res.data);
      })
      .catch((err) => {
        console.log("Upload error:", err);
      });
  };
  return (
    <div className="App">
      <section>
        <Form className="flex flex-col justify-center items-center min-h-screen bg-gray-500">
          <FormLabel>
            <FormControl
              type="file"
              encType="multipart/form-data"
              name="file"
              onChange={(e) => setFiles(e.target.files[0])}
            />
          </FormLabel>
          <Button onClick={handler}>Send</Button>
        </Form>
      </section>
    </div>
  );
}

export default App;
