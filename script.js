      function sendMessage() {
            const userMessage = document.getElementById("userInput").value;
            if (!userMessage) return;

            const chatBox = document.getElementById("chatBox");
            const userMessageElement = document.createElement("div");
            userMessageElement.classList.add("user-msg");
            userMessageElement.innerHTML = userMessage;
            chatBox.appendChild(userMessageElement);

            document.getElementById("userInput").value = '';
            chatBox.scrollTop = chatBox.scrollHeight;

            fetchGroqData(userMessage);
        }

        async function fetchGroqData(prompt) {
            const apiKey = "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"; // Remplace par ta clé API
            const url = "https://api.groq.com/openai/v1/chat/completions";

            const requestBody = {
                model: "llama3-8b-8192",
                messages: [{ role: "user", content: prompt }]
            };

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${apiKey}`
                    },
                    body: JSON.stringify(requestBody)
                });

                if (!response.ok) throw new Error('Failed to fetch data');

                const data = await response.json();
                const aiMessage = data.choices[0].message.content;

                const aiMessageElement = document.createElement("div");
                aiMessageElement.classList.add("ai-msg");
                aiMessageElement.innerHTML = aiMessage;
                document.getElementById("chatBox").appendChild(aiMessageElement);

                document.getElementById("chatBox").scrollTop = document.getElementById("chatBox").scrollHeight;
            } catch (error) {
                console.error("Error: ", error);
            }
        }
