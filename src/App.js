/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { tokenInfo, tokens } from './utils'
import { useMetamask } from './useMetamask'

function App() {
  const [leftToken, setLeftToken] = useState('')
  const [rightToken, setRightToken] = useState('')
  const [lpTokenAmount, setLPTokenAmount] = useState('')
  const [isLoading, setLoading] = useState(false)
  const {
    leftTokenLP, rightTokenLP, calculateUniLP, migrateSushiLP,
    migrateWithPermitSushiLP, connectWallet, userLPAmt
  } = useMetamask()

  const copyTokenAddr = (address) => {
    const el = document.createElement('input')
    el.value = address
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
  }

  const getUniswapLP = async () => {
    try {
      setLoading(true)
      await calculateUniLP(leftToken, rightToken)
    } catch (error) {
      //
    }
    setLoading(false)
  }

  const migrateSushi = async () => {
    try {
      setLoading(true)
      await migrateSushiLP(leftToken, rightToken, lpTokenAmount)
    } catch (error) {
      //
    }
    setLoading(false)
  }

  const migrateWithPermitSushi = async () => {
    try {
      setLoading(true)
      await migrateWithPermitSushiLP(leftToken, rightToken, lpTokenAmount)
    } catch (error) {
      //
    }
    setLoading(false)
  }

  useEffect(() => {
    connectWallet()
  }, [])

  return (
    <div class="flex bg-white min-h-screen">
      <div class="w-246 bg-white1 border-r-2 border-current" />
      <div class="flex flex-1 flex-col">
        <div class="h-94 bg-white border-b-2 border-current" />
        <div class="max-w-full m-30-20 bg-white flex flex-col">
          <div class="row-container">
            <div class="list-title">
              Token
            </div>
          </div>
          <div class="bg-white2 h-2 m-17-60" />
          <div class="table-header">
            <div class="text-left flex-3 flex items-center">Name</div>
            <div class="flex-2">Symbol</div>
            <div class="flex-5">Address</div>
            <div class="copy-button" />
          </div>
          {tokens.map((item, index) => (
            <div
              key={item}
              class={`table-row-container ${index % 2 ? "bg-white1" : "bg-white"}`}>
              <div class="text-left flex-3 flex items-center">{tokenInfo[item].name}</div>
              <div class="flex-2">{tokenInfo[item].symbol}</div>
              <div class="flex-5">{tokenInfo[item].address}</div>
              <div class="copy-button" onClick={() => copyTokenAddr(tokenInfo[item].address)}>
                Copy Address
              </div>
            </div>
          ))}
        </div>
        <div class="max-w-full m-30-20 bg-white flex flex-col">
          <div class="row-container">
            <div class="list-title">
              Uniswap LP
            </div>
            <div class="white-button bg-white text-16 " onClick={() => getUniswapLP()}>Calculate</div>
          </div>
          <div class="bg-white2 h-2 m-17-60" />
          <div class="row-container">
            <div class="search-container">
              <input
                class="input-div"
                placeholder="First Token"
                value={leftToken}
                onChange={e => setLeftToken(e.target.value)}
              />
            </div>
            <div class="search-container">
              <input
                class="input-div"
                placeholder="Second Token"
                value={rightToken}
                onChange={e => setRightToken(e.target.value)}
              />
            </div>
          </div>
          <div class="row-container">
            <div class="search-container-v3">
              <input
                class="input-div"
                placeholder="First Token Amount"
                value={leftTokenLP}
                contentEditable={false}
              />
            </div>
            <div class="search-container-v3">
              <input
                class="input-div"
                placeholder="Second Token Amount"
                value={rightTokenLP}
                contentEditable={false}
              />
            </div>
            <div class="search-container-v3">
              <input
                class="input-div"
                placeholder="LP Token Amount"
                value={userLPAmt}
                contentEditable={false}
              />
            </div>
          </div>
        </div>
        <div class="max-w-full m-30-20 bg-white flex flex-col">
          <div class="row-container">
            <div class="list-title">
              Sushi Migration
            </div>
            <div class="white-button bg-white text-16 " onClick={() => migrateSushi()}>Migrate</div>
            <div class="white-button bg-white text-16 " onClick={() => migrateWithPermitSushi()}>Migrate With Permit</div>
          </div>
          <div class="bg-white2 h-2 m-17-60" />
          <div class="row-container">
            <div class="search-container">
              <input
                class="input-div"
                placeholder="LP Token"
                value={lpTokenAmount}
                type="number"
                onChange={e => setLPTokenAmount(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      {isLoading && (
        <div class="fixed inset-0 flex justify-center items-center text-2xl text-red-600">
          Loading...
        </div>
      )}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
      />
    </div>
  )
}

export default App
