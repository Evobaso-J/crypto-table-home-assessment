type SecondHighestCrypto = {
  name: string
  value: number
}

export const useSecondHighestCrypto = (): SecondHighestCrypto => {
  return {
    name: 'Ethereum',
    value: 2000,
  }
}
