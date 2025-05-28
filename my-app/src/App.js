import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, FormControl, FormLabel } from "react-bootstrap";
import React, { useState } from "react";
function App() {
  const [error, setError] = useState(null);
  const [succes, setSucces] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [file, setFiles] = useState(null);
  const [name, setName] = useState("");

  const [age, setAge] = useState("");

  const handler = async (e) => {
    if (!file) {
      alert("not empty");
      return;
    }

    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);
    formData.append("age", Number(age));

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
      <div className="flex justify-center ">
        {data.map((item, index) => {
          return (
            <div key={index}>
              <h2 className="text-[#FBDB93]">Profile</h2>
              <img
                src={`http://localhost:9000/uploads/${item.filename}`}
                alt="logo"
                className="w-32 h-32 rounded-full object-cover"
              ></img>
              <p>
                Name:
                <span className="text-[#309898] font-sans"> {item.name}</span>
              </p>
              <p>
                Age:
                <span className="text-[#309898] font-sans"> {item.age}</span>
              </p>
              {/* <p>Sex:{item.gender}</p> */}
            </div>
          );
        })}
      </div>
      <section className=" bg-[#626F47] flex flex-col justify-center items-center h-screen text-[#FFFDF6]">
        <div>
          <Form onSubmit={handler}>
            <FormLabel htmlFor="Name">Name</FormLabel>
            <FormControl
              required
              type="text"
              name="name"
              onChange={(e) => setName(e.target.value)}
            />{" "}
            <FormLabel htmlFor="Age">Age</FormLabel>
            <FormControl
              required
              type="number"
              name="age"
              onChange={(e) => setAge(e.target.value)}
            />{" "}
            {/* <FormLabel htmlFor="Gender">gender</FormLabel>
            <FormControl
              required
              type="text"
              name="gender"
              onChange={(e) => setGender(e.target.value)}
            /> */}
            <FormLabel htmlFor="Photo">Photo</FormLabel>
            <FormControl
              // value={file}
              type="file"
              name="file"
              accept="image/*"
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
            <p className="text-red-500 mt-3 p-2 rounded-lg opacity-85">
              {error}
            </p>
          )}
          {succes && (
            <p className="text-green-500 mt-3 p-2 rounded-lg opacity-85">
              {succes}
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

export default App;
