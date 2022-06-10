import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";

const Contact = () => {

  const validEmail = new RegExp(
    "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$"
  );

  const defaultError = {
    name: undefined,
    email: undefined,
    message: undefined,
    request: undefined,
  };

  const [name, setName] = useState(undefined);
  const [email, setEmail] = useState(undefined);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState(undefined);

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(defaultError);

  useEffect(() => {
    if (name !== undefined) {
      if (name.length < 2) {
        setError((error) => {
          return { ...error, name: "Please enter your name." };
        });
      } else {
        setError((error) => {
          return { ...error, name: undefined };
        });
      }
    }
  }, [name]);

  useEffect(() => {
    if (email !== undefined) {
      if (!validEmail.test(email)) {
        setError((error) => {
          return { ...error, email: "Please enter a valid email address." };
        });
      } else {
        setError((error) => {
          return { ...error, email: undefined };
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  useEffect(() => {
    if (message !== undefined) {
      if (message.length < 15) {
        setError((error) => {
          return {
            ...error,
            message:
              "Please enter a message that is at least 15 characters long.",
          };
        });
      } else {
        setError((error) => {
          return { ...error, message: undefined };
        });
      }
    }
  }, [message]);

  const submit = () => {
    if (name === undefined || email === undefined || message === undefined) {
      setName("");
      setEmail("");
      setMessage("");
      return;
    }

    if (error.name || error.email || error.message) {
      return;
    }

    setLoading(true);
    setSubmitted(false);
    setError(defaultError);

    const data = { name, email, subject, message };

    fetch(
      "https://public.herotofu.com/v1/3bf41850-e5ca-11ec-a7c6-13f77fe97b07",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((response) => {
        if (response.status !== 200) {
          if (response.status === 422) {
            setError((error) => {
              return {
                ...error,
                request: "This message was already delivered.",
              };
            });
          } else {
            setError((error) => {
              return {
                ...error,
                request: `${response.statusText} (${response.status})`,
              };
            });
          }
        }
      })
      .then(() => {
        setSubmitted(true);
        setLoading(false);
      })
      .catch((err) => {
        setError((error) => {
          return { ...error, request: err.toString() };
        });
        setLoading(false);
      });
  };

  return (
    <Box
      sx={{
        p: "2rem",
        mx: "auto",
        color: "text.primary"
      }}
      maxWidth="100vh"
      className="contact"
    >
      {/* NAME FIELD */}
      <TextField
        margin="normal"
        required
        fullWidth
        id="name"
        label="Name"
        name="name"
        variant="filled"
        error={error.name !== undefined}
        helperText={error.name}
        onChange={(e) => setName(e.target.value)}
      />
      {/* E-MAIL FIELD */}
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="E-mail Address"
        name="email"
        autoComplete="email"
        variant="filled"
        error={error.email !== undefined}
        helperText={error.email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {/* SUBJECT FIELD */}
      <TextField
        margin="normal"
        fullWidth
        id="subject"
        label="Subject"
        name="subject"
        variant="filled"
        onChange={(e) => setSubject(e.target.value)}
      />
      {/* MESSAGE FIELD */}
      <TextField
        margin="normal"
        multiline
        required
        fullWidth
        id="message"
        label="Message"
        name="message"
        minRows={6}
        error={error.message !== undefined}
        helperText={error.message}
        onChange={(e) => setMessage(e.target.value)}
        variant="filled"
      />
      {/* SEND BUTTON */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "right",
        }}
      >
        <Button
          size="large"
          disableElevation
          variant="contained"
          color="primary"
          onClick={submit}
        >
          <Typography align="center" variant="button">
            <b>SEND</b>
          </Typography>
        </Button>
        <Box sx={{ p: 1, mx: "auto"}}>
          {loading && <CircularProgress/>}
          {error.request !== undefined && <Box sx={{ color: "red" }}>{error.request}</Box>}
          {(submitted && error.request === undefined) && <Box sx={{ color: "green" }}>Your message was successfully delivered.</Box>}
        </Box>
      </Box>
    </Box>
  );
};

export default Contact;
