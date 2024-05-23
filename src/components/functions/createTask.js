/**
 * Submits the form to the server and returns the server response.
 *
 * @param {Object} formData - The form data.
 * @return {Promise<Object>} The server response.
 */
export async function submitForm(formData, socket) {
  socket.emit("create-task", formData);

  // return await response.json();
}
