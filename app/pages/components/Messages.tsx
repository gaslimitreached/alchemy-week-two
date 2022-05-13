import { useState } from 'react';
import { useContractRead } from 'wagmi';

import Barista from '../../abis/Barista.json';
const addressOrName = '0x9693a93ca40669ebb2c3e136c63da876b09a951d';
const contractInterface = Barista.abi;

interface Message {
  message: string,
  name: string,
}

export function Messages() {
  const [messages, setMessages] = useState([]);
  useContractRead(
    { addressOrName, contractInterface },
    'getAll',
    {
      watch: true,
      onSuccess: (data: any) => {
        const messages = data.map((raw: any[]) => {
          const [, , name, message] = raw;
          return { name, message }
        });
        setMessages(messages);
      }
    }
  );

  return (
    <div>
      <h2>Sent Messages:</h2>
      <ol>
          {
            messages.map((m: Message, index: number) => {
              return <li key={index}>{`${m.name}: ${m.message}`}</li>
            })
          }
      </ol>
    </div>
  );
}