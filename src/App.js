/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ListTitle, CalculateButton, RowContainer, TableContainer,
  ListHeader, HeaderTokenName, HeaderTokenCopy, Separator,
  HeaderTokenSymbol, ListRow, HeaderTokenAddress, SearchContainer,
  InputDiv, LabelText, SearchContainerV3, AppContainer, LoadingContainer,
  SideMenu, MainContainer, Header, WhiteButton
} from './Component'
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
    <AppContainer>
      <SideMenu></SideMenu>
      <MainContainer>
        <Header />
        <TableContainer>
          <RowContainer>
            <ListTitle>Token</ListTitle>
          </RowContainer>
          <Separator />
          <ListHeader>
              <HeaderTokenName>Name</HeaderTokenName>
              <HeaderTokenSymbol>Symbol</HeaderTokenSymbol>
              <HeaderTokenAddress>Address</HeaderTokenAddress>
              <HeaderTokenCopy />
          </ListHeader>
          {tokens.map((item, index) => (
            <ListRow key={item} odd={index % 2}>
              <HeaderTokenName>{tokenInfo[item].name}</HeaderTokenName>
              <HeaderTokenSymbol>{tokenInfo[item].symbol}</HeaderTokenSymbol>
              <HeaderTokenAddress>{tokenInfo[item].address}</HeaderTokenAddress>
              <HeaderTokenCopy onClick={() => copyTokenAddr(tokenInfo[item].address)}>
                Copy Address
              </HeaderTokenCopy>
            </ListRow>
          ))}
        </TableContainer>
        <TableContainer>
          <RowContainer>
            <ListTitle>Uniswap LP</ListTitle>
            <WhiteButton onClick={() => getUniswapLP()}>Calculate</WhiteButton>
          </RowContainer>
          <Separator />
          <RowContainer>
            <SearchContainer>
              <InputDiv
                placeholder="First Token"
                value={leftToken}
                onChange={e => setLeftToken(e.target.value)}
              />
            </SearchContainer>
            <SearchContainer>
              <InputDiv
                placeholder="Second Token"
                value={rightToken}
                onChange={e => setRightToken(e.target.value)}
              />
            </SearchContainer>
          </RowContainer>
          <RowContainer>
            <SearchContainerV3>
              <InputDiv
                placeholder="First Token Amount"
                value={leftTokenLP}
                contentEditable={false}
              />
            </SearchContainerV3>
            <SearchContainerV3>
              <InputDiv
                placeholder="Second Token Amount"
                value={rightTokenLP}
                contentEditable={false}
              />
            </SearchContainerV3>
            <SearchContainerV3>
              <InputDiv
                placeholder="LP Token Amount"
                value={userLPAmt}
                contentEditable={false}
              />
            </SearchContainerV3>
          </RowContainer>
        </TableContainer>
        <TableContainer>
          <RowContainer>
            <ListTitle>Sushi Migration</ListTitle>
            <WhiteButton onClick={() => migrateSushi()}>Migrate</WhiteButton>
            <WhiteButton onClick={() => migrateWithPermitSushi()}>Migrate With Permit</WhiteButton>
          </RowContainer>
          <Separator />
          <RowContainer>
            <SearchContainer>
              <InputDiv
                placeholder="LP Token"
                value={lpTokenAmount}
                type="number"
                onChange={e => setLPTokenAmount(e.target.value)}
              />
            </SearchContainer>
          </RowContainer>
        </TableContainer>
      </MainContainer>
      {isLoading && (
        <LoadingContainer>
          Loading...
        </LoadingContainer>
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
    </AppContainer>
  )
}

export default App
