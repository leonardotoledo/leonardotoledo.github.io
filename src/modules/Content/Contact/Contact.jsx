import React, { useState, useEffect } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Snackbar,
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

  const defaultForm = {
    name: undefined,
    email: undefined,
    subject: "",
    message: undefined,
  };

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(defaultForm);
  const [error, setError] = useState(defaultError);
  const [openAlert, setOpenAlert] = useState(true);

  useEffect(() => {
    if (form.name !== undefined) {
      if (form.name.length < 2) {
        setError((error) => {
          return { ...error, name: "Please enter your name." };
        });
      } else {
        setError((error) => {
          return { ...error, name: undefined };
        });
      }
    }
  }, [form.name]);

  useEffect(() => {
    if (form.email !== undefined) {
      if (!validEmail.test(form.email)) {
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
  }, [form.email]);

  useEffect(() => {
    if (form.message !== undefined) {
      if (form.message.length < 15) {
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
  }, [form.message]);

  const submit = () => {
    if (
      form.name === undefined ||
      form.email === undefined ||
      form.message === undefined
    ) {
      setForm((prev) => {
        return { ...prev, name: "", email: "", message: "" };
      });
      return;
    }

    if (error.name || error.email || error.message) {
      return;
    }

    setLoading(true);
    setSubmitted(false);
    setOpenAlert(true);
    setError(defaultError);

    fetch(
      "https://public.herotofu.com/v1/3bf41850-e5ca-11ec-a7c6-13f77fe97b07",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
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
        color: "text.primary",
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
        onChange={(e) =>
          setForm((prev) => {
            return { ...prev, name: e.target.value };
          })
        }
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
        onChange={(e) =>
          setForm((prev) => {
            return { ...prev, email: e.target.value };
          })
        }
      />
      {/* SUBJECT FIELD */}
      <TextField
        margin="normal"
        fullWidth
        id="subject"
        label="Subject"
        name="subject"
        variant="filled"
        onChange={(e) =>
          setForm((prev) => {
            return { ...prev, subject: e.target.value };
          })
        }
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
        onChange={(e) =>
          setForm((prev) => {
            return { ...prev, message: e.target.value };
          })
        }
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
        <Box sx={{ p: 1, mx: "auto" }}>
          {loading && <CircularProgress />}
          {(openAlert && error.request !== undefined) && (
            <Snackbar
              open
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              autoHideDuration={6000}
              onClose={() => setOpenAlert(false)}
            >
              <Alert onClose={() => setOpenAlert(false)} severity="error" sx={{ width: "100%" }}>
              {error.request}
              </Alert>
            </Snackbar>
          )}
          {(openAlert && submitted && error.request === undefined) && (
            <Snackbar
              open
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              autoHideDuration={6000}
              onClose={() => setOpenAlert(false)}
            >
              <Alert onClose={() => setOpenAlert(false)} severity="success" sx={{ width: "100%" }}>
                Your message was successfully delivered
              </Alert>
            </Snackbar>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Contact;
