import { Suspense, useEffect, useState, useTransition } from 'react';
import { useAccount, useEnsName , useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';


export function Account() {
  const { connect, isConnected } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();
  const [display, setDisplay] = useState('');
  const { data } = useAccount();
  const { data: name } = useEnsName({ address: data?.address });

  function renderDisplay() {
    if (data && data.address)
    name
      ? setDisplay(`${name} (${data?.address})`)
      : setDisplay(data?.address)
      ; 
  }

  useEffect(() => { renderDisplay(); }, []);

  return (
    <div>
    {
      isConnected
        ? (
          <div>
            <p>{display}</p>
            <button onClick={() => { disconnect() }}>Disconnect</button>
          </div>
        ) : (
          <button onClick={() => { connect(); renderDisplay(); }}>Connect</button>
        )
    }
    </div>
  )
}