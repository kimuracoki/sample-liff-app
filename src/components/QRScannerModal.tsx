import React, { useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import Scanner from './Scanner';

interface Props {
  open: boolean;
  onClose: () => void;
}

const QRScannerModal: React.FC<Props> = ({ open, onClose }) => {
  const [status, setStatus] = useState<'scanning' | 'loading' | 'done'>('scanning');

  const handleScanSuccess = (result: string) => {
    console.log('QR読み取り結果:', result);
    setStatus('loading');
    setTimeout(() => setStatus('done'), 2000);
  };

  const handleClose = () => {
    setStatus('scanning');
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>QRコード読み取り</DialogTitle>
      <DialogContent>
        {status === 'scanning' && <Scanner onSuccess={handleScanSuccess} />}
        {status === 'loading' && (
          <Box display="flex" flexDirection="column" alignItems="center" p={4}>
            <CircularProgress />
            <Typography sx={{ mt: 2 }}>読み取り中...</Typography>
          </Box>
        )}
        {status === 'done' && (
          <Box display="flex" flexDirection="column" alignItems="center" p={4}>
            <Typography variant="h6" gutterBottom>
              ✅ ポイント付与しました！
            </Typography>
            <Button variant="contained" onClick={handleClose}>
              閉じる
            </Button>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default QRScannerModal;
