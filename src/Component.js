import styled from 'styled-components'
import { Colors } from './utils'

export const TableContainer = styled.div`
    max-width: 100%;
    margin: 20px 40px 40px;
    max-height: 788px;
    border-radius: 6px;
    background-color: ${Colors.white};
    box-shadow: 0 2px 20px 0 ${Colors.boxShadow};
    padding: 28px 27px 40px 27px;
    display: flex;
    flex-direction: column;
`

export const Separator = styled.div`
    background-color: ${Colors.gray3};
    height: 1px;
    width: 100%;
`

export const RowContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

export const ListTitle = styled.div`
    color: ${Colors.black};
    font-family: Poppins;
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 0;
    line-height: 25px;
    text-align: left;
    width: 55%;
`

export const ListHeader = styled.div`
    height: 32px;
    display: flex;
    align-items: center;
    color: ${Colors.gray1};
    font-family: Poppins;
    font-size: 12px;
    letter-spacing: 0;
    line-height: 18px;
    text-align: center;
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
    flex: 1;
    color: ${Colors.blueHeader};
    font-family: Poppins;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0;
    line-height: 20px;
    text-align: right;
    cursor: pointer;
`

export const ListRow = styled.div`
    height: 48px;
    display: flex;
    align-items: center;
    text-align: center;
    color: ${Colors.black1};
    font-family: Poppins;
    font-size: 16px;
    letter-spacing: 0;
    line-height: 25px;
`

export const SearchContainer = styled.div`
    display: flex;
    border-radius: 4px;
    background-color: ${Colors.white2};
    height: 36px;
    width: 48%;
    margin: 12px 0 0;
`

export const SearchContainerV3 = styled(SearchContainer)`
    width: 32%;
`

export const InputDiv = styled.input`
    color: ${Colors.gray1};
    background-color: ${Colors.transparent};
    font-family: Poppins;
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
    font-family: Poppins;
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 0;
    line-height: 20px;
    margin: 12px 0 0;
`

export const CalculateButton = styled.span`
    color: ${Colors.blueButton};
    margin-left: 30px;
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
`
