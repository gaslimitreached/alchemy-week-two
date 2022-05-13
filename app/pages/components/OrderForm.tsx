import { useState } from 'react';
import { useContractWrite, useSigner } from 'wagmi';
import { parseEther } from 'ethers/lib/utils';

import Barista from '../../abis/Barista.json';
const addressOrName = '0x9693a93ca40669ebb2c3e136c63da876b09a951d';
const contractInterface = Barista.abi;

export function OrderForm() {
  const [name, setName] = useState('');
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

  function sendCoffee(e: any) {
    e.preventDefault();
    write();
  }

  return (
    <div>
      <h1>Buy Me a Coffee</h1>
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
  )
}