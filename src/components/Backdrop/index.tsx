import MuiBackdrop, { BackdropProps as MuiBackdropProps } from "@mui/material/Backdrop";

interface BackdropProps extends MuiBackdropProps {
  open: boolean;
  onClick?(): void;
}

const Backdrop = (props: BackdropProps) => {
  const { open, children, onClick, ...otherProps } = props;
  
  return (
    <MuiBackdrop open={open} onClick={onClick} {...otherProps}>
      {children}
    </MuiBackdrop>
  );
};

export default Backdrop;
