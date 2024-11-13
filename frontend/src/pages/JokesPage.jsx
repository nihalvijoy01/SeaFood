import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";

export default function JokesPage() {
  const [joke, setJokeState] = useState("");
  const [ip, setIP] = useState("");
  const [customIP, setCustomIP] = useState("");

  useEffect(() => {
    async function fetchIP() {
      try {
        const response = await axios.get("https://api.ipify.org?format=json");
        setIP(response.data.ip); // Set the IP address state
      } catch (error) {
        console.error("Error fetching IP:", error);
      }
    }
    fetchIP();
  }, []);

  async function handleClick() {
    const targetIP = customIP || ip;
    const jokesurl = `https://ipinfo.io/${targetIP}/geo`; // Use the input IP address
    try {
      const response = await axios.get(jokesurl);
      setJokeState(
        `Location: ${response.data.city}, ${response.data.region}, ${response.data.country} Organisation: ${response.data.org} `
      );
    } catch (error) {
      console.error("Error fetching data:", error);
      setJokeState("Failed to fetch data.");
    }
  }

  function handleCustomIPChange(event) {
    setCustomIP(event.target.value); // Update custom IP state
  }

  return (
    <div>
      <p>Your IP Address: {ip}</p>
      <input
        type="text"
        placeholder="Enter custom IP"
        onChange={handleCustomIPChange}
        className="bg-slate-200 rounded-md m-2 p-2"
      />
      <button onClick={handleClick}>Get Location</button>
      {joke && <p>{joke}</p>} {/* Display the fetched location information */}
    </div>
  );
}


