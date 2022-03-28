const Button = (props) => {
  return (
    <>
      <style jsx>{`
        button {
          padding: 10px 16px;
          border-radius: 2px;
          border: 1px solid black;
          background: transparent;
        }
      `}</style>
      <button {...props} />
    </>
  );
};

export default Button;
