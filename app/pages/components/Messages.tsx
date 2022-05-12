interface Message {
  message: string,
  name: string,
}

interface MessageProps {
  messages: Message[]
}

export function Messages({ messages }: MessageProps) {
  return (
    <ol>
        {
          messages.map((m: Message, index: number) => {
            return <li key={index}>{`${m.name}: ${m.message}`}</li>
          })
        }
    </ol>
  );
}