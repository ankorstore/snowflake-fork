const Button = ({ className = "", ...props }) => (
  <button
    className={`${className} bg-black rounded-default text-white text-[14px] h-[34px] w-[160px] leading-normal`}
    {...props}
  />
);

export default Button;
