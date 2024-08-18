const BASE_URL = 'https://notes-api.dicoding.dev/v1';

function getAccessToken() {
  return localStorage.getItem('accessToken');
}

function putAccessToken(accessToken) {
  return localStorage.setItem('accessToken', accessToken);
}

async function fetchWithToken(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });

  const responseJson = await response.json();

  if (!response.ok) {
    if (response.status === 401) {
      // Handle unauthorized error, such as redirecting to login
      alert('Your session has expired. Please log in again.');
      putAccessToken(''); // Clear the token
      window.location.href = '/login'; // Redirect to login page
    } else {
      alert(responseJson.message || 'Something went wrong. Please try again later.');
    }
    return { error: true, data: null };
  }

  if (responseJson.status !== 'success') {
    alert(responseJson.message || 'Unexpected response status.');
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function login({ email, password }) {
  return fetchWithToken(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
}

async function register({ name, email, password }) {
  return fetchWithToken(`${BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  });
}

async function getUserLogged() {
  return fetchWithToken(`${BASE_URL}/users/me`);
}

async function addNote({ title, body }) {
  return fetchWithToken(`${BASE_URL}/notes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, body }),
  });
}

async function getActiveNotes() {
  return fetchWithToken(`${BASE_URL}/notes`);
}

async function getArchivedNotes() {
  return fetchWithToken(`${BASE_URL}/notes/archived`);
}

async function getNote(id) {
  return fetchWithToken(`${BASE_URL}/notes/${id}`);
}

async function archiveNote(id) {
  return fetchWithToken(`${BASE_URL}/notes/${id}/archive`, {
    method: 'POST',
  });
}

async function unarchiveNote(id) {
  return fetchWithToken(`${BASE_URL}/notes/${id}/unarchive`, {
    method: 'POST',
  });
}

async function deleteNote(id) {
  return fetchWithToken(`${BASE_URL}/notes/${id}`, {
    method: 'DELETE',
  });
}

export {
  getAccessToken,
  putAccessToken,
  login,
  register,
  getUserLogged,
  addNote,
  getActiveNotes,
  getArchivedNotes,
  getNote,
  archiveNote,
  unarchiveNote,
  deleteNote,
};
