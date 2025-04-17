import React from 'react';
import { useZxing } from 'react-zxing';
import { Box, Typography } from '@mui/material';

interface Props {
  onSuccess: (text: string) => void;
}

const Scanner: React.FC<Props> = ({ onSuccess }) => {
  const { ref } = useZxing({
    onDecodeResult(result) {
      onSuccess(result.getText());
    },
  });

  return (
    <Box textAlign="center" py={2}>
      <Typography variant="body1" gutterBottom>
        カメラをQRコードにかざしてください
      </Typography>
      <video ref={ref} style={{ width: '100%', maxHeight: '300px', borderRadius: 8 }} />
    </Box>
  );
};

export default Scanner;
