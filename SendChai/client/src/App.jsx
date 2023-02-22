import abi from './contract/chai.json';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Buy from './components/Buy';
import Memos from './components/Memos';
import './App.css';

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = '0x50440299d357b19149b1a11ab3e9b827962d797e';
      const contractAbi = abi.abi;
      try {
        const { ethereum } = window;

        if (ethereum) {
          const account = await ethereum.request({
            method: 'eth_requestAccounts',
          });
        }
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractAbi,
          signer
        );
        setState({ provider, signer, contract });
      } catch (e) {
        console.log(e);
      }
    };
    connectWallet();
  }, []);
  console.log(state);

  return <div className="App">
    <Buy state={state} />
    <Memos state={state} />
  </div>;
}

export default App;
