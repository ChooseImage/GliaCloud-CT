const apiUrl =
  "https://data3p-al23s7k26q-de.a.run.app/weather/current?area=taipei";

// Define an async function to fetch the weather data
export async function fetchWeatherData() {
  try {
    const response = await fetch(apiUrl); // Await the response of the fetch call
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`); // Check if the response was successful
    }
    const data = await response.json(); // Await the parsing of the JSON
    console.log(data); // Log the data to the console for debugging
    return data; // Return the data for further use
  } catch (error) {
    console.error("There was an error fetching the weather data:", error);
  }
}
