/**
 * Submits the form to the server and returns the server response.
 *
 * @param {Object} formData - The form data.
 * @return {Promise<Object>} The server response.
 */
export async function submitForm(formData) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  const raw = JSON.stringify(formData);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = fetch(
    "http://localhost:3001/api/tasks/create",
    requestOptions
  );

  return await response.json();
}
