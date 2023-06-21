import Backdrop from "@/components/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

interface LoadingBackdropProps {
  open: boolean;
  onClick?(): void;
}

const LoadingBackdrop = (props: LoadingBackdropProps) => {
  const { open, onClick = () => {} } = props;

  return (
    <Backdrop open={open} onClick={onClick}>
      <CircularProgress size={100} thickness={2.4} />
    </Backdrop>
  );
};

export default LoadingBackdrop;
