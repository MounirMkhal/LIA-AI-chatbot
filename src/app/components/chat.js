"use client";

import {
  Box,
  TextField,
  Avatar,
  AppBar,
  Toolbar,
  Typography,
  Container,
  IconButton,
  CssBaseline,
  Stack,
} from "@mui/material";
import { useChat } from "ai/react";
import { marked } from "marked";
import DOMPurify from "dompurify";
import SendIcon from "@mui/icons-material/Send";
import { useEffect, useState } from "react";
import { avatarImg } from "../../data/index";
import "@fontsource/roboto";

export function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "api/chat",
    onError: (e) => {
      console.log(e);
    },
  });

  const [initialMessages, setInitialMessages] = useState([
    {
      id: "1",
      role: "assistant",
      content: "Hello! My name is LIA, I am here to help you become a better trader! Ask me anything regarding crypto trading.",
    },
  ]);

  // Combine initialMessages with any new messages
  const combinedMessages = [...initialMessages, ...messages];

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          backgroundImage: 'url("https://cdn.discordapp.com/attachments/1312932606802792450/1314001204329582693/Screenshot_2024-12-04_at_2.51.08_PM.png?ex=67522e7c&is=6750dcfc&hm=2fb7e1354f907f33b2bdf5fcba7ce0d09ef6f333e2f65522c2c599790df39be7&")',
          backgroundSize: "fill",
          backgroundPosition: "center",
          fontFamily: 'Roboto, sans-serif',
        }}
      >
        <AppBar position="static" sx={{ backgroundImage: 'url("https://cdn.discordapp.com/attachments/1312932606802792450/1314001204329582693/Screenshot_2024-12-04_at_2.51.08_PM.png?ex=67522e7c&is=6750dcfc&hm=2fb7e1354f907f33b2bdf5fcba7ce0d09ef6f333e2f65522c2c599790df39be7&")', }} elevation={0}>
          <Toolbar sx={{ justifyContent: "space-between", padding: "1rem" }}>
            <Box
              component="img"
              src="/images/logo.png"
              alt="Logo"
              sx={{ height: 100, width: 100 }}
            />
          </Toolbar>
        </AppBar>

        <Container sx={{ flexGrow: 1, py: 3 }}>
          <Stack
            direction={"column"}
            spacing={2}
            flexGrow={1}
            sx={{
              bgcolor: "rgba(255, 255, 255, 0.8)",
              borderRadius: 2,
              boxShadow: 3,
              overflow: "hidden",
              height: "100%",
              maxHeight: "100%",
            }}
          >
            <Box sx={{ overflowY: "auto", px: 3, py: 2, flexGrow: 1, backgroundImage: 'url("https://cdn.discordapp.com/attachments/1312932606802792450/1314001204329582693/Screenshot_2024-12-04_at_2.51.08_PM.png?ex=67522e7c&is=6750dcfc&hm=2fb7e1354f907f33b2bdf5fcba7ce0d09ef6f333e2f65522c2c599790df39be7&")', }}>
              {combinedMessages.map((message, index) => {
                const isUser = message.role === "user";
                return (
                  <Box
                    key={index}
                    display="flex"
                    alignItems="flex-start"
                    justifyContent={isUser ? "flex-end" : "flex-start"}
                    sx={{
                      mb: 2,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.02)",
                        backgroundImage: 'url("https://cdn.discordapp.com/attachments/1312932606802792450/1314001204329582693/Screenshot_2024-12-04_at_2.51.08_PM.png?ex=67522e7c&is=6750dcfc&hm=2fb7e1354f907f33b2bdf5fcba7ce0d09ef6f333e2f65522c2c599790df39be7&")',
                      },
                    }}
                  >
                    {!isUser && (
                      <Avatar
                        alt="Assistant"
                        src={`/images/${avatarImg}`}
                        sx={{ marginRight: 2 }}
                      />
                    )}
                    <Box
                      color="white"
                      borderRadius={16}
                      p={2}
                      maxWidth="70%"
                      dangerouslySetInnerHTML={{
                        __html: marked(message.content),
                      }}
                    />
                    {isUser && (
                      <Avatar
                        alt="User"
                        src="/images/user-avatar.png"
                        sx={{ marginLeft: 2 }}
                      />
                    )}
                  </Box>
                );
              })}
            </Box>

            <Box
              sx={{
                borderTop: 1,
                borderColor: "divider",
                p: 2,
                display: "flex",
                alignItems: "center",
                backgroundImage: 'url("https://cdn.discordapp.com/attachments/1312932606802792450/1314001204329582693/Screenshot_2024-12-04_at_2.51.08_PM.png?ex=67522e7c&is=6750dcfc&hm=2fb7e1354f907f33b2bdf5fcba7ce0d09ef6f333e2f65522c2c599790df39be7&")',
              }}
            >
              <TextField
                label="Type your message"
                fullWidth
                value={input}
                onChange={handleInputChange}
                variant="outlined"
                sx={{
                  marginRight: 2,
                  bgcolor: "grey.100",
                  borderRadius: 2,
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: 'white',
                    },
                  },
                }}
              />
              <IconButton color="primary" onClick={handleSubmit}>
                <SendIcon />
              </IconButton>
            </Box>
          </Stack>
        </Container>
      </Box>
    </>
  );
}

