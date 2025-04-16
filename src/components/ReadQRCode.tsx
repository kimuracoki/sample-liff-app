import { useZxing } from 'react-zxing'

export const ReadQRCode = () => {
  const { ref } = useZxing({
    onDecodeResult(result) {
      const text = result.getText()
      console.log(text)
    },
  })

  return (
    <div>
      <video ref={ref} />
    </div>
  )
}

export default ReadQRCode
