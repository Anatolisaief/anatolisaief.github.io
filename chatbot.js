const input = document.getElementById("input");
const sendBtn = document.getElementById("sendBtn");
const chat = document.getElementById("chat");
const botTitle = document.getElementById("botTitle");
const botSubtitle = document.getElementById("botSubtitle");

const chatToggle = document.getElementById("chatToggle");
const chatWidget = document.getElementById("chatWidget");
const closeChat = document.getElementById("closeChat");

//Para que funcione en local y producción:
const API_BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://chatbot-07hc.onrender.com";

chatToggle.addEventListener("click", () => {
  chatWidget.classList.toggle("hidden");
});

closeChat.addEventListener("click", () => {
  chatWidget.classList.add("hidden");
});

async function loadBotConfig() {
  try {
    const response = await fetch(`${API_BASE_URL}/config`);
    const config = await response.json();

    if (botTitle) {
      botTitle.textContent = config.botName || "Asistente virtual";
    }

    if (botSubtitle) {
      botSubtitle.textContent = `Haz una pregunta sobre ${config.siteName || "el contenido disponible"}`;
    }

    if (config.theme) {
      const theme = config.theme;

      if (theme.primaryColor) {
        document.documentElement.style.setProperty("--chatbot-primary-color", theme.primaryColor);
      }
      if (theme.primaryColorHover) {
        document.documentElement.style.setProperty("--chatbot-primary-color-hover", theme.primaryColorHover);
      }
      if (theme.backgroundColor) {
        document.documentElement.style.setProperty("--chatbot-background-color", theme.backgroundColor);
      }
      if (theme.cardColor) {
        document.documentElement.style.setProperty("--chatbot-card-color", theme.cardColor);
      }
      if (theme.textColor) {
        document.documentElement.style.setProperty("--chatbot-text-color", theme.textColor);
      }
      if (theme.mutedTextColor) {
        document.documentElement.style.setProperty("--chatbot-muted-text-color", theme.mutedTextColor);
      }
      if (theme.borderColor) {
        document.documentElement.style.setProperty("--chatbot-border-color", theme.borderColor);
      }
      if (theme.inputBorderColor) {
        document.documentElement.style.setProperty("--chatbot-input-border-color", theme.inputBorderColor);
      }
      if (theme.botBubble) {
        document.documentElement.style.setProperty("--chatbot-bot-bubble", theme.botBubble);
      }
      if (theme.userBubble) {
        document.documentElement.style.setProperty("--chatbot-user-bubble", theme.userBubble);
      }
      if (theme.userBubbleText) {
        document.documentElement.style.setProperty("--chatbot-user-bubble-text", theme.userBubbleText);
      }
      if (theme.chatMessagesBg) {
        document.documentElement.style.setProperty("--chatbot-messages-bg", theme.chatMessagesBg);
      }
      if (theme.botAvatarBg) {
        document.documentElement.style.setProperty("--chatbot-bot-avatar-bg", theme.botAvatarBg);
      }
      if (theme.userAvatarBg) {
        document.documentElement.style.setProperty("--chatbot-user-avatar-bg", theme.userAvatarBg);
      }
      if (theme.headerAvatarBg) {
        document.documentElement.style.setProperty("--chatbot-header-avatar-bg", theme.headerAvatarBg);
      }
      if (theme.statusDotColor) {
        document.documentElement.style.setProperty("--chatbot-status-dot-color", theme.statusDotColor);
      }
      if (theme.shadowColor) {
        document.documentElement.style.setProperty("--chatbot-shadow-color", theme.shadowColor);
      }
      if (theme.toggleShadowColor) {
        document.documentElement.style.setProperty("--chatbot-toggle-shadow-color", theme.toggleShadowColor);
      }
      if (theme.borderRadiusCard) {
        document.documentElement.style.setProperty("--chatbot-border-radius-card", theme.borderRadiusCard);
      }
      if (theme.borderRadiusButton) {
        document.documentElement.style.setProperty("--chatbot-border-radius-button", theme.borderRadiusButton);
      }
      if (theme.fontFamily) {
        document.documentElement.style.setProperty("--chatbot-font-family", theme.fontFamily);
      }
      if (theme.inputTextColor) {
        document.documentElement.style.setProperty("--chatbot-input-text-color", theme.inputTextColor);
      }
      if (theme.inputBackgroundColor) {
        document.documentElement.style.setProperty("--chatbot-input-background-color", theme.inputBackgroundColor);
      }
      if (theme.placeholderColor) {
        document.documentElement.style.setProperty("--chatbot-placeholder-color", theme.placeholderColor);
      }
    }
  } catch (error) {
    console.error("No se pudo cargar la configuración del bot.");
  }
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function formatInline(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/(^|[^*])\*(?!\s)(.+?)(?<!\s)\*(?!\*)/g, "$1<em>$2</em>");
}

function formatMessage(text) {
  const safeText = escapeHtml(text);
  const lines = safeText.split("\n");

  let html = "";
  let inUl = false;
  let inOl = false;

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed) {
      if (inUl) {
        html += "</ul>";
        inUl = false;
      }
      if (inOl) {
        html += "</ol>";
        inOl = false;
      }
      continue;
    }

    if (/^#{1,6}\s+/.test(trimmed)) {
      if (inUl) {
        html += "</ul>";
        inUl = false;
      }
      if (inOl) {
        html += "</ol>";
        inOl = false;
      }

      const level = trimmed.match(/^#{1,6}/)[0].length;
      const headingText = trimmed.replace(/^#{1,6}\s+/, "");

      if (level === 1) {
        html += `<h2>${formatInline(headingText)}</h2>`;
      } else if (level === 2) {
        html += `<h3>${formatInline(headingText)}</h3>`;
      } else {
        html += `<h4>${formatInline(headingText)}</h4>`;
      }

      continue;
    }

    if (/^\d+\.\s+/.test(trimmed)) {
      if (inUl) {
        html += "</ul>";
        inUl = false;
      }
      if (!inOl) {
        html += "<ol>";
        inOl = true;
      }

      const itemText = trimmed.replace(/^\d+\.\s+/, "");
      html += `<li>${formatInline(itemText)}</li>`;
      continue;
    }

    if (/^[-•*]\s+/.test(trimmed)) {
      if (inOl) {
        html += "</ol>";
        inOl = false;
      }
      if (!inUl) {
        html += "<ul>";
        inUl = true;
      }

      const itemText = trimmed.replace(/^[-•*]\s+/, "");
      html += `<li>${formatInline(itemText)}</li>`;
      continue;
    }

    if (inUl) {
      html += "</ul>";
      inUl = false;
    }
    if (inOl) {
      html += "</ol>";
      inOl = false;
    }

    html += `<p>${formatInline(trimmed)}</p>`;
  }

  if (inUl) html += "</ul>";
  if (inOl) html += "</ol>";

  return html;
}

function addMessage(text, sender) {
  const messageWrapper = document.createElement("div");
  messageWrapper.classList.add("message", sender);

  const avatar = document.createElement("div");
  avatar.classList.add("avatar", sender === "bot" ? "bot-avatar" : "user-avatar");
  avatar.textContent = sender === "bot" ? "🤖" : "👤";

  const bubble = document.createElement("div");
  bubble.classList.add("message-bubble");
  bubble.innerHTML = formatMessage(text);

  if (sender === "bot") {
    messageWrapper.appendChild(avatar);
    messageWrapper.appendChild(bubble);
  } else {
    messageWrapper.appendChild(bubble);
    messageWrapper.appendChild(avatar);
  }

  chat.appendChild(messageWrapper);
  chat.scrollTop = chat.scrollHeight;
}

function addTypingIndicator() {
  const typing = document.createElement("div");
  typing.classList.add("message", "bot");
  typing.id = "typing-indicator";

  const avatar = document.createElement("div");
  avatar.classList.add("avatar", "bot-avatar");
  avatar.textContent = "🤖";

  const bubble = document.createElement("div");
  bubble.classList.add("message-bubble", "typing");
  bubble.textContent = "Escribiendo...";

  typing.appendChild(avatar);
  typing.appendChild(bubble);
  chat.appendChild(typing);
  chat.scrollTop = chat.scrollHeight;
}

function removeTypingIndicator() {
  const typing = document.getElementById("typing-indicator");
  if (typing) typing.remove();
}

async function sendMessage() {
  const message = input.value.trim();
  if (!message) return;

  sendBtn.disabled = true;
  input.disabled = true;

  addMessage(message, "user");
  input.value = "";
  addTypingIndicator();

  try {
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message })
    });

    const data = await response.json();
    removeTypingIndicator();
    addMessage(data.reply || "No se ha podido generar una respuesta.", "bot");
  } catch (error) {
    removeTypingIndicator();
    addMessage("Error al conectar con el servidor.", "bot");
  } finally {
    sendBtn.disabled = false;
    input.disabled = false;
    input.focus();
  }
}

sendBtn.addEventListener("click", sendMessage);

input.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    sendMessage();
  }
});

loadBotConfig();