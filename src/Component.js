import styled from 'styled-components'
import { Colors } from './utils'

export const TableContainer = styled.div`
    max-width: 100%;
    margin: 30px 0 20px;
    border-radius: 6px;
    background-color: ${Colors.white};
    display: flex;
    flex-direction: column;
`

export const Separator = styled.div`
    background-color: ${Colors.white2};
    height: 2px;
    margin: 17px 60px 0;
`

export const RowContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 60px;
`

export const ListTitle = styled.div`
    color: ${Colors.black};
    font-family: Inter;
    font-size: 32px;
    font-weight: bold;
    line-height: 39px;
    text-align: left;
    flex: 1;
`

export const ListHeader = styled.div`
    height: 58px;
    display: flex;
    align-items: center;
    color: ${Colors.gray1};
    font-family: Inter;
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;
    text-align: center;
    margin: 0 60px 12px;
`

export const HeaderTokenName = styled.div`
    text-align: left;
    flex: 3;
    display: flex;
    align-items: center;
`

export const HeaderTokenSymbol = styled.div`
    flex: 2;
`

export const HeaderTokenAddress = styled.div`
    flex: 5;
`

export const HeaderTokenCopy = styled.div`
    flex: 2;
    color: ${Colors.blueHeader};
    font-family: Inter;
    font-size: 16px;
    font-weight: 400;
    letter-spacing: 0;
    line-height: 20px;
    text-align: right;
    cursor: pointer;
    text-decoration: underline;
`

export const ListRow = styled.div`
    height: 40px;
    display: flex;
    align-items: center;
    text-align: center;
    color: ${Colors.black1};
    font-family: Inter;
    font-size: 16px;
    letter-spacing: 0;
    line-height: 25px;
    padding: 0 60px;
    background-color: ${props => props.odd ? Colors.white1 : Colors.white};
    position: relative;
`

export const SearchContainer = styled.div`
    display: flex;
    border-radius: 4px;
    background-color: ${Colors.white2};
    height: 36px;
    width: calc(50% - 10px);
    margin: 12px 0 0;
`

export const SearchContainerV3 = styled(SearchContainer)`
    width: calc(33.33% - 13.33px);
`

export const InputDiv = styled.input`
    color: ${Colors.gray1};
    background-color: ${Colors.transparent};
    font-family: Inter;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0;
    line-height: 20px;
    margin: 8px 5px 8px 15px;
    border: none;
    outline: none;
    flex: 1;
`

export const SearchIcon = styled.img`
    width: 16px;
    height: 16px;
    margin: 10px;
`

export const LabelText = styled.div`
    color: ${Colors.gray1};
    background-color: ${Colors.transparent};
    font-family: Inter;
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 0;
    line-height: 20px;
    margin: 12px 0 0;
`

export const WhiteButton = styled.div`
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    padding: 10px;
    background: #FFFFFF;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    font-family: Inter;
    font-weight: normal;
    font-size: 16px;
    line-height: 20px;
    color: ${Colors.black1};
    margin-left: 20px;
    cursor: pointer;
`

export const CalculateButton = styled.span`
    color: ${Colors.blueButton};
    margin-right: 30px;
    cursor: pointer;
`

export const LoadingContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    color: red;
`

export const AppContainer = styled.div`
  background-color: ${Colors.white};
  min-height: 100vh;
  display: flex;
`

export const SideMenu = styled.div`
    width: 246px;
    border: 2px solid ${Colors.white2};
    border-width: 0 2px 0 0;
    background-color: ${Colors.white1};
`

export const MainContainer = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
`

export const Header = styled.div`
    height: 94px;
    display: flex;
    align-items: center;
    border: 2px solid ${Colors.white2};
    border-width: 0 0 2px 0;
`
