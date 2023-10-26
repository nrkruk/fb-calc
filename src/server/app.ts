import express from "express";
const app = express();

app.get("/signin", (request, response) => {
  const lang = navigator.language;
  let url =
    "https://api.login.yahoo.com/oauth2/request_auth_fe?client_id=dj0yJmk9N1VYYlhZV0FXbXdjJmQ9WVdrOVYxVlNVV2RzUjBvbWNHbzlNQT09JnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PWQ1&response_type=code&redirect_uri=https://localhost:4000/dashboard&language=" +
    lang;
  response.redirect(url);
});

var dashboard_response = {};
app.get("/dashboard", (req, res) => {
  let authCode = req.query.code;
  let url = "https://api.login.yahoo.com/oauth2/get_token";
  let requestBody = {
    client_id:
      "dj0yJmk9Nfgdg1VYYlhZV0FXbXdjJmQ9WVdrOVYxVlNVV2RzUjBvbWNHbzlNQT09JnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PWQ1",
    client_secret: "b628a40ab1b5463fc35fdgf7e5527a795ecdb280be0b",
    redirect_uri: "https://localhost:4000/dashboard",
    code: authCode,
    grant_type: "authorization_code",
  };
  let data = Object.keys(requestBody)
    .map(
      (key) =>
        encodeURIComponent(key) + "=" + encodeURIComponent(requestBody[key])
    )
    .join("&");
  fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: data,
  }).then(function (response) {
    dashboard_response = response.json();
    return response.json();
  });
});

app.get('/refresh',(req,res) => {
    let refresh_token = dashboard_response.refresh_token;
    let url = 'https://api.login.yahoo.com/oauth2/get_token';
    let requestBody = {
        client_id :
            'dj0yJmk9Nfgdg1VYYlhZV0FXbXdjJmQ9WVdrOVYxVlNVV2RzUjBvbWNHbzlNQT09JnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PWQ1',
        client_secret :
            'b628a40ab1b5463fc35fdgf7e5527a795ecdb280be0b',
        redirect_uri : 'https://localhost:4000/dashboard',
        refresh_token : refresh_token,
        grant_type : 'refresh_token'
    };
    let data =
        Object.keys(requestBody).map(key=>encodeURIComponent(key) + '=' + encodeURIComponent(requestBody[key])).join('&');
    fetch(url, {
        method: 'post',
        headers: {
            'Content-Type':'application/x-www-form-urlencoded'
        },
        body: data
    }).then(function (response) {
        return response.json();
    });
});
