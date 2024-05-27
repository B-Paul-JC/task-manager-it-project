export const submitApplication = (formData) =>
  fetch("http://localhost:3000/api/teams/apply", {
    method: "POST",
    body: formData,
  });

export const login = ({ staffId, password }) =>
  fetch("http://localhost:3000/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ staffId, password }),
  });
