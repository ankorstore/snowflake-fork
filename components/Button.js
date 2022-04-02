const Button = ({ className = "", variant, color, size, ...props }) => {
  const colorsClass =
    color === "black" ? " bg-black text-white" : " bg-white text-black";
  const variantsClass = variant === "outline" ? " border border-black" : "";
  const sizesClass =
    size === "small"
      ? " px-2 py-1"
      : size === "large"
      ? " px-4 py-2"
      : " px-3 py-2";

  return (
    <button
      className={`${className}${colorsClass}${variantsClass}${sizesClass} rounded-default leading-normal border`}
      {...props}
    />
  );
};

export default Button;
