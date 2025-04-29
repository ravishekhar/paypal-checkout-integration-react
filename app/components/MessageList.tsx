import { InlineAlert, type IntentTypes } from "evergreen-ui";
import * as React from "react";
import { Pane } from "evergreen-ui";

export interface MessagesInput {
  title: React.ReactNode;
  intent?: "none" | "success" | "warning" | "danger";
  key: string;
}

export default function MessageList({
  messages,
}: {
  messages: MessagesInput[];
}) {
  return (
    <Pane>
      {messages.map((message) => (
        <InlineAlert
          key={message.key}
          intent={message.intent}
          marginBottom={16}
        >
          {message.title}
        </InlineAlert>
      ))}
    </Pane>
  );
}
