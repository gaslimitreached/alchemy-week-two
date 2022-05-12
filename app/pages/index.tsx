import type { NextPage } from'next';
import { useState } from 'react';
import { useContractRead, useContractWrite, useSigner } from 'wagmi';
import { parseEther } from 'ethers/lib/utils';

import { Account } from './components/Account';
import { Messages } from './components/Messages';

import Barista from '../abis/Barista.json';
const addressOrName = '0x9693a93ca40669ebb2c3e136c63da876b09a951d';
const contractInterface = Barista.abi;

const Home: NextPage = () => {
  const [name, setName] = useState('');
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const { data: signer } = useSigner();
  const { isLoading, write } = useContractWrite(
    { addressOrName, contractInterface, signerOrProvider: signer },
    'buy',
    {
      args: [name, message],
      overrides: { value: parseEther('0.01')},
      onSuccess: () => {
        setName('');
        setMessage('');
      },
      onError: (error) => { console.log(error) }
    }
  )

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

  function sendCoffee(e: any) {
    e.preventDefault();
    write();
  }
  return (
    <div>
      <Account />
      <h1>Buy Me a Coffee</h1>
      <h2>Messages:</h2>
      <Messages messages={messages} /> 
      <form onSubmit={(e) => sendCoffee(e)}>
        <label>Name:</label>
        <br />
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <br />
        <label>Message:</label>
        <br />
        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
        <br />
        <input disabled={isLoading} type="submit" value="Submit"/>
      </form>
    </div>
  );
};

export default Home;
