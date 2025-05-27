import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, FormControl, FormLabel } from "react-bootstrap";
import React, { useState } from "react";
function App() {
  const [id, setFiD] = useState({
    id: "",
  });
  const [name, setName] = useState({
    name: "",
  });
  const [age, setAge] = useState({
    age: "",
  });

  const [file, setFiles] = useState(null);
  const handler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await axios.post(
        "http://localhost:9000/fileupload",
        formData
      );
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="App">
      <section className=" bg-[#626F47] flex justify-center items-center h-screen text-[#FFFDF6]">
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
            Upload
          </Button>
        </Form>
      </section>
    </div>
  );
}

export default App;
