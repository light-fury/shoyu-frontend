import { useState, useRef } from 'react'
import { ethers } from 'ethers'
import { toast } from 'react-toastify'
import BigNumber from 'bignumber.js'
import { ERC20ABI, SushiRoll, SushiRollABI, tokenAddrToName,
  tokenInfo, UniFactory, UniFactoryABI, UniPairABI, ZeroAddr
} from './utils'

// Hook
export const useMetamask = () => {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/

  const [walletAddr, setWalletAddr] = useState('')
  const [pairAddr, setPairAddr] = useState('')
  const [userLPAmt, setUserLPAmt] = useState('')
  const [leftTokenLP, setLeftTokenLP] = useState('')
  const [rightTokenLP, setRightTokenLP] = useState('')
  const walletAddrRef = useRef(null)
  const pairAddrRef = useRef(null)
  const userLPRef = useRef(null)
  const leftTokenLPRef = useRef(null)
  const rightTokenLPRef = useRef(null)
  walletAddrRef.current = walletAddr
  pairAddrRef.current = pairAddr
  userLPRef.current = userLPAmt
  leftTokenLPRef.current = leftTokenLP
  rightTokenLPRef.current = rightTokenLP

  const disconnectWallet = async() => {
    setWalletAddr('')
  }

  const connectWallet = async () => {
    if (walletAddr.length > 0) {
      return
    }
    // Connect to the network
    await window.ethereum.enable()
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const currentNetwork = await provider.getNetwork()
    if (currentNetwork.chainId === 42) {
      const signer = provider.getSigner()
      const walletAddress = await signer.getAddress()
      setWalletAddr(walletAddress)
    } else {
      toast.error('Invalid network\nPlease select Kovan testnet.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      })
      setWalletAddr('')
    }
  }

  const calculateUniLP = async (firstToken, secondToken) => {
    try {
      await connectWallet()
      if (walletAddrRef.current.length > 0) {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()

        const UniFactoryContract = new ethers.Contract(UniFactory, UniFactoryABI, provider)
        let pairAddr = await UniFactoryContract.getPair(firstToken, secondToken)
        if (pairAddr === ZeroAddr) {
          const UniFactoryContractSigned = UniFactoryContract.connect(signer)
          await (await UniFactoryContractSigned.createPair(firstToken, secondToken)).wait()
          pairAddr = await UniFactoryContract.getPair(firstToken, secondToken)
        }
        setPairAddr(pairAddr)
        const firstTokenContract = new ethers.Contract(firstToken, ERC20ABI, provider)
        const firstTokenBalance = await firstTokenContract.balanceOf(pairAddr)
        const secondTokenContract = new ethers.Contract(secondToken, ERC20ABI, provider)
        const secondTokenBalance = await secondTokenContract.balanceOf(pairAddr)
        const pairContract = new ethers.Contract(pairAddr, UniPairABI, provider)
        const pairTotalLP = await pairContract.totalSupply()
        const userLP = await pairContract.balanceOf(walletAddrRef.current)
        setUserLPAmt(userLP.toString())
        if (new BigNumber(pairTotalLP.toString()).eq(new BigNumber(0))) {
          setLeftTokenLP('0')
          setRightTokenLP('0')
        } else {
          const userFirstTokenBalance = new BigNumber(firstTokenBalance.toString())
            .multipliedBy(new BigNumber(userLP.toString())).dividedBy(new BigNumber(pairTotalLP.toString()))
          const userSecondTokenBalance = new BigNumber(secondTokenBalance.toString())
            .multipliedBy(new BigNumber(userLP.toString())).dividedBy(new BigNumber(pairTotalLP.toString()))
          setLeftTokenLP(userFirstTokenBalance.dividedBy(new BigNumber(10).pow(tokenInfo[tokenAddrToName[firstToken]].decimals)).toString())
          setRightTokenLP(userSecondTokenBalance.dividedBy(new BigNumber(10).pow(tokenInfo[tokenAddrToName[secondToken]].decimals)).toString())
        }
        return {
          firstTokenBalance,
          secondTokenBalance
        }
      }
    } catch (error) {
      //
    }
  }

  const migrateSushiLP = async (firstToken, secondToken, lpTokenAmount) => {
    try {
      const {firstTokenBalance, secondTokenBalance} = await calculateUniLP(firstToken, secondToken)
      if (new BigNumber(userLPRef.current).isGreaterThanOrEqualTo(new BigNumber(lpTokenAmount))) {
          const provider = new ethers.providers.Web3Provider(window.ethereum)
          const signer = provider.getSigner()
          const pairContract = new ethers.Contract(pairAddrRef.current, UniPairABI, provider)
          const signedPairContract = pairContract.connect(signer)
          const pairTotalLP = await pairContract.totalSupply()

          if (new BigNumber(pairTotalLP.toString()).eq(new BigNumber(0))) {
            return
          } else {
            const userFirstTokenBalance = new BigNumber(firstTokenBalance.toString())
              .multipliedBy(new BigNumber(lpTokenAmount)).dividedBy(new BigNumber(pairTotalLP.toString()))
            const userSecondTokenBalance = new BigNumber(secondTokenBalance.toString())
              .multipliedBy(new BigNumber(lpTokenAmount)).dividedBy(new BigNumber(pairTotalLP.toString()))
            
            const sushiRollContract = new ethers.Contract(SushiRoll, SushiRollABI, provider)
            const signedSushiRollContract = sushiRollContract.connect(signer)

            await (await signedPairContract.approve(SushiRoll, lpTokenAmount)).wait()
            const currentTime = new Date()
            currentTime.setMinutes(currentTime.getMinutes() + 10)
            await (await signedSushiRollContract.migrate(
                firstToken, secondToken, lpTokenAmount,
                userFirstTokenBalance.toFixed(0), userSecondTokenBalance.toFixed(0),
                (currentTime.valueOf() / 1000).toFixed(0)
              )).wait()
            await calculateUniLP(firstToken, secondToken)
          }
      } else {
        toast.error('LP Amount must be equal to or less than the actual LP amount', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        })
      }
    } catch (error) {
      //
      console.log(error)
    }
  }

  const migrateWithPermitSushiLP = async (firstToken, secondToken, lpTokenAmount) => {
  }

  const updateWalletAddr = (addr) => {
    setWalletAddr(addr)
  }

  return {
    walletAddr,
    leftTokenLP,
    rightTokenLP,
    userLPAmt,
    migrateSushiLP,
    migrateWithPermitSushiLP,
    calculateUniLP,
    updateWalletAddr,
    connectWallet,
    disconnectWallet,
  }
}
