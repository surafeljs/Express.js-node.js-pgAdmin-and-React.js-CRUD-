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

  const handlers = async (e) => {
    e.preventDefault();

    await axios
      .post("http://localhost:9000/post", {
        id: id,
        name: name,
        age: age,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="App">
      {/* <section>
        <Form className="flex flex-col justify-center items-center min-h-screen bg-gray-500">
          <FormLabel>
            <FormControl
              type="file"
              encType="multipart/form-data"
              name="file"
              onChange={(e) => setFiles(e.target.files[0])}
            />
          </FormLabel>
         
        </Form>
      </section> */}
      <form onSubmit={handler}>
        <input
          // value={file}
          type="file"
          name="file"
          onChange={(e) => setFiles(e.target.files[0])}
        />
        <button type="submit">Upload</button>
      </form>

      <form onSubmit={handlers}>
        <input
          type="text"
          name="file"
          onChange={(e) => setFiD(e.target.value)}
        />

        <input
          type="text"
          name="file"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          name="file"
          onChange={(e) => setAge(e.target.value)}
        />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default App;
