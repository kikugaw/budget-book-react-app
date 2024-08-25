import { Box, Button, ChakraProvider, Checkbox, Flex, Input, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import './App.css';

type Record = {
  id: number,
  title: string,
  amount: number,
  isIncome: boolean,
}

function App() {
  const [records, setRecords] = useState<Record[]>([]);
  const [title, setTitle] = useState<string>('')
  const [amount, setAmount] = useState<number>(0)
  const [isIncome, setIsIncome] = useState<boolean>(false)

  useEffect(() => {
    getRecords()

    async function getRecords() {
      const response = await fetch('http://localhost:3000/records')
      const data = await response.json()
      setRecords(data)
    }
    }, [])
  

  return (
    <ChakraProvider>
      <>
        <Text fontSize='2xl'>家計簿アプリ</Text>
        <Box>
          <Input
            placeholder='タイトルを入力'
            mb='4px'
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <Input
            placeholder='支出を入力'
            mb='4px'
            onChange={(e) => setAmount(Number(e.target.value))}
            value={amount}
          />
          <Flex align='center' justifyContent='space-between'>
            <Checkbox w='100px'
              onChange={() => setIsIncome(!isIncome)}
              isChecked={isIncome}
            >入金</Checkbox>
            <Button
              colorScheme='teal'
              onClick={() => 
                setRecords([...records, {id: records.length + 1, "title": title, "isIncome": isIncome, "amount": amount}])
              } 
            >追加</Button>             
          </Flex>          
        </Box>
        <div>
          {records.map((record => (
            <div  key={record.id}>
            <Flex align='center' justifyContent='space-between'>
              <Text>{record.title}</Text>
              <Text>{record.isIncome ? '+' : '-'}{record.amount}</Text>
              </Flex>
              </div>
          )))}
        </div>
      </>
    </ChakraProvider>
  )
}

export default App
