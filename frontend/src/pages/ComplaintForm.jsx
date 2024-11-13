import React, { useState } from "react";
import axios from "axios";

const ComplaintForm = () => {
  const [formData, setFormData] = useState({
    sub: "",
    desc: "",
    date: "",
  });
  const [responseMessage, setResponseMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/app1/complaints/",
        formData
      );
      setResponseMessage("Complaint submitted successfully!");
      setErrorMessage("");
      setFormData({ sub: "", desc: "", date: "" }); // Reset the form
    } catch (error) {
      setErrorMessage("Error submitting complaint. Please try again.");
      setResponseMessage("");
    }
  };

  return (
    // <div className="bg-blue-100 block justify-center w-3/6">
    //   <h2 className="text-center font-semibold ">Submit a Complaint</h2>
    //   <form onSubmit={handleSubmit}>
    //     <div>
    //       <label>
    //         Sub:
    //         <input
    //           type="text"
    //           name="sub"
    //           value={formData.sub}
    //           onChange={handleChange}
    //           required
    //           className="border-2 border-slate-800 rounded-md m-2"
    //         />
    //       </label>
    //     </div>
    //     <div>
    //       <label>
    //         Date:
    //         <input
    //           type="date"
    //           name="date"
    //           value={formData.date}
    //           onChange={handleChange}
    //           required
    //           className="border-2 border-slate-800 rounded-md m-2"
    //         />
    //       </label>
    //     </div>
    //     <div>
    //       <label>
    //         Desc:
    //         <textarea
    //           name="desc"
    //           value={formData.desc}
    //           onChange={handleChange}
    //           required
    //           className="border-2 border-slate-800 rounded-md m-2"
    //         />
    //       </label>
    //     </div>
    //     <button
    //       type="submit"
    //       className="bg-green-500 p-2 m-2 rounded-md text-white"
    //     >
    //       Submit
    //     </button>
    //   </form>
    //   {responseMessage && <p style={{ color: "green" }}>{responseMessage}</p>}
    //   {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    // </div>

    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="max-w-lg w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h2 className="text-center font-semibold text-lg ">
          Submit a Complaint
        </h2>
        <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="base-input"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Subject
            </label>
            <input
              type="text"
              id="base-input"
              name="sub"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={formData.sub}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Date:
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="border-2 border-slate-800 rounded-md m-2"
              />
            </label>
          </div>

          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your message
          </label>
          <textarea
            name="desc"
            value={formData.desc}
            onChange={handleChange}
            id="message"
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write your thoughts here..."
          ></textarea>
          <div className="m-2 flex justify-center">
            <button
              type="submit"
              className=" text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              Submit
            </button>
          </div>
        </form>
        {responseMessage && (
          <p className="text-center text-green-500">{responseMessage}</p>
        )}
        {errorMessage && (
          <p className="text-center text-red-500">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export default ComplaintForm;
